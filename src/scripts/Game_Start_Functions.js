import { gameSection, gameButonSection, rows, columns } from "./Game_Load.js";
import { filaToLetra } from "./Game_Load.js";
import { username } from "./Game_Load.js";
import { botonDisparo, turnoJugador, rivalUser } from "./Game_Load.js";
import { mostrarMensaje } from "./Game_Load.js";
import { restartAfterGame } from "./Game_Load.js";
import { socket } from "./Game_Load.js";

var casillaSeleccionada = 'Z0';
var casillaSeleccionadaId = '';

function CrearTableroOponente() {

    let unidadTableroCreacion = document.createElement("section");
    unidadTableroCreacion.classList.add("Board_Unity");

    let gameBoardPlayerTitle = `${rivalUser}`;

    unidadTableroCreacion.setAttribute('id', `TABLERO#1`);
    let idUnidadTablero = unidadTableroCreacion.id;

    // Create game board title
    let titleCardBoard = document.createElement("p");
    titleCardBoard.classList.add("Board_Title_Card");
    titleCardBoard.innerHTML = gameBoardPlayerTitle;

    unidadTableroCreacion.appendChild(titleCardBoard);

    // Create game board format
    let tableroCreacion = document.createElement("section");
    tableroCreacion.setAttribute("id", "Tablero_Jugador_1");
    tableroCreacion.classList.add("Board");

    // Loop to create grid items and append them to the body


    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("casilla");
            
            if (i == 0 && j == 0) gridItem.classList.add("casilla_vacia");
            if (i == 0 || j == 0) {
                gridItem.classList.add("BLANK");
                if (j == 0) {
                    if (i > 0) gridItem.innerHTML = filaToLetra[i];
                }
                if (i == 0) {
                    if (j > 0) gridItem.innerHTML = (j);
                }

            } else {
                gridItem.setAttribute('id', "Casilla_"+filaToLetra[i]+","+(j-1)+"_"+idUnidadTablero);
                
            }

            // Append the grid item to the body
            tableroCreacion.appendChild(gridItem);
        }
    }
    
    unidadTableroCreacion.appendChild(tableroCreacion);

    gameSection.appendChild(unidadTableroCreacion);

}

function HabilitarBotonDisparo(){
    gameButonSection.innerHTML = "";
    gameButonSection.style.width = "100%";
    gameButonSection.style.height = "auto";
    gameButonSection.style.display = "flex";
    gameButonSection.style.justifyContent = "center";
    let casillaSeleccionadaS = document.createElement("div");
    casillaSeleccionadaS.setAttribute("id", "Casilla_Seleccionada_Show");
    casillaSeleccionadaS.style.border = "2px solid black";
    casillaSeleccionadaS.style.width = "50px";
    casillaSeleccionadaS.style.height = "50px";
    casillaSeleccionadaS.style.textAlign = "center";
    casillaSeleccionadaS.style.fontSize = "30px";
    casillaSeleccionadaS.style.fontWeight = "bold";
    casillaSeleccionadaS.style.backgroundColor = "white";
    gameButonSection.appendChild(casillaSeleccionadaS);
    let botonDisparoC = document.createElement("button");
    botonDisparoC.classList.add("boton_accion_juego");
    botonDisparoC.classList.add("botones");
    botonDisparoC.setAttribute("id", "Boton_Disparo");
    botonDisparoC.innerHTML = "DISPARAR";
    gameButonSection.appendChild(botonDisparoC);
}

// Funcion para buscar un elemento casilla recibiendo su codigo y # de tablero
function searchCasilla(casillaBuscar, tablero){
    let casillas = document.querySelectorAll(`.casilla`);
    let casillaSeleccionada = '';
    casillas.forEach(casilla => {
        if (casilla.id === "Casilla_"+casillaBuscar.charAt(0)+","+(casillaBuscar.slice(1)-1)+"_TABLERO#"+tablero) {
            casillaSeleccionada = casilla.id;
        }
    });
    return casillaSeleccionada;
}

// Funcion para el manejo de hit/drown de disparos (tablero rival)
function modifyEstadoCasillaJugador(casilla, data){
    let casillaImpacto = document.getElementById(casilla);
    if (data.hit === true || data.drown === true) {
        let explosion = "../assets/Explosion_Icon.png";
        casillaImpacto.innerHTML = `<img src="${explosion}" alt="Explosion" class="parte-barco">`;
        mostrarMensaje('HIT!', 'warning');
        if (data.drown === true) {
            mostrarMensaje('Barco hundido', 'warning');
        }
    } else {
        casillaImpacto.classList.add("water_space");
    }
}

// Funcion para el manejo de hit/drown de disparos (tablero oponente)
function modifyEstadoCasillaOponente(casilla, data){
    let casillaImpacto = document.getElementById(casilla);
    if (data.hit === true || data.drown === true) {
        casillaImpacto.classList.add("hit_space");
        mostrarMensaje('HIT!', 'info');
        if (data.drown === true) {
            mostrarMensaje('Barco hundido', 'success');
        }
    } else {
        casillaImpacto.classList.add("water_space");
        mostrarMensaje('Agua...', 'info');
    }
}

socket.on ('play-result', (data) => {
    let casillaAtacada = '';
    if (data.username == username){
        casillaAtacada = searchCasilla(data.position, 0);
        modifyEstadoCasillaJugador(casillaAtacada, data);
    }
    else {
        casillaAtacada = searchCasilla(data.position, 1);
        modifyEstadoCasillaOponente(casillaAtacada, data);
    }
});

socket.on ('finish', (data) => {
    if (data.winner === username){
        mostrarMensaje('¡¡Has ganado!!', 'success');
    } else {
        mostrarMensaje('Has perdido :(', 'warning');
    }
    restartAfterGame();
});

CrearTableroOponente();
HabilitarBotonDisparo();
