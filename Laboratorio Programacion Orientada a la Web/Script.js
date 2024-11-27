var game_section = document.getElementById("Seccion_Tableros");

// Create a grid, for example, 5x5
var rows = 11;
var columns = 11;
var numero_tableros = 2;
var game_board_player_title = "";

for (var x = 0; x < numero_tableros; x++) {

    var unidad_tablero_creacion = document.createElement("section");
    unidad_tablero_creacion.classList.add("Board_Unity");

    if (x == 0){
        game_board_player_title = "JUGADOR";
    } else{
        game_board_player_title = "OPONENTE";
    }

    unidad_tablero_creacion.setAttribute('id', "TABLERO_" + game_board_player_title);
    var id_Unidad_Tablero = unidad_tablero_creacion.id;

    // Create game board title
    var title_card_board = document.createElement("p");
    title_card_board.classList.add("Board_Title_Card");
    title_card_board.innerHTML = game_board_player_title;

    unidad_tablero_creacion.appendChild(title_card_board);

    // Create game board format
    var tablero_creacion = document.createElement("section");
    tablero_creacion.classList.add("Board");

    // Loop to create grid items and append them to the body


    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            var gridItem = document.createElement("div");
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
            } else gridItem.setAttribute('id', "Casilla_"+i+","+j+"_"+id_Unidad_Tablero);

            // Append the grid item to the body
            tablero_creacion.appendChild(gridItem);
        }
    }
    
    unidad_tablero_creacion.appendChild(tablero_creacion);

    game_section.appendChild(unidad_tablero_creacion);
}