const backendBaseUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;

            makeRequest('POST', '/register', { username, password, email }, backendBaseUrl,
                handleRegistrationSuccess,
                handleRegistrationError
            );
        });
    } else {
        console.error('Element with ID "registerForm" not found.');
    }


    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            if (!usernameInput.value || !passwordInput.value) {
                console.error('Username and password are required.');
                alert('Username and password are required.');
                return;
            }

            const username = usernameInput.value;
            const password = passwordInput.value;

            makeRequest('POST', '/login', { username, password }, backendBaseUrl,
                handleLoginSuccess,
                handleLoginError
            );
        });
    } else {
        console.error('Element with ID "loginForm" not found.');
    }
});

function makeRequest(method, endpoint, data, backendBaseUrl, successCallback, errorCallback) {
    const url = backendBaseUrl + endpoint;
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = method === 'GET' ? undefined : JSON.stringify(data);

    fetch(url, {
        method: method,
        headers: headers,
        body: body,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => successCallback(data))
    .catch(error => {
        console.error('Error during fetch:', error);
        errorCallback({ error: 'Network error' });
    });
}


function handleRegistrationSuccess(response) {
    console.log('Registration successful:', response);
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
}

function handleRegistrationError(error) {
    console.error('Registration error:', error);
    alert('Registration failed. Please try again.');
}

function handleLoginSuccess(response) {
    console.log('Login successful:', response);
    window.location.href = 'index.html';
}

function handleLoginError(error) {
    console.error('Login error:', error);
    console.log('Response from server:', error.response);

    const errorMessageContainer = document.getElementById('loginErrorMessage');
    if (errorMessageContainer) {
        errorMessageContainer.textContent = error.message;
    }
}