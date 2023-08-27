// IL NUMERO E' PARI ?
function isEven(num) {
    if(num % 2 === 0) {
        return true
    } else
    return false
} 

// INTEGER RANDOM NUMBER IN RANGE MIN / MAX
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// NOTIFICA DI ERRORE
function notificationError(msgError) {
    const alerta = document.createElement('div');
    alerta.className='alert alert-danger';
    alerta.innerHTML = 'msgError';
    return alerta
}

// RIMUOVERE PRIMA NOTIFICA CON CLASSE ALERT
function removeFirstNotification(){
    const alertToRemove = document.querySelector('.alert');
    // console.log(alertToRemove);
    if(alertToRemove) alertToRemove.remove();
}

// SCRIVERE UNA STRINGA AL CONTRARIO
const word = 'parola';
const wordLength = word.length;
let reversedWord = '';
for(let i = wordLength - 1; i >= 0; i--) {
    reversedWord += word.charAt(i);
}
// console.log(reversedWord);

// SCRIVERE UNA STRINGA AL CONTRARIO TRASFORMANDOLA IN ARRAY E POI DI NUOVO IN STRINGA
const word2 = 'parola';
const wordLength2 = word.length;
let reversedWord2 = word.split('').reverse().join('');
// console.log(reversedWord2);


