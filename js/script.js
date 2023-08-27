"use strict"

// OPERAZIONI PRELIMINARI

// preparare chiave per lo storage
const STORAGE_KEY = '__bool-xmas-list__';

// prendere gli elementi necessari dall'HTML

const totalSlot = document.querySelector('.total-slot');
const giftListElement = document.querySelector('.gift-list');

const form = document.querySelector('#gift-form');
const nameField = document.querySelector('#name-field');
const priceField = document.querySelector('#price-field');
const descriptionField = document.querySelector('#description-field');

// PREPARAZIONE LISTA REGALI
let gifts = [];

// controllare se c'erano elementi salvati nello storage
const prevList = localStorage.getItem(STORAGE_KEY);

if(prevList){
    // utilizzare lista precedente al posto di quella vuota
    gifts = JSON.parse(prevList);

    // ricalcolare il totale
    calculateTotal();

    //
    renderList();
}

// INTERCETTARE INVIO DEL FORM

form.addEventListener('submit', function(event){

    //1. bloccare il ricaricamento della pagina del browser
    event.preventDefault();

    //2. raccogliere i dati dai campi
    const name = nameField.value.trim();
    const price = priceField.value.trim();
    const description = descriptionField.value.trim();

    // console.log(name, price, descrition);


    //3. aggiungere un regalo alla lista
    addGift(name, price, description);

    //4. ripulire i campi di input
    form.reset();
    
    //5. riportare il focus (il cursore) sul primo campo
    nameField.focus();

});

// FUNZIONI

// funzione per aggiungere un regalo alla lista

function addGift(name, price, description) {
    // creare oggetto che rappresenta il regalo
    const newGift = {
        name,
        price: Number(price),
        description
    };
    // aggiungere oggetto alla lista
    gifts.push(newGift);
    console.log(gifts);

    // AGGIORNARE IL LOCAL STORAGE
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));

    // calcolo del totale
    calculateTotal();
    
    // renderizzare o mostrare a schermo la lista dei regali
    renderList();
}

// funzione per calcolare il totale
function calculateTotal() {
    // mi preparo a calcolare
    let total = 0;

    // per ogni regalo...
    for(let i = 0; i < gifts.length; i++){
        // aggiungere prezzo al totale
        total += gifts[i].price;
    }
      // stampare il totale in pagina
      totalSlot.innerText = formatAmount(total);
}

// funzione per formattare una cifra

function formatAmount(amount) {
    return amount.toFixed(2) + '€';
}

// funzione per renderizzare la lista dei regali

function renderList(){
    // 1. svuotare la lista precedente o non aggiornata
    giftListElement.innerHTML = '';

    // per tutti i regali ....
    for (let i = 0; i < gifts.length; i++) {
        // creo il codice per ogni singolo elemento della lista
        const giftElement = createListElement(i);
        // e lo aggancio alla lista nella pagina
        giftListElement.innerHTML += giftElement;
          // rendo i pulsanti cliccabili
        setDeleteButtons();
    } 
}

// funzione per creare un elemento della lista
function createListElement(i){
    // recuperiamo il regalo
    const gift = gifts[i];
    // restituire codice HTML relativo ad un regalo della lista
    return `
    <li class="gift-element">
    <div class="gift-info">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
    </div>
    <div class="gift-price">${formatAmount(gift.price)}</div>
    <button class="gift-button" data-index"${i}">❌</button>
    </li>`
}

// funzione per attivare i pulsanti per la cancellazione
function setDeleteButtons(){
    // recuperare tutti i pulsanti dei regali
    const deleteButtons = document.querySelectorAll('.gift-button');
    // per ognuno dei pulsanti ...
    for(let i = 0; i < deleteButtons.length; i++) {
    // recuperare il singolo pulsante ad ogni giro
    const button = deleteButtons[i];

    // aggiungere l'eventlistener
    button.addEventListener('click', function(){
        // individuare index corrispondente
        const index = button.dataset.index;

        // rimuovere dalla lista il regalo corrispondente
        removeGift(index);
    });

  }
}

// funzione per rimuovere regalo dalla lista
function removeGift(index){
    // rimuovere regalo dalla lista
    gifts.splice(index, 1);

    // AGGIORNARE LOCAL STORAGE
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));

    // ricalcolare il totale
    calculateTotal();

    // renderizzare nuovamente la lista
    renderList();
}