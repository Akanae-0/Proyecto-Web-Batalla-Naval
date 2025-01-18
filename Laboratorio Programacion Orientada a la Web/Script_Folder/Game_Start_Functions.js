import { gameSection, gameButonSection, rows, columns } from "../Game_Load.js";
import { filaToLetra } from "../Game_Load.js";
import { botonDisparo, turnoJugador, rivalUser } from "../Game_Load.js";

var casillaSeleccionada = 'Z0';
var casillaSeleccionadaId = '';

function CrearTableroOponente() {

    let unidadTableroCreacion = document.createElement("section");
    unidadTableroCreacion.classList.add("Board_Unity");

    gameBoardPlayerTitle = `${rivalUser}`;

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

function CrearBotonDisparo(){
    gameButonSection.innerHTML = "";
    gameButonSection.style.width = "100%";
    gameButonSection.style.height = "auto";
    gameButonSection.style.display = "flex";
    gameButonSection.style.justifyContent = "center";
    let casillaSeleccionada = document.createElement("div");
    casillaSeleccionada.setAttribute("id", "Casilla_Seleccionada_Show");
    casillaSeleccionada.style.border = "2px solid black";
    casillaSeleccionada.style.width = "50px";
    casillaSeleccionada.style.height = "50px";
    casillaSeleccionada.style.textAlign = "center";
    casillaSeleccionada.style.fontSize = "30px";
    casillaSeleccionada.style.fontWeight = "bold";
    casillaSeleccionada.style.backgroundColor = "white";
    gameButonSection.appendChild(casillaSeleccionada);
    let botonDisparo = document.createElement("button");
    botonDisparo.classList.add("boton_accion_juego");
    botonDisparo.setAttribute("id", "Boton_Disparo");
    botonDisparo.innerHTML = "Disparar";
    gameButonSection.appendChild(botonDisparo);
}

function prepararCasillasOponente() {
    let casillas = document.querySelectorAll(`.casilla`);
    let showCasillaSeleccionada = document.getElementById("Casilla_Seleccionada_Show");
    casillas.forEach(casilla => {
        if (casilla.id[20] === "1") {
            casilla.addEventListener('click', function() {
                if (turnoJugador === false) return;
                else {
                    if (this.classList.contains("hit_space") || this.classList.contains("water_space")) return;
                    else {
                        let casillaNumero = casilla.id[10] - 1 + 2;
                        //casillaSeleccionada = '' + casilla.id[8] + casillaNumero;
                        //casillaSeleccionadaId = casilla.id;
                        //showCasillaSeleccionada.innerHTML = casillaSeleccionada; // Marcar la casilla con una "X"
                        //console.log('Selected cell:', casillaSeleccionada);
                    }
                }
            });
        }
    });
}

function dispararCasillaOponente(){
    if (turnoJugador === true) {
        let botonDisparo = document.getElementById("Boton_Disparo");
        botonDisparo.addEventListener("click", function(){
            //console.log("Disparando a la casilla: " + casillaSeleccionada);
            let showCasillaSeleccionada = document.getElementById("Casilla_Seleccionada_Show");
            //showCasillaSeleccionada.innerHTML = "";
            
            // Aqui se debe enviar la casilla seleccionada al servidor
            let hit = false;
            let casillaImpacto = document.getElementById(casillaSeleccionadaId);
            if (hit === true) {
                // Marcar la casilla como disparada
                casillaImpacto.classList.add("hit_space");
            } else {
                // Marcar la casilla como agua
                casillaImpacto.classList.add("water_space");
            }
        });
    } else return;
}

CrearTableroOponente();
CrearBotonDisparo();
prepararCasillasOponente();
dispararCasillaOponente();
