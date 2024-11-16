const BASE_URL = 'http://localhost:3000';

async function login(credentials) {
    console.log(credentials)
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.email,
        password: credentials.password
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      shoWError(errorData);
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const credentials = { email, password };

    try {
      const response = await login(credentials);
    } catch (error) {
      //alert('Error al intentar iniciar sesión. Verifica tus credenciales.');
    }
  });
});


async function signUp(credentials) {
  console.log(credentials);
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        lastname: credentials.lastname,
        phone: credentials.phone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message.join(', ') || 'Error desconocido';
      showError(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al registrarse:', error.message || error);
    throw error;
  }
}

function shoWError(message) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.textContent = message.message;
}

function showError(message) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.textContent = message;
}

document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.getElementById('signUpForm');

  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const credentials = { name, lastname, phone, email, password };

    try {
      const response = await signUp(credentials);
    } catch (error) {
      //alert('Error al intentar registrar, verefica tus datos');
    }
  });
});

async function sendVerification(credentials) {
  console.log('Enviando a la API:', credentials.value, credentials.method);

  try {
      const response = await fetch(`${BASE_URL}/auth/send-verification`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              contacto: credentials.value,
              method: credentials.method
          }),
      });

      console.log(response)

      if (!response.ok) {
          const errorData = await response.json();
          showError(errorData);
          throw new Error(errorData);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error al enviar el token:', error);
      throw error;
  }
}