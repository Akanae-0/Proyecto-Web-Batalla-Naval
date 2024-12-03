const gameSection = document.getElementById("Seccion_Tableros");
const asideSection = document.getElementById("Barcos_Lado")

// Create a grid, for example, 5x5
const rows = 11;
const columns = 11;
const numeroTableros = 2;
const numeroBarcos = 5;
let gameBoardPlayerTitle = "";
const filaToLetra = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "j"];
const barcosJuego = [
    {
        name: "Portaaviones",
        sourceHorizontal: "BattleShip_Lab_Assets/Portaaviones_5_Cas.png",
        sourceVertical: "BattleShip_Lab_Assets/Portaaviones_5_Cas_Ver.png",
        spaces: 5
    },
    {
        name: "Acorazado",
        sourceHorizontal: "BattleShip_Lab_Assets/Acorazado_4_Cas.png",
        sourceVertical: "BattleShip_Lab_Assets/Acorazado_4_Cas_Ver.png",
        spaces: 4
    },
    {
        name: "Crucero",
        sourceHorizontal: "BattleShip_Lab_Assets/Crucero_3_Cas.png",
        sourceVertical: "BattleShip_Lab_Assets/Crucero_3_Cas_Ver.png",
        spaces: 3
    },
    {
        name: "Submarino",
        sourceHorizontal: "BattleShip_Lab_Assets/Submarino_3_Cas.png",
        sourceVertical: "BattleShip_Lab_Assets/Submarino_3_Cas_Ver.png",
        spaces: 3
    },
    {
        name: "Destructor",
        sourceHorizontal: "BattleShip_Lab_Assets/Destructor_2_Cas.png",
        sourceVertical: "BattleShip_Lab_Assets/Destructor_2_Cas_Ver.png",
        spaces: 2
    }
]



for (let x = 0; x < numeroTableros; x++) {

    let unidadTableroCreacion = document.createElement("section");
    unidadTableroCreacion.classList.add("Board_Unity");

    if (x == 0){
        gameBoardPlayerTitle = "JUGADOR";
    } else{
        gameBoardPlayerTitle = "OPONENTE";
    }

    unidadTableroCreacion.setAttribute('id', "TABLERO_" + gameBoardPlayerTitle);
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
                    switch (i) {
                        case 1:
                            gridItem.innerHTML = "A";
                            break;
                        case 2:
                            gridItem.innerHTML = "B";
                            break;
                        case 3:
                            gridItem.innerHTML = "C";
                            break;
                        case 4:
                            gridItem.innerHTML = "D";
                            break;
                        case 5:
                            gridItem.innerHTML = "E";
                            break;
                        case 6:
                            gridItem.innerHTML = "F";
                            break;
                        case 7:
                            gridItem.innerHTML = "G";
                            break;
                        case 8:
                            gridItem.innerHTML = "H";
                            break;
                        case 9:
                            gridItem.innerHTML = "I";
                            break;
                        case 10:
                            gridItem.innerHTML = "J";
                            break;
                        default:
                            break;
                    }
                }
                if (i == 0) {
                    switch (j) {
                        case 1:
                            gridItem.innerHTML = "1";
                            break;
                        case 2:
                            gridItem.innerHTML = "2";
                            break;
                        case 3:
                            gridItem.innerHTML = "3";
                            break;
                        case 4:
                            gridItem.innerHTML = "4";
                            break;
                        case 5:
                            gridItem.innerHTML = "5";
                            break;
                        case 6:
                            gridItem.innerHTML = "6";
                            break;
                        case 7:
                            gridItem.innerHTML = "7";
                            break;
                        case 8:
                            gridItem.innerHTML = "8";
                            break;
                        case 9:
                            gridItem.innerHTML = "9";
                            break;
                        case 10:
                            gridItem.innerHTML = "10";
                            break;
                        default:
                            break;
                    }
                }
            } else gridItem.setAttribute('id', "Casilla_"+filaToLetra[i]+","+j+"_"+idUnidadTablero);

            // Append the grid item to the body
            tableroCreacion.appendChild(gridItem);
        }
    }
    
    unidadTableroCreacion.appendChild(tableroCreacion);

    gameSection.appendChild(unidadTableroCreacion);
}

/*for (let barco of barcosJuego){
    let barcoCreando = document.createElement("div");
    barcoCreando.setAttribute("id", barco.name);
    barcoCreando.classList.add("Barco");
    let barcoCreandoHorizontal = document.createElement("img");
    barcoCreandoHorizontal.setAttribute("id", barco.name + "_H");
    barcoCreandoHorizontal.setAttribute("src", barco.sourceHorizontal);
    barcoCreandoHorizontal.setAttribute("alt", barco.name);
    barcoCreandoHorizontal.classList.add("Barco_Horizontal");
    let barcoCreandoVertical = document.createElement("img");
    barcoCreandoVertical.setAttribute("id", barco.name + "_V");
    barcoCreandoVertical.setAttribute("src", barco.sourceVertical);
    barcoCreandoVertical.setAttribute("alt", barco.name);
    barcoCreandoVertical.classList.add("Barco_Vertical");
    barcoCreando.appendChild(barcoCreandoHorizontal);
    barcoCreando.appendChild(barcoCreandoVertical);
    asideSection.appendChild(barcoCreando);
}*/
for (let barco of barcosJuego){
    let barcoCreando = document.createElement("picture");
    barcoCreando.setAttribute("id", barco.name);
    barcoCreando.classList.add("Barco");
    barcoCreando.innerHTML = `
    <source media="(max-width: 550px)" srcset=`+barco.sourceHorizontal+`>
    <source media="(min-width: 551px)" srcset=`+barco.sourceVertical+`>
    <img src=`+barco.sourceVertical+` alt="`+barco.name+`" class="Barco_Inner">
    `
    asideSection.appendChild(barcoCreando);
}