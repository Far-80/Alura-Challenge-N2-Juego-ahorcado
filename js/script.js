function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function listaPalabras (){
    var palabras = ["DESAYUNO","GENIO","ESTADIO","LUNA","HOJA","ELEFANTE"];
    var cantidadPalabras = getRandomInt(0, palabras.length);
    return palabras[cantidadPalabras];
}

var botonInicioPresionado = false;
var palabraRandom;
var arrayLetrasCorrectas = [];
var arrayLetrasIncorrectas =[];
var finalJuego;

function agregarLetra (arrayLetras, keyName){
    var repetido = false;

    if (arrayLetras[0] == ""){
            arrayLetras.push(keyName);
    }else{
        for (i=0; i < arrayLetras.length; i++){
            if (keyName == arrayLetras[i]){
                repetido = true;
            }
        }
        if (!repetido){
            arrayLetras.push(keyName);
        }
    }
    return arrayLetras;
};

function finJuego (cantidadIntentos){
    var fin = false;
    if (cantidadIntentos == 8){
        fin = true;
    }
    return fin;
}

function ganador (palabraRandom, aciertos){
    var fin = false;

    if (aciertos.length != 0){
        fin = true;
        for (i=0; i < palabraRandom.length; i++){
            if (fin){
                for(j=0; j<aciertos.length; j++){
                    if (palabraRandom[i] == aciertos[j]){
                        fin = true;
                        break;
                    }else{
                        fin = false;
                    }
                }
            }else{
                break;
            }
        }
    }
    return fin;
}

document.addEventListener('keydown', function(event){
    var keyName = event.key;
    keyName = keyName.toUpperCase();

    if (!finalJuego){
        if (validarCaracter(keyName)){
            const buscar = new RegExp(keyName);
            if (buscar.test(palabraRandom)){
                agregarLetra(arrayLetrasCorrectas,keyName)
            }else{
                agregarLetra(arrayLetrasIncorrectas,keyName)
            }
        }

        for (j=0; j < arrayLetrasCorrectas.length; j++){
            drawLetraCorrecta(palabraRandom,arrayLetrasCorrectas[j]);
        }

        drawLetraIncorrecta(arrayLetrasIncorrectas);

        if (finJuego (arrayLetrasIncorrectas.length)){
            drawFinJuego("Fin del Juego!");
            finalJuego = true;
        }

        if (ganador(palabraRandom,arrayLetrasCorrectas) && 
            !finalJuego){
                drawFinJuego("Ganaste, felicidades");
                finalJuego = true;
            }
    }
        
});

function validarCaracter(caracter){
    var valido = false;
    const patron = new RegExp("[A-Z]");
    if (caracter.length == 1 && botonInicioPresionado && patron.test(caracter)){
        valido = true;
    }
    return valido;
}

var iniciarJuego = document.querySelector("#btn-iniciar");
iniciarJuego.addEventListener("click", function (evt){
    evt.preventDefault();
    
    arrayLetrasCorrectas = [];
    arrayLetrasIncorrectas =[];
    finalJuego = false;
    palabraRandom = listaPalabras();
    console.log(palabraRandom);

    drawGuiones(palabraRandom);
    botonInicioPresionado = true;
})