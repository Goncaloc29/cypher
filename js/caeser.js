//create function
function cifrar() {
    let str = document.getElementById("textoCifrar").value;
    let num = document.getElementById("deslocamentoCifrar").value;
    // convert num in integer
    num = parseInt(num);
    //make the string uppercase
    str = str.toUpperCase();
    //create an empty string
    var newStr = "";
    //create a for loop to loop through the string
    for (var i = 0; i < str.length; i++) {
        //create a variable to store the character code of each letter
        var charCode = str.charCodeAt(i);
        //create a variable to store the new character code of each letter
        var newCharCode = charCode + num;
        //create a variable to store the new character
        var newChar = String.fromCharCode(newCharCode);
        //add the new character to the empty string
        newStr += newChar;
    }
    //return the new string
    document.getElementById("resultadoCifrar").innerHTML = newStr;
}

//create function
function decifrar() {
    //make the string uppercase
    let str = document.getElementById("textoDecifrar").value;
    let num = document.getElementById("deslocamentoDecifrar").value;
    // convert num in integer
    num = parseInt(num);
    str = str.toUpperCase();
    //create an empty string
    var newStr = "";
    //create a for loop to loop through the string
    for (var i = 0; i < str.length; i++) {
        //create a variable to store the character code of each letter
        var charCode = str.charCodeAt(i);
        //create a variable to store the new character code of each letter
        var newCharCode = charCode - num;
        //create a variable to store the new character
        var newChar = String.fromCharCode(newCharCode);
        //add the new character to the empty string
        newStr += newChar;
    }
    //return the new string
    document.getElementById("resultadoDecifrar").innerHTML = newStr;
    
}