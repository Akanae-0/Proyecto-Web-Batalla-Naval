const gameSection = document.getElementById("Seccion_Tableros");
const asideSection = document.getElementById("Barcos_Lado");
const btnLogin = document.getElementById("Boton_Ingresar");
const textoIngresarUsuario = document.getElementById("Input_Nombre_Usuario");
const btnPlay = document.getElementById("Boton_Jugar");
const userNameCard = document.getElementById("Nombre_Usuario");

// Create a grid, for example, 5x5
var keyUsuario = -1;
const rows = 11;
const columns = 11;
const numeroTableros = 2;
const numeroBarcos = 5;
let gameBoardPlayerTitle = "";
const filaToLetra = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const imgBarcos = ["BattleShip_Lab_Assets/Portaaviones_5_Cas.png", "BattleShip_Lab_Assets/Acorazado_4_Cas.png", "BattleShip_Lab_Assets/Crucero_3_Cas.png", "BattleShip_Lab_Assets/Submarino_3_Cas.png", "BattleShip_Lab_Assets/Destructor_2_Cas.png"];
/*const barcosJuego = [
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
]*/

function cargarBarcos(listaBarcos){
    for (let barco of listaBarcos){
        let barcoCreando = document.createElement("img");
        barcoCreando.setAttribute("id", barco.name);
        switch (barco.name){
            case "Portaaviones":
                barcoCreando.setAttribute("src", imgBarcos[0]);
                break;
            case "Acorazado":
                barcoCreando.setAttribute("src", imgBarcos[1]);
                break;
            case "Crucero":
                barcoCreando.setAttribute("src", imgBarcos[2]);
                break;
            case "Submarino":
                barcoCreando.setAttribute("src", imgBarcos[3]);
                break;
            case "Destructor":
                barcoCreando.setAttribute("src", imgBarcos[4]);
                break;
        }
        barcoCreando.setAttribute("alt", barco.name);
        barcoCreando.classList.add("Barco");
        asideSection.appendChild(barcoCreando);
    }
}

async function getDataBarcos() {
    let url = "https://program-web-taller-4-production.up.railway.app/boats";
    try {
      let responseBarcosFetch = await fetch(url, {
        method: "GET"
      });
      if (!responseBarcosFetch.ok) {
        throw new Error(`Response status: ${responseBarcosFetch.status}`);
      }
      
      let jsonBarcos = await responseBarcosFetch.json();
      let arrayBarcos = jsonBarcos.boats;
      cargarBarcos(arrayBarcos); 
    } catch (error) {
      console.error(error.message);
    }
  }

async function getUsernameValue(nombreUsuario){
    let url = "https://program-web-taller-4-production.up.railway.app/login";
    let nombreUsuarioCopy = nombreUsuario;
    let cuerpoPost = JSON.stringify({ username: nombreUsuario });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestLogin =  {
        method: 'POST',
        headers: myHeaders,
        body: cuerpoPost,
        redirect: 'follow'
    };

    try {
        let responseLogin = await fetch("https://program-web-taller-4-production.up.railway.app/login", requestLogin);
        if (!responseLogin.ok) {
            throw new Error(`Response status: ${responseLogin.status}`);
        }
        let parsedResponse = await responseLogin.json();
        keyUsuario = parsedResponse.key;
        btnLogin.style.display = "none";
        textoIngresarUsuario.style.display = "none";
        btnPlay.style.display = "block";
        userNameCard.innerHTML = nombreUsuarioCopy;
        userNameCard.style.display = "block";
    } catch (error) {
        console.error(error.message);
        textoIngresarUsuario.value = "Usuario Invalido";
    }
}

btnLogin.addEventListener("click", () => {
    let nombreUsuario = document.getElementById("Input_Nombre_Usuario");
    let nombreUsuarioString = nombreUsuario.value;
    getUsernameValue(nombreUsuarioString);
});

btnPlay.addEventListener("click", () => {
    let socketServer = new WebSocket("ws://program-web-taller-4-production.up.railway.app");
    socketServer.addEventListener("open", (event) => {
        socketServer.send(keyUsuario);
    })
    socketServer.addEventListener("message", (event) => {
        console.log("Mesaje del Servidor: ", event.data);
    })
})

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

getDataBarcos();

