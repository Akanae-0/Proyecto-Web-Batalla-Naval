import { bodyDocumento, asideSection } from "./Game_Load.js";
import { barcosJuego, shipsJugada } from "./Game_Load.js";
import { gameSection, gameButonSection, rows, columns, filaToLetra} from "./Game_Load.js";
import { cargarMovimientoBarcos } from "./Barcos_Drag_Function.js";

// Crear tablero de juego
var tableroCreadoEstado = false;

function CrearTableroJugador() {

    let unidadTableroCreacion = document.createElement("section");
    unidadTableroCreacion.classList.add("Board_Unity");

    let gameBoardPlayerTitle = "JUGADOR";

    unidadTableroCreacion.setAttribute('id', `TABLERO#0`);
    let idUnidadTablero = unidadTableroCreacion.id;

    // Create game board title
    let titleCardBoard = document.createElement("p");
    titleCardBoard.classList.add("Board_Title_Card");
    titleCardBoard.innerHTML = gameBoardPlayerTitle;

    unidadTableroCreacion.appendChild(titleCardBoard);

    // Create game board format
    let tableroCreacion = document.createElement("section");
    tableroCreacion.setAttribute("id", "Tablero_Jugador_0");
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

function CargarBarcos() {
    for (let barco of barcosJuego) {
        let barcoCreando = document.createElement("img");
        let contenedorBarco = document.createElement("div");

        contenedorBarco.classList.add("contenedorBarco");
        contenedorBarco.setAttribute("data-name", barco.name);
        contenedorBarco.setAttribute("data-source", barco.source);
        contenedorBarco.setAttribute("data-spaces", barco.spaces);
        contenedorBarco.setAttribute("data-orientation", barco.orientation);

        barcoCreando.setAttribute("id", barco.name);
        barcoCreando.setAttribute("src", barco.source);
        barcoCreando.setAttribute("alt", barco.name);
        barcoCreando.setAttribute("orientation", barco.orientation);
        barcoCreando.classList.add("Barco");


        contenedorBarco.appendChild(barcoCreando);
        asideSection.appendChild(contenedorBarco);
    }
}

// Logica del boton de rotar 
function cargarBotonesBarcos(){
    let botonRotarBarcos = document.createElement("button");
    botonRotarBarcos.setAttribute("id", "Boton_Rotar_Barcos");
    botonRotarBarcos.innerHTML = `
        (horizontal)<br>
        Rotar`;
    botonRotarBarcos.classList.add("boton_accion_juego");

    botonRotarBarcos.addEventListener("click", () => {
        let barcosA = document.getElementsByClassName('contenedorBarco');
        let barcosB = document.getElementsByClassName('Barco');
        for (let i = 0; i < barcosA.length; i++) {
            let orientacion = '';
            if (barcosA[i].dataset.orientation === "horizontal") {
                orientacion = "vertical";
                botonRotarBarcos.innerHTML = `
                    (vertical)<br>
                    Rotar`
            }
            else {
                orientacion = "horizontal";
                botonRotarBarcos.innerHTML = `
                    (horizontal)<br>
                    Rotar`
            }
            barcosA[i].setAttribute("data-orientation", orientacion);
            barcosB[i].setAttribute("orientation", orientacion);
        }
    })
    gameButonSection.appendChild(botonRotarBarcos);
}

// Logica para reiniciar las posiciones de los barcos
function cargarBotonConfirmarPosisiones(){
    let botonResetBarcos = document.createElement("button");
    botonResetBarcos.setAttribute("id", "Reset_Barcos");
    botonResetBarcos.classList.add("boton_accion_juego");
    botonResetBarcos.innerHTML = "Reordenar";

    botonResetBarcos.addEventListener("click", () =>{
        shipsJugada.username = "";
        shipsJugada.ships = [];
        let casillasMarcadas = document.querySelectorAll(".ocupado");
        casillasMarcadas.forEach(element => {
            element.innerHTML = '';
            element.style.backgroundColor = "rgba(240, 248, 255, 0.75)";
            element.classList.remove("ocupado");
        });
        let casillas = document.querySelectorAll(".casilla");
        casillas.forEach(casilla => {
            if (casilla.classList.contains("BLANK"));
            else casilla.setAttribute("class", "casilla");
        })
        asideSection.innerHTML = '';
        CargarBarcos();
        InsertarScriptMovimientoBarcos();
    })
    gameButonSection.appendChild(botonResetBarcos);
}

function InsertarScriptMovimientoBarcos(){
    /* let DraggableBoatsJS = document.createElement("script");
    DraggableBoatsJS.src = "/src/scripts/Barcos_Drag_Function.js";
    DraggableBoatsJS.type = "module";
    DraggableBoatsJS.async = true;
    DraggableBoatsJS.setAttribute("id", "DraggableBoatsJS");
    bodyDocumento.appendChild(DraggableBoatsJS);
    console.log("Script de movimiento de barcos insertado"); */
    cargarMovimientoBarcos();
}

if (tableroCreadoEstado === false) {
    CrearTableroJugador();
    CargarBarcos();
    cargarBotonesBarcos();
    cargarBotonConfirmarPosisiones();
    InsertarScriptMovimientoBarcos();
    tableroCreadoEstado = true;
}