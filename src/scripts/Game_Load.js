// REFERENCIAS A ELEMENTOS DEL DOM
const bodyDocumento = document.body; 
const gameSection = document.getElementById("Seccion_Tableros");  
const asideSection = document.getElementById("Barcos_Lado");  
const gameButonSection = document.getElementById("Botones_In_Game"); 
const btnLogin = document.getElementById("Boton_Ingresar");
const textoIngresarUsuario = document.getElementById("Input_Nombre_Usuario");
const btnPlay = document.getElementById("Boton_Jugar");
const userNameCard = document.getElementById("Nombre_Usuario");
let botonDisparo; 
let casillaSeleccionadaDisparo; 
let casillasRivales;


// VARIABLES GLOBALES
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
        source: "../../assets/Portaaviones_5_Cas.png",
        spaces: 5,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 5
    },
    {
        name: "Acorazado",
        source: "../../assets/Acorazado_4_Cas.png",
        spaces: 4,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 4
    },
    {
        name: "Crucero",
        source: "../../assets/Crucero_3_Cas.png",
        spaces: 3,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 3
    },
    {
        name: "Submarino",
        source: "../../assets/Submarino_3_Cas.png",
        spaces: 3,
        orientation: "horizontal",
        casillaOcupada: 'Z0',
        idBarco: 2
    },
    {
        name: "Destructor",
        source: "../../assets/Destructor_2_Cas.png",
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
   EmpezarPartidaJS.src = "/src/scripts/Game_Start_Functions.js";
   EmpezarPartidaJS.type = "module";
   EmpezarPartidaJS.async = true;
   EmpezarPartidaJS.setAttribute("id", "EmpezarPartidaJS");
   asideSection.style.display = "none";
   btnPlay.style.display = "none";
   let CargarJuegoJS = document.getElementById("CargarJuegoJS");
   let DragScripts = document.getElementById("DraggableBoatsJS");
   if (CargarJuegoJS) CargarJuegoJS.remove();
   if (DragScripts) DragScripts.remove();
   bodyDocumento.appendChild(EmpezarPartidaJS);
});

socket.on('turn', (userTurn) => {
    turnoJugador = userTurn.turn == username;
    habilitarMain();
});

/* LOGICA DE LOS BOTONES */

function habilitarMain(){
    if (turnoJugador == true){
        // Habilitamos el boton de disparar y las casillas rivales
        botonDisparo.disabled = false;
        casillaSeleccionadaDisparo.disabled = false;
        casillasRivales.forEach(casilla => { 
            casilla.disabled = false; 
        });
    } else {
        // Deshabilitamos el boton de disparar y las casillas rivales
        botonDisparo.disabled = true;
        casillaSeleccionadaDisparo.disabled = true;
        casillasRivales.forEach(casilla => { 
            casilla.disabled = true; 
        });
        casillaSeleccionadaDisparo.textContent = '';
    }
}

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
            CargarJuegoJS.src = "/src/scripts/User_Logged_Pre_Game.js";
            CargarJuegoJS.type = "module";
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
    } else ((mostrarMensaje('Ya estas buscando partida', 'info')));
});

// Funcion para inicializar botonDisparo cuando se agregue al DOM
const checkElement = setInterval(() => {
    botonDisparo = document.getElementById("Boton_Disparo");
    if (botonDisparo) {
        clearInterval(checkElement); // Detener el intervalo una vez que se encuentra el elemento
        casillaSeleccionadaDisparo = document.getElementById("Casilla_Seleccionada_Show"); 
        casillasRivales = document.querySelectorAll('[id*="TABLERO#1"]')
        
        botonDisparo.addEventListener('click', () => {
            if (turnoJugador == false){
                alert('Es turno del rival');
            } else {
                console.log("valor:", casillaSeleccionadaDisparo.textContent);
                
                if (casillaSeleccionadaDisparo.textContent === "") {
                    console.log("vacio:", casillaSeleccionadaDisparo.textContent)
                    //alert('Primero seleccione una casilla rival');
                } else {
                    console.log("no vacio:", casillaSeleccionadaDisparo.textContent)
                    // logica del evento "play"
                    // alert('Disparo enviado');

                }
                
            }
            
        });

        casillasRivales.forEach(casilla => {
            casilla.addEventListener("click", (e) => {
                e.stopPropagation();
                console.log("mi turno =", turnoJugador);
                if (turnoJugador == false){
                    alert('Es turno del rival');
                } else {
                    let fila = filaToLetra.indexOf(casilla.id[8]);
                    let columna = parseInt(casilla.id[10]);
                    console.log(`${filaToLetra[fila]}${columna}`);
                    casillaSeleccionadaDisparo.textContent = `${filaToLetra[fila]}${columna}`;
                    console.log(casillaSeleccionadaDisparo.textContent)

                }
            });
        });
    }
}, 100); // Verificar cada 100 milisegundos

// Reestablece el estado inicial de la pagina
function restartAfterGame(){
    username = "";
    loggeado = false;
    turnoJugador = false;
    rivalUser = "";
    gameSeaching = false;
    shipsJugada.username = "";
    shipsJugada.ships = [];
    VentanaJuego.style.display = "none";
    MenuHolder.style.display = "block";
    btnPlay.style.display = "none";
    btnLogin.disabled = false;
    loggeado = false;
    asideSection.innerHTML = "";
    gameButonSection.innerHTML = "";
    gameSection.innerHTML = "";
    let nombreUsuario = document.getElementById("Input_Nombre_Usuario");
    nombreUsuario.value = "";
}

export function mostrarMensaje(mensaje, icono) {
    Swal.fire({
      title: "Mensaje",
      text: mensaje,
      icon: "info", // Cambia 'info' por 'success', 'error', 'warning', o 'question'
      confirmButtonText: "Aceptar",
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("El DOM ha sido completamente cargado y procesado");
});

export { filaToLetra };
export { barcosJuego, shipsJugada}; 
export { bodyDocumento, asideSection }; 
export { gameSection, gameButonSection, rows, columns }; 
export { botonDisparo, turnoJugador, rivalUser }; 