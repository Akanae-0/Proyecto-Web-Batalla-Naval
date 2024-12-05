const gameSection = document.getElementById("Seccion_Tableros");
const asideSection = document.getElementById("Barcos_Lado")

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
        spaces: 5
    },
    {
        name: "Acorazado",
        source: "BattleShip_Lab_Assets/Acorazado_4_Cas.png",
        spaces: 4
    },
    {
        name: "Crucero",
        source: "BattleShip_Lab_Assets/Crucero_3_Cas.png",
        spaces: 3
    },
    {
        name: "Submarino",
        source: "BattleShip_Lab_Assets/Submarino_3_Cas.png",
        spaces: 3
    },
    {
        name: "Destructor",
        source: "BattleShip_Lab_Assets/Destructor_2_Cas.png",
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
                    if (i > 0) gridItem.innerHTML = filaToLetra[i];
                }
                if (i == 0) {
                    if (j > 0) gridItem.innerHTML = j;
                }
            } else gridItem.setAttribute('id', "Casilla_"+filaToLetra[i]+","+j+"_"+idUnidadTablero);

            // Append the grid item to the body
            tableroCreacion.appendChild(gridItem);
        }
    }
    
    unidadTableroCreacion.appendChild(tableroCreacion);

    gameSection.appendChild(unidadTableroCreacion);
}

for (let barco of barcosJuego){
    let barcoCreando = document.createElement("img");
    barcoCreando.setAttribute("id", barco.name);
    barcoCreando.setAttribute("src", barco.source);
    barcoCreando.setAttribute("alt", barco.name);
    barcoCreando.classList.add("Barco");
    asideSection.appendChild(barcoCreando);
}
