// import bigInteger.js from utils folder

function gcd(firstNum, secondNum) {
    if (!secondNum) {
        return firstNum;
    }
    return gcd(secondNum, firstNum % secondNum);
}
function isPrime(num) {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/* // Função para receber p
function getPNumber() {
    let candidate = document.getElementById("p").value;

    if (isPrime(candidate) && candidate % 4 == 3) {
    }

    return candidate;
}

// Função para receber q
function getQNumber() {
    let candidate = document.getElementById("q").value;

    if (isPrime(candidate) && candidate % 4 == 3) {
    }

    return candidate;
} */


function generateKeys(candidatep, candidateq) {
    const p = candidatep;
    const q = candidateq;
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const e = 5;
    const d = getD(e, phi);
    return {
        privateKey: { d, n },
        publicKey: { e, n }
    };

}
function stringToNumbersArr(string) {
    return string.split("").map(char => char.charCodeAt(0));
}

function numbersArrToString(arr) {
    return arr.map(number => String.fromCharCode(number)).join("");
}

function decryptMessage(msg, publicKey) {
    return bigInt(msg).pow(publicKey.e).mod(publicKey.n);
}

function encryptMessage(decMsg, privateKey) {
    return bigInt(decMsg).pow(privateKey.d).mod(privateKey.n);
}

function getD(e, phi) {
    e = e % phi;
    for (let x = 1; x < phi; x++)
        if ((e * x) % phi == 1)
            return x;
}


function decryptString(string, publicKey) {
    const numbersArr = stringToNumbersArr(string);
    return numbersArr.map(msg => decryptMessage(msg, publicKey));
}

function encryptString(decryptedNumbersArr, privateKey) {
    const encryptedNumbersArr = decryptedNumbersArr.map(msg => encryptMessage(msg, privateKey));
    return numbersArrToString(encryptedNumbersArr);
}

function handleEncryption() {
    let candidatep = document.getElementById("p").value;
    let candidateq = document.getElementById("q").value;

    // Transforma o texto em números
    candidatep = parseInt(candidatep);
    candidateq = parseInt(candidateq);
    if (isPrime(candidatep) && isPrime(candidateq)) {
        // vai buscar a mensagem  
        let msg = document.getElementById("toEncrypt").value;
        const keys = generateKeys(candidatep, candidateq);
        console.log(keys);
        console.log('msg -> ' + msg);
        const decryptedMessage = decryptString(msg, keys.publicKey);
        console.log('decryptedMessage -> ' + decryptedMessage);
        document.getElementById("pprime").innerHTML = candidatep;
        document.getElementById("qprime").innerHTML = candidateq;
        document.getElementById("nEnc").innerHTML = "(e: " + keys.publicKey.e + ", n: " + keys.publicKey.n+")";
        document.getElementById("kEnc").innerHTML = "(d: " + keys.privateKey.d + ", n: " + keys.privateKey.n+")";
        document.getElementById("n").value = keys.privateKey.n;
        document.getElementById("d").value = keys.privateKey.d;
        document.getElementById("message").value = decryptedMessage;
        document.getElementById("gcdCheck").innerHTML = decryptedMessage;
        const encryptedMessage = encryptString(decryptedMessage, keys.privateKey);
        console.log('encryptedMessage -> ' + encryptedMessage);
    } else {
        alert("Os números não são primos");
    }    
};

function handleDecryption() {
    // declarar variavel do tipo json
    const keys = {
        privateKey: {
            d: parseInt(document.getElementById("d").value),
            n: parseInt(document.getElementById("n").value)
        }
    };
    let messageString = document.getElementById("message").value;

    messageString = messageString.split(',');
    let message = [];
    for (let i = 0; i < messageString.length; i++) {
        message[i] = parseInt(messageString[i]);
    }
    const encryptedMessage = encryptString(message, keys.privateKey);
    document.getElementById("gcdCheck1").innerHTML = encryptedMessage;
};
