const socket = io("http://localhost:3000");

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (err) => {
    console.error(`Connection error: ${err.message}`);
});

const bodyDocumento = document.body;
const gameSection = document.getElementById("Seccion_Tableros");
const asideSection = document.getElementById("Barcos_Lado");
const gameButonSection = document.getElementById("Botones_In_Game");
const btnLogin = document.getElementById("Boton_Ingresar");
const textoIngresarUsuario = document.getElementById("Input_Nombre_Usuario");
const btnPlay = document.getElementById("Boton_Jugar");
const userNameCard = document.getElementById("Nombre_Usuario");
const arrayBarcoToNumero = ["Portaaviones", "Acorazado", "Crucero", "Submarino", "Destructor"]

var loggeado = false;
// Create a grid, for example, 5x5
const rows = 11;
const columns = 11;
let gameBoardPlayerTitle = "";
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

function getUsernameValue(nombreUsuario){
    btnLogin.style.display = "none";
    textoIngresarUsuario.style.display = "none";
    btnPlay.style.display = "block";
    userNameCard.innerHTML = nombreUsuario;
    userNameCard.style.display = "block";
    loggeado = true;
}

socket.on('error', (error) => {
    if (error === "username in use") {
        alert("username in use");
        let nombreUsuario = document.getElementById("Input_Nombre_Usuario");
        nombreUsuario.value = "";
    }
});

//Evento Login
btnLogin.addEventListener("click", async () => {
    let nombreUsuario = document.getElementById("Input_Nombre_Usuario");
    let nombreUsuarioString = nombreUsuario.value;
    try {
        let successfulLogin = false;
        successfulLogin = await new Promise((resolve) => {
            socket.emit('connect-user', nombreUsuarioString.trim());

            let onConfirm = (data) => {
                if (data === "OK") {
                    resolve(true);
                } else {
                    resolve(false);
                }
            };

            socket.once('confirm', onConfirm);
        });

        if (successfulLogin === true) {
            getUsernameValue(nombreUsuarioString);
            let VentanaJuego = document.getElementById("Ventana_Principal_Juego");
            let MenuHolder = document.getElementById("Menu_Holder");
            VentanaJuego.style.display = "flex";
            MenuHolder.style.display = "none";
            btnPlay.style.display = "block";
            let CargarJuegoJS = document.createElement("script");
            CargarJuegoJS.src = "Script_Folder/User_Logged_Pre_Game.js";
            CargarJuegoJS.type = "text/javascript";
            CargarJuegoJS.async = true;
            CargarJuegoJS.setAttribute("id", "CargarJuegoJS");
            bodyDocumento.appendChild(CargarJuegoJS);
        }
    } catch (error) {
        console.error("An error occurred during login:", error);
    }
});

//Evento Play
btnPlay.addEventListener("click", async () => {
    let barcosRestantes = document.querySelectorAll(".Barco");
    if (barcosRestantes.length === 0){
        //PlaceHolder
        socket.emit

        let EmpezarPartidaJS = document.createElement("script");
        EmpezarPartidaJS.src = "Script_Folder/Game_Start_Functions.js";
        EmpezarPartidaJS.type = "text/javascript";
        EmpezarPartidaJS.async = true;
        EmpezarPartidaJS.setAttribute("id", "EmpezarPartidaJS");
        bodyDocumento.appendChild(EmpezarPartidaJS);
        asideSection.style.display = "none";
        btnPlay.style.display = "none";
        let CargarJuegoJS = document.getElementById("CargarJuegoJS");
        let DragScripts = document.getElementById("DraggableBoatsJS");
        CargarJuegoJS.remove();
        DragScripts.remove();
    }
});