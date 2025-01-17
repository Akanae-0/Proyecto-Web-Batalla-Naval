/* let shipsJugada = {
    username: "",
    ships: []
} */

function hacerBarcosArrastrables() {
    const barcosDOM = document.querySelectorAll(".contenedorBarco");
    barcosDOM.forEach(barco => {
        barco.setAttribute("draggable", "true");
        
        // INICIA EL ARRASTRADO
        barco.addEventListener("dragstart", (e) => {
            barcoArrastrado = barco;
            e.dataTransfer.setData("text/plain", JSON.stringify({
                name: barco.dataset.name,
                source: barco.dataset.source,
                spaces: parseInt(barco.dataset.spaces, 10),
                orientation: barco.dataset.orientation
            }));
            barco.classList.add("dragging");
        });

        // TERMINA EL ARRASTRADO
        barco.addEventListener("dragend", () => {
            barco.classList.remove("dragging");
        });
    });
}

// Permitir arrastrar y soltar en el tablero
function configurarTableroDragAndDrop() {
    let casillas = document.querySelectorAll(".casilla");

    casillas.forEach(casilla => {

        // DETECTA CUANDO SE ARRASTRA ALGO SOBRE LA CASILLA
        casilla.addEventListener("dragover", (e) => {
            e.preventDefault();
            let casillaInicial = casilla.id;
            let fila = filaToLetra.indexOf(casillaInicial[8]);
            let columna = parseInt(casillaInicial[10]);
            let numeroTablero = casillaInicial[20];
            let tamanoBarco = barcoArrastrado.dataset.spaces;
            let direccion = barcoArrastrado.dataset.orientation;
            if (numeroTablero == 0){
                // HORIZONTAL
                if (direccion == "horizontal"){
                    for (let i = 0; i < tamanoBarco; i++) {
                        let siguienteCasilla = document.getElementById("Casilla_" + filaToLetra[fila] + "," + (columna + i).toString() + "_TABLERO#" + numeroTablero);
                        if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")) {
                            siguienteCasilla.classList.add("dragover");
                        }
                    }
                }
                // VERTICAL
                if (direccion == "vertical"){
                    for (let i = 0; i < tamanoBarco; i++) {
                        let siguienteCasilla = document.getElementById("Casilla_" + filaToLetra[fila + i] + "," + columna.toString() + "_TABLERO#" + numeroTablero);
                        if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")) {
                            siguienteCasilla.classList.add("dragover");
                        }
                    }
                }
            }
        });

        // DETECTA CUANDO DE DEJA DE ARRASTRAR ALGO SOBRE LA CASILLA
        casilla.addEventListener("dragleave", () => {
            let casillaInicial = casilla.id;
            let fila = filaToLetra.indexOf(casillaInicial[8]);
            let columna = parseInt(casillaInicial[10]);
            let numeroTablero = casillaInicial[20];
            let tamanoBarco = barcoArrastrado.dataset.spaces;
            let direccion = barcoArrastrado.dataset.orientation;
            // HORIZONTAL
            if (direccion == "horizontal"){
                for (let i = 0; i < tamanoBarco; i++) {
                    let siguienteCasilla = document.getElementById("Casilla_" + filaToLetra[fila] + "," + (columna + i).toString() + "_TABLERO#" + numeroTablero);
                    if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")) {
                        siguienteCasilla.classList.remove("dragover");
                    }
                }
            }
            // VERTICAL
            if (direccion == "vertical"){
                for (let i = 0; i < tamanoBarco; i++) {
                    let siguienteCasilla = document.getElementById("Casilla_" + filaToLetra[fila + i] + "," + columna.toString() + "_TABLERO#" + numeroTablero);
                    if (siguienteCasilla && !siguienteCasilla.classList.contains("ocupado")) {
                        siguienteCasilla.classList.remove("dragover");
                    }
                }
            }
        });

        // DETECTA CUANDO ALGO SE SUELTA SOBRE LA CASILLA 
        casilla.addEventListener("drop", (e) => {
            e.preventDefault();
            if (casilla.id[20] == 0) {
                let datosBarco = JSON.parse(e.dataTransfer.getData("text/plain"));

                if (puedeColocarseBarco(casilla.id, datosBarco.spaces, datosBarco.orientation)) {
                    for (let i = 0; i < barcosJuego.length; i++) {
                        if (barcosJuego[i].name === datosBarco.name) {
                            let casillaNumero = casilla.id[10] - 1 + 2;
                            barcosJuego[i].casillaOcupada  = '' + casilla.id[8] + casillaNumero;
                            break;
                        }
                    }
                    colocarBarco(casilla.id, datosBarco, datosBarco.orientation);
                    barcoArrastrado.remove(); // Elimina el barco del aside
                    barcoArrastrado = null;
                } else if (barcoArrastrado != null) {
                    alert("No se puede colocar el barco aquí.");
                }
            } else {
                alert("No se puede colocar el barco aquí.\n Barco en el tablero rival");
            }
        });
    });
}

function puedeColocarseBarco(casillaInicial, tamanoBarco, direccion) {
    let fila = filaToLetra.indexOf(casillaInicial[8]);
    let columna = parseInt(casillaInicial[10]);
    let numeroTablero = casillaInicial[20];
    if (parseInt(numeroTablero) != 0) return false;

    if (direccion == "horizontal") {
        for (let i = 0; i < tamanoBarco; i++) {
            let siguienteCasilla = document.getElementById("Casilla_" + filaToLetra[fila] + "," + (columna + i).toString() + "_TABLERO#" + numeroTablero);
            if (!siguienteCasilla || siguienteCasilla.classList.contains("ocupado")) {
                return false;
            }
        }
    }

    if (direccion == "vertical") {
        for (let i = 0; i < tamanoBarco; i++) {
            let siguienteCasilla = document.getElementById("Casilla_" + filaToLetra[fila + i] + "," + columna.toString() + "_TABLERO#" + numeroTablero);
            if (!siguienteCasilla || siguienteCasilla.classList.contains("ocupado")) {
                return false;
            }
        }
    }
    return true;
}

function colocarBarco(casillaInicial, datosBarco, direccion) {
    let fila = filaToLetra.indexOf(casillaInicial[8]);
    let columna = parseInt(casillaInicial[10]);
    let numeroTablero = casillaInicial[20];

    const proa = "BattleShip_Lab_Assets/Proa_barco.png";  
    const cuerpo = "BattleShip_Lab_Assets/Cuerpo_barco.png";  
    const popa = "BattleShip_Lab_Assets/Popa_barco.png";

    if (direccion == "horizontal") {
        for (let i = 0; i < datosBarco.spaces; i++) {
            let siguienteCasilla = document.getElementById("Casilla_" + filaToLetra[fila] + "," + (columna + i).toString() + "_TABLERO#" + numeroTablero);
            siguienteCasilla.classList.add("ocupado");

            if (i == 0) {
                siguienteCasilla.innerHTML = `<img src="${proa}" alt="Proa" class="parte-barco">`;  
            } else if (i == datosBarco.spaces - 1) {
                siguienteCasilla.innerHTML = `<img src="${popa}" alt="Popa" class="parte-barco">`;  
            } else {
                siguienteCasilla.innerHTML = `<img src="${cuerpo}" alt="Cuerpo" class="parte-barco">`;
            }
        }
    }

    if (direccion == "vertical") {
        for (let i = 0; i < datosBarco.spaces; i++) {
            let siguienteCasilla = document.getElementById("Casilla_" + filaToLetra[fila + i] + "," + columna.toString() + "_TABLERO#" + numeroTablero);
            siguienteCasilla.classList.add("ocupado");

            if (i == 0) {
                siguienteCasilla.innerHTML = `<img src="${proa}" alt="Proa" class="parte-barco vertical">`;  
            } else if (i == datosBarco.spaces - 1) {
                siguienteCasilla.innerHTML = `<img src="${popa}" alt="Popa" class="parte-barco vertical">`;  
            } else {
                siguienteCasilla.innerHTML = `<img src="${cuerpo}" alt="Cuerpo" class="parte-barco vertical">`;
            }
        }
    }
    
    let barcoColocado = 0;
    if ( datosBarco.name == "Portaaviones") barcoColocado=5;
    if ( datosBarco.name == "Acorazado") barcoColocado=4;
    if ( datosBarco.name == "Crucero") barcoColocado=3
    if ( datosBarco.name == "Submarino") barcoColocado=2;
    if ( datosBarco.name == "Destructor") barcoColocado=1;

    
    let position = filaToLetra[fila]+ (columna).toString()
    let vertical = false;
    if (direccion == "vertical") vertical = true;
    
    shipsJugada.ships.push({
        id: barcoColocado,
        position: position,
        vertical: vertical
    });
}

hacerBarcosArrastrables();
configurarTableroDragAndDrop();