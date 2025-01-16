/*//documento
const gameSection = document.getElementById("Seccion_Tableros");
const asideSection = document.getElementById("Barcos_Lado");
const gameButonSection = document.getElementById("Botones_In_Game");
const bodyDocumento = document.body;
//Tableros
const rows = 11;
const columns = 11;
const filaToLetra = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const barcosJuego = [
    {
        name: "Portaaviones",
        source: "BattleShip_Lab_Assets/Portaaviones_5_Cas.png",
        spaces: 5,
        orientation: "horizontal"
    },
    {
        name: "Acorazado",
        source: "BattleShip_Lab_Assets/Acorazado_4_Cas.png",
        spaces: 4,
        orientation: "horizontal"
    },
    {
        name: "Crucero",
        source: "BattleShip_Lab_Assets/Crucero_3_Cas.png",
        spaces: 3,
        orientation: "horizontal"
    },
    {
        name: "Submarino",
        source: "BattleShip_Lab_Assets/Submarino_3_Cas.png",
        spaces: 3,
        orientation: "horizontal"
    },
    {
        name: "Destructor",
        source: "BattleShip_Lab_Assets/Destructor_2_Cas.png",
        spaces: 2,
        orientation: "horizontal"
    }
]*/

function CrearTableroJugador() {

    let unidadTableroCreacion = document.createElement("section");
    unidadTableroCreacion.classList.add("Board_Unity");

    gameBoardPlayerTitle = "JUGADOR";

    unidadTableroCreacion.setAttribute('id', `TABLERO#0`);
    let idUnidadTablero = unidadTableroCreacion.id;

    // Create game board title
    let titleCardBoard = document.createElement("p");
    titleCardBoard.classList.add("Board_Title_Card");
    titleCardBoard.innerHTML = gameBoardPlayerTitle;

    unidadTableroCreacion.appendChild(titleCardBoard);

    // Create game board format
    let tableroCreacion = document.createElement("section");
    tableroCreacion.setAttribute("id", "Tablero_Jugador_0")
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
                    if (j > 0) gridItem.innerHTML = (j-1);
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

function cargarBotonesBarcos(){
    let botonRotarBarcos = document.createElement("button");
    botonRotarBarcos.setAttribute("id", "Boton_Rotar_Barcos");
    botonRotarBarcos.innerHTML = "Rotar";
    botonRotarBarcos.classList.add("boton_accion_juego");
    botonRotarBarcos.addEventListener("click", () => {
        let barcosA = document.getElementsByClassName('contenedorBarco');
        let barcosB = document.getElementsByClassName('Barco');
        for (let i = 0; i < barcosA.length; i++) {
            let orientacion = '';
            if (barcosA[i].dataset.orientation === "horizontal") orientacion = "vertical";
            else orientacion = "horizontal";
            barcosA[i].setAttribute("data-orientation", orientacion);
            barcosB[i].setAttribute("orientation", orientacion);
        }
    })
    gameButonSection.appendChild(botonRotarBarcos);
}

function cargarBotonConfirmarPosisiones(){
    let botonResetBarcos = document.createElement("button");
    botonResetBarcos.setAttribute("id", "Reset_Barcos");
    botonResetBarcos.classList.add("boton_accion_juego");
    botonResetBarcos.innerHTML = "Reordenar";
    botonResetBarcos.addEventListener("click", () =>{
        let DragScripts = document.getElementById("DraggableBoatsJS");
        DragScripts.remove();
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
    let DraggableBoatsJS = document.createElement("script");
    DraggableBoatsJS.src = "Script_Folder/Barcos_Drag_Function.js";
    DraggableBoatsJS.type = "text/javascript";
    DraggableBoatsJS.async = true;
    DraggableBoatsJS.setAttribute("id", "DraggableBoatsJS");
    bodyDocumento.appendChild(DraggableBoatsJS);
}

CrearTableroJugador();
CargarBarcos();
cargarBotonesBarcos();
cargarBotonConfirmarPosisiones();
InsertarScriptMovimientoBarcos();


