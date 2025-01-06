import IniciarJuego from './Game_Load.js';

function login(username, password) {
    // Dummy user data for demonstration purposes
    const userData = {
        username: 'user123',
        password: 'password123'
    };

    if (username === userData.username && password === userData.password) {
        console.log('Login successful!');
        return true;
    } else {
        console.log('Invalid username or password.');
        return false;
    }
}

// Example usage
login('user123', 'password123'); // Should log 'Login successful!'
login('user123', 'wrongpassword'); // Should log 'Invalid username or password.'

IniciarJuego(); // Should log 'Iniciando juego' and create game board and ships 