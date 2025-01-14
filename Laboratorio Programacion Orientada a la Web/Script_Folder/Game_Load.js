
const gameSection = document.getElementById("Seccion_Tableros");
const asideSection = document.getElementById("Barcos_Lado")
const btnLogin = document.getElementById("Boton_Ingresar");
const textoIngresarUsuario = document.getElementById("Input_Nombre_Usuario");
const btnPlay = document.getElementById("Boton_Jugar");
const userNameCard = document.getElementById("Nombre_Usuario");

var loggeado = false;
// Create a grid, for example, 5x5
const rows = 11;
const columns = 11;
const numeroTableros = 2;
const numeroBarcos = 5;
let gameBoardPlayerTitle = "";
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
        orientation: "vertical"
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
        orientation: "vertical"
    },
    {
        name: "Destructor",
        source: "BattleShip_Lab_Assets/Destructor_2_Cas.png",
        spaces: 2,
        orientation: "horizontal"
    }
]

function CrearTableros() {
    for (let x = 0; x < numeroTableros; x++) {

        let unidadTableroCreacion = document.createElement("section");
        unidadTableroCreacion.classList.add("Board_Unity");
    
        if (x == 0){
            gameBoardPlayerTitle = "JUGADOR";
        } else{
            gameBoardPlayerTitle = `OPONENTE#${x}`;
        }
    
        unidadTableroCreacion.setAttribute('id', `TABLERO#${x}`);
        let idUnidadTablero = unidadTableroCreacion.id;
    
        // Create game board title
        let titleCardBoard = document.createElement("p");
        titleCardBoard.classList.add("Board_Title_Card");
        titleCardBoard.innerHTML = gameBoardPlayerTitle;
    
        unidadTableroCreacion.appendChild(titleCardBoard);
    
        // Create game board format
        let tableroCreacion = document.createElement("section");
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

                } else gridItem.setAttribute('id', "Casilla_"+filaToLetra[i]+","+(j-1)+"_"+idUnidadTablero);

                // Append the grid item to the body
                tableroCreacion.appendChild(gridItem);
            }
        }
        
        unidadTableroCreacion.appendChild(tableroCreacion);
    
        gameSection.appendChild(unidadTableroCreacion);
    }
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

function IniciarJuego() {
    console.log("Iniciando juego");
    CrearTableros();
    CargarBarcos();
}

function getUsernameValue(nombreUsuario){
    btnLogin.style.display = "none";
    textoIngresarUsuario.style.display = "none";
    btnPlay.style.display = "block";
    userNameCard.innerHTML = nombreUsuario;
    userNameCard.style.display = "block";
    loggeado = true;
}

btnLogin.addEventListener("click", () => {
    let nombreUsuario = document.getElementById("Input_Nombre_Usuario");
    let nombreUsuarioString = nombreUsuario.value;
    getUsernameValue(nombreUsuarioString);
});

btnPlay.addEventListener("click", async () => {
    let VentanaJuego = document.getElementById("Ventana_Principal_Juego");
    let MenuHolder = document.getElementById("Menu_Holder");
    VentanaJuego.style.display = "flex";
    MenuHolder.style.display = "none";
    IniciarJuego();
    btnPlay.style.display = "none";
    // let scriptTag = document.createElement("script");
    // scriptTag.src = "./Barcos_Drag_Function.js";
    // scriptTag.setAttribute("id", "Script_Barcos_Drag")
    // document.body.appendChild(scriptTag);
    hacerBarcosArrastrables();      // Configura drag-and-drop para los barcos
    configurarTableroDragAndDrop(); // Configura el tablero para aceptar barcos
})

function hacerBarcosArrastrables() {
    const barcosDOM = document.querySelectorAll(".contenedorBarco"); // Selecciona los elementos HTML con clase "Barco"
    barcosDOM.forEach( barco => {                                    // Recorre la lista con los barcos, "barco" es el nodo que se este recorriendo
        barco.setAttribute("draggable", "true");                     // Activa que el elemento sea arrastrable 
        // INICIA EL ARRASTRADO
        barco.addEventListener("dragstart", (e) => {                 // Al arrastrar un elemento que se le asigno draggable = true, se dispara un evento  "(e)" dragstart
            barcoArrastrado = barco;                                 // Guarda el elemento del barco arrastrado
            e.dataTransfer.setData("text/plain", JSON.stringify({    // e.dataTransfer es un objeto que almacena la informacion necesaria del evento
                name: barco.dataset.name,                            // Guarda el nombre 
                source: barco.dataset.source,                        // Guarda la imagen
                spaces: parseInt(barco.dataset.spaces, 10),          // Guarda el tamaño
                orientation: barco.dataset.orientation               // Guarda la orientacion
            }));
            barco.classList.add("dragging");                         // Agrega una clase CSS ".dragging" 
        });

        // TERMINA EL ARRASTRADO
        barco.addEventListener("dragend", () => {
            barco.classList.remove("dragging");                     // Elimina la clase CSS ".dragging" 
        });
    });
}

// Permitir arrastrar y soltar en el tablero
function configurarTableroDragAndDrop() {
    const casillas = document.querySelectorAll(".casilla");    // "casillas" es una especie de arreglo que almacenara todos los <div> de las casillas de los tableros

    casillas.forEach(casilla => {
        

        // DETECTA CUANDO SE ARRASTRA ALGO SOBRE LA CASILLA
        casilla.addEventListener("dragover", (e) => {
            e.preventDefault();                     // Permitir "drop"
            let casillaInicial = casilla.id
            let fila = filaToLetra.indexOf(casillaInicial[8])          
            let columna = parseInt(casillaInicial[10])           
            let numeroTablero = casillaInicial[20]              
            let tamanoBarco = barcoArrastrado.dataset.spaces
            let direccion = barcoArrastrado.dataset.orientation
            if (numeroTablero == 0){
                //HORIZONTAL
                if ( direccion == "horizontal"){
                    for (let i = 0; i < tamanoBarco; i++) {
                        let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila]+ "," + (columna+i).toString() + "_TABLERO#" + numeroTablero);
                        if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")){
                            siguienteCasilla.classList.add("dragover");
                        }
                    }
                }
                //VERTICAL
                if ( direccion == "vertical"){
                    for (let i = 0; i < tamanoBarco; i++) {
                        let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila+i]+ "," + columna.toString() + "_TABLERO#" + numeroTablero);
                        if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")){
                            siguienteCasilla.classList.add("dragover");
                        }
                    }
                }
            }
        });

        // DETECTA CUANDO DE DEJA DE ARRASTRAR ALGO SOBRE LA CASILLA
        casilla.addEventListener("dragleave", () => {
            let casillaInicial = casilla.id
            let fila = filaToLetra.indexOf(casillaInicial[8])          
            let columna = parseInt(casillaInicial[10])           
            let numeroTablero = casillaInicial[20]   
            let tamanoBarco = barcoArrastrado.dataset.spaces
            let direccion = barcoArrastrado.dataset.orientation
            //HORIZONTAL
            if ( direccion == "horizontal"){
                for (let i = 0; i < tamanoBarco; i++) {
                    let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila]+ "," + (columna+i).toString() + "_TABLERO#" + numeroTablero);
                    if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")){
                        siguienteCasilla.classList.remove("dragover");
                    }
                }
            }
            //VERTICAL
            if ( direccion == "vertical"){
                for (let i = 0; i < tamanoBarco; i++) {
                    let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila+i]+ "," + columna.toString() + "_TABLERO#" + numeroTablero);
                    if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")){
                        siguienteCasilla.classList.remove("dragover");
                    }
                }
            }
        });

        // DETECTA CUANDO ALGO SE SUELTA SOBRE LA CASILLA 
        casilla.addEventListener("drop", (e) => {
            e.preventDefault();
            
            if (casilla.id[20] == 0){
                // Obtén los datos del barco arrastrado
                const datosBarco = JSON.parse(e.dataTransfer.getData("text/plain"));
                console.log("Barco colocado:", datosBarco);

                // Lógica para colocar el barco en la casilla
                if (puedeColocarseBarco(casilla.id, datosBarco.spaces, datosBarco.orientation)) {
                    colocarBarco(casilla.id, datosBarco.spaces, datosBarco.orientation);
                    barcoArrastrado.remove(); // Elimina el barco del aside
                    barcoArrastrado=null;
                } else {
                    alert("No se puede colocar el barco aquí.");
                    let casillaInicial = casilla.id                         // Todas estas lineas evitan que visualmente 
                    let fila = filaToLetra.indexOf(casillaInicial[8])       // parezca que se coloco el barco
                    let columna = parseInt(casillaInicial[10])              
                    let numeroTablero = casillaInicial[20]   
                    let tamanoBarco = barcoArrastrado.dataset.spaces
                    let direccion = barcoArrastrado.dataset.orientation
                    //HORIZONTAL
                    if ( direccion == "horizontal"){
                        for (let i = 0; i < tamanoBarco; i++) {
                            let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila]+ "," + (columna+i).toString() + "_TABLERO#" + numeroTablero);
                            if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")){
                                siguienteCasilla.classList.remove("dragover");
                            }
                        }
                    }
                    //VERTICAL
                    if ( direccion == "vertical"){
                        for (let i = 0; i < tamanoBarco; i++) {
                            let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila+i]+ "," + columna.toString() + "_TABLERO#" + numeroTablero);
                            if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")){
                                siguienteCasilla.classList.remove("dragover");
                            }
                        }
                    }
                }
            } else {
                alert("No se puede colocar el barco aquí.\n Barco en el tablero rival");
            }
        });
    });
}

function puedeColocarseBarco(casillaInicial, tamanoBarco, direccion) {
    let fila = filaToLetra.indexOf(casillaInicial[8])          // Aqui agarro el numero de la fila (paso de letra a su posicion en el arreglo)
    let columna = parseInt(casillaInicial[10])                 // Aqui agarro el numeor de la columna
    let numeroTablero = casillaInicial[20]                     // Aqui agarro en numero del tablero donde se solto el barco
    if (parseInt(numeroTablero) != 0) return false;            // Aqui valido que no hayan soltado el barco en un tablero rival    
    
    //INSERTANDO EL BARCO HORIZONTALMENTE
    if ( direccion == "horizontal"){
        for (let i = 0; i < tamanoBarco; i++) {
            let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila]+ "," + (columna+i).toString() + "_TABLERO#" + numeroTablero);
            if (!siguienteCasilla || siguienteCasilla.classList.contains("ocupado")) {
                return false;
            }
        }
    }

    //INSERTANDO EL BARCO VERTICALMENTE
    if ( direccion == "vertical"){
        for (let i = 0; i < tamanoBarco; i++) {
            let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila+i]+ "," + columna.toString() + "_TABLERO#" + numeroTablero);
            if (!siguienteCasilla || siguienteCasilla.classList.contains("ocupado")) {
                return false;
            }
        }
    }
    return true;
}

function colocarBarco(casillaInicial, tamanoBarco, direccion) {
    let fila = filaToLetra.indexOf(casillaInicial[8])          // Aqui agarro el numero de la fila (paso de letra a su posicion en el arreglo)
    let columna = parseInt(casillaInicial[10])                 // Aqui agarro el numeor de la columna
    let numeroTablero = casillaInicial[20]                     // Aqui agarro en numero del tablero donde se solto el barco

    const proa = "BattleShip_Lab_Assets/Proa_barco.png";  
    const cuerpo = "BattleShip_Lab_Assets/Cuerpo_barco.png";  
    const popa = "BattleShip_Lab_Assets/Popa_barco.png";

    //COLOCANDO EL BARCO HORIZONTALMENTE
    if ( direccion == "horizontal"){
        for (let i = 0; i < tamanoBarco; i++) {
            let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila]+ "," + (columna+i).toString() + "_TABLERO#" + numeroTablero);
            siguienteCasilla.classList.add("ocupado");

            if (i == 0) {
                siguienteCasilla.innerHTML = `<img src="${proa}" alt="Proa" class="parte-barco">`;  
            } else if (i == tamanoBarco - 1) {
                siguienteCasilla.innerHTML = `<img src="${popa}" alt="Popa"  class="parte-barco">`;  
            } else {
                siguienteCasilla.innerHTML = `<img src="${cuerpo}" alt="Cuerpo" class="parte-barco">`;
            }
        }
    }

    //COLOCANDO EL BARCO VERTICALMENTE
    if ( direccion == "vertical"){
        for (let i = 0; i < tamanoBarco; i++) {
            let siguienteCasilla = document.getElementById("Casilla_"+filaToLetra[fila+i]+ "," + columna.toString() + "_TABLERO#" + numeroTablero);
            siguienteCasilla.classList.add("ocupado");
            
            if (i == 0) {
                siguienteCasilla.innerHTML = `<img src="${proa}" alt="Proa" class="parte-barco vertical">`;  
            } else if (i == tamanoBarco - 1) {
                siguienteCasilla.innerHTML = `<img src="${popa}" alt="Popa" class="parte-barco vertical">`;  
            } else {
                siguienteCasilla.innerHTML = `<img src="${cuerpo}" alt="Cuerpo" class="parte-barco vertical">`;
            }
        }
    }
}

function seleccionarCasillaDisparo(gridItem) {
    // Solo añadir event listener a las casillas del oponente
    gridItem.addEventListener('click', function() {
        let selectedCellId = this.id;
        this.innerHTML = "X"; // Marcar la casilla con una "X"
        console.log('Selected cell:', selectedCellId);
        let coordenadas = extractValues(selectedCellId);
    });
    
}

function extractValues(str) {
    let regex = /^Casilla_([A-J]),([0-9]+)_TABLERO_([A-Z]+)$/;
    let match = str.match(regex);
    if (match) {
        let letter = match[1];
        let number = match[2];
        let tablero = match[3];
        let letterIndex = filaToLetra.indexOf(letter);
        return { letterIndex, number, tablero };
    } else {
        return null;
    }
}