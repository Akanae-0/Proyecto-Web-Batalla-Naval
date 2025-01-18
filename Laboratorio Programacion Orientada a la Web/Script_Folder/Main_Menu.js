// ELIMINAR


function login(username, password) {
    // Dummy user data for demonstration purposes
    const userData = {
        username: 'user123',
        password: 'password123'
    };

    if (username === userData.username && password === userData.password) {
        //console.log('Login successful!');
        return true;
    } else {
        //console.log('Invalid username or password.');
        return false;
    }
}

// Example usage
login('user123', 'password123'); // Should log 'Login successful!'
login('user123', 'wrongpassword'); // Should log 'Invalid username or password.'


"Casilla_B,8_TABLERO_JUGADOR"
const regex = /^Casilla_[A-J],[0-9]+_TABLERO_[A-Z]+$/;

// Example usage
const testString1 = "Casilla_B,8_TABLERO_JUGADOR";
const testString2 = "Casilla_J,5_TABLERO_JUGADOR";
const testString3 = "Casilla_K,8_TABLERO_JUGADOR"; // Invalid
const testString4 = "Casilla_A,3_TABLERO_ENEMIGO"; // Valid

//console.log(regex.test(testString1)); // Should log true
//console.log(regex.test(testString2)); // Should log true
//console.log(regex.test(testString3)); // Should log false
//console.log(regex.test(testString4)); // Should log true


function extractValues(str) {
    const regex = /^Casilla_([A-J]),([0-9])_TABLERO_[A-Z]+$/;
    const match = str.match(regex);
    if (match) {
        const letter = match[1];
        const number = match[2];
        return { letter, number };
    } else {
        return null;
    }
}

// Example usage
const values1 = extractValues("Casilla_B,8_TABLERO_JUGADOR");
const values2 = extractValues("Casilla_J,5_TABLERO_JUGADOR");
const values3 = extractValues("Casilla_K,8_TABLERO_JUGADOR"); // Invalid
const values4 = extractValues("Casilla_A,3_TABLERO_ENEMIGO"); // Valid

//console.log(values1); // Should log { letter: 'B', number: '8' }
//console.log(values2); // Should log { letter: 'J', number: '5' }
//console.log(values3); // Should log null
//console.log(values4); // Should log { letter: 'A', number: '3' }