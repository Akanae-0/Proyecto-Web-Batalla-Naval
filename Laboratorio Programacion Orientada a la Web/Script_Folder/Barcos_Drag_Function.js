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
    let casillas = document.querySelectorAll(".casilla");    // "casillas" es una especie de arreglo que almacenara todos los <div> de las casillas de los tableros

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
                let datosBarco = JSON.parse(e.dataTransfer.getData("text/plain"));
                console.log("Barco colocado:", datosBarco);

                // Lógica para colocar el barco en la casilla
                if (puedeColocarseBarco(casilla.id, datosBarco.spaces, datosBarco.orientation)) {
                    for (let i = 0; i < barcosJuego.length; i++) {
                        if (barcosJuego[i].name === datosBarco.name) {
                            let casillaNumero = casilla.id[10] - 1 + 2;
                            barcosJuego[i].casillaOcupada  = '' + casilla.id[8] + casillaNumero;
                            break;
                        }
                    }
                    console.log("Barcos juego:", barcosJuego);
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

hacerBarcosArrastrables();
configurarTableroDragAndDrop();