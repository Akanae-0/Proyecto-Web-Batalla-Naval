/* import './Script_Folder/Barcos_Drag_Function.js';
import './Script_Folder/Game_Start_Functions.js';
import './Script_Folder/Main_Menu.js';
import  './Script_Folder/User_Logged_Pre_Game.js'; */


// REFERENCIAS A ELEMENTOS DEL DOM
const bodyDocumento = document.body;
const gameSection = document.getElementById("Seccion_Tableros");
const asideSection = document.getElementById("Barcos_Lado");
const gameButonSection = document.getElementById("Botones_In_Game");
const btnLogin = document.getElementById("Boton_Ingresar");
const textoIngresarUsuario = document.getElementById("Input_Nombre_Usuario");
const btnPlay = document.getElementById("Boton_Jugar");
const userNameCard = document.getElementById("Nombre_Usuario");
// VARIABLES GLOBALES
const arrayBarcoToNumero = ["Portaaviones", "Acorazado", "Crucero", "Submarino", "Destructor"];
var username = "";
var loggeado = false;
var turnoJugador = false;
var rivalUser = "";
var gameSeaching = false;
// VARIABLES DE JUEGO
const rows = 11;
const columns = 11;
const filaToLetra = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const barcosJuego = [
    {
        name: "Portaaviones",
        source: "BattleShip_Lab_Assets/Portaaviones_5_Cas.png",
        spaces: 5,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 5
    },
    {
        name: "Acorazado",
        source: "BattleShip_Lab_Assets/Acorazado_4_Cas.png",
        spaces: 4,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 4
    },
    {
        name: "Crucero",
        source: "BattleShip_Lab_Assets/Crucero_3_Cas.png",
        spaces: 3,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 3
    },
    {
        name: "Submarino",
        source: "BattleShip_Lab_Assets/Submarino_3_Cas.png",
        spaces: 3,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 2
    },
    {
        name: "Destructor",
        source: "BattleShip_Lab_Assets/Destructor_2_Cas.png",
        spaces: 2,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 1
    }
]
var shipsJugada = {
    username: "",
    ships: []
}


//AQUI COLOCAMOS EL PUERTO DEL SOCKET EN EL FRONT
const socket = io("http://localhost:3000");

/* MANEJO DE EVENTOS DEL SOCKET */

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (err) => {
    console.error(`Connection error: ${err.message}`);
});

socket.on('error', (error) => {
    if (error === "username in use") {
        mostrarMensaje('username in use', 'error');   
        let nombreUsuario = document.getElementById("Input_Nombre_Usuario");
        nombreUsuario.value = "";
        btnLogin.disabled = false;
    }
});

socket.on('game-found', (rival) => {    
   // GAME FOUND
   rivalUser = rival.oponnent;
   console.log("Rival encontrado:", rival);
   let EmpezarPartidaJS = document.createElement("script");
   EmpezarPartidaJS.src = "./Script_Folder/Game_Start_Functions.js";
   EmpezarPartidaJS.type = "text/javascript";
   EmpezarPartidaJS.async = true;
   EmpezarPartidaJS.setAttribute("id", "EmpezarPartidaJS");
   asideSection.style.display = "none";
   btnPlay.style.display = "none";
   let CargarJuegoJS = document.getElementById("CargarJuegoJS");
   let DragScripts = document.getElementById("DraggableBoatsJS");
   CargarJuegoJS.remove();
   DragScripts.remove();
   bodyDocumento.appendChild(EmpezarPartidaJS);
});

socket.on('turn', (userTurn) => {
    if (userTurn === username) {
        console.log("Es tu turno");
    } else console.log("Turno del jugador: ", userTurn);
});

/* LOGICA DE LOS BOTONES */

function getUsernameValue(nombreUsuario){
    btnLogin.style.display = "none";
    textoIngresarUsuario.style.display = "none";
    btnPlay.style.display = "block";
    userNameCard.innerHTML = nombreUsuario;
    userNameCard.style.display = "block";
    username = nombreUsuario;
    loggeado = true;
}

//Evento click en Ingresar
btnLogin.addEventListener("click", async () => {
    let nombreUsuario = document.getElementById("Input_Nombre_Usuario");
    let nombreUsuarioString = nombreUsuario.value;
    shipsJugada.username = nombreUsuarioString.trim();
    console.log(shipsJugada);
    try {
        let successfulLogin = false;
        successfulLogin = await new Promise((resolve) => {
            // Manda el username al servidor
            socket.emit('connect-user', shipsJugada.username);
            let onConfirm = (data) => {
                if (data === "OK") {
                    resolve(true);
                    console.log("Usuario loggeado:", shipsJugada.username);
                } else {
                    resolve(false);
                }
            };

            //cuando recibe respuest "confirm", hace onConfirm
            socket.once('confirm', onConfirm);
        });

        if (successfulLogin === true && !loggeado) {
            // Si el loggeo salio bien, cambia la interfaz con los barcos tablero, username, etc...
            getUsernameValue(shipsJugada.username);
            let VentanaJuego = document.getElementById("Ventana_Principal_Juego");
            let MenuHolder = document.getElementById("Menu_Holder");
            VentanaJuego.style.display = "flex";
            MenuHolder.style.display = "none";
            btnPlay.style.display = "block";
            let CargarJuegoJS = document.createElement("script");
            CargarJuegoJS.src = "./Script_Folder/User_Logged_Pre_Game.js";
            CargarJuegoJS.type = "text/javascript";
            CargarJuegoJS.async = true;
            CargarJuegoJS.setAttribute("id", "CargarJuegoJS");
            bodyDocumento.appendChild(CargarJuegoJS);
            btnLogin.disabled = true;
            loggeado = true;
            console.log("Usuario loggeado:", username);
        }
    } catch (error) {
        console.error("An error occurred during login:", error);
    }
});

//Evento click en Jugar
btnPlay.addEventListener("click", async () => {
    if (gameSeaching === false) {
        gameSeaching = true;
        let barcosRestantes = document.querySelectorAll(".Barco");
        if (barcosRestantes.length === 0){
            socket.emit('begin', shipsJugada);
            console.log("Jugada a enviar:", shipsJugada);
        } else mostrarMensaje('Aun tienes barcos por colocar', 'warning');
    } else (mostrarMensaje('Ya estas buscando partida', 'info'));
});

function mostrarMensaje(mensaje, icono) {
    Swal.fire({
      title: "Mensaje",
      text: mensaje,
      icon: "info", // Cambia 'info' por 'success', 'error', 'warning', o 'question'
      confirmButtonText: "Aceptar",
    });
}