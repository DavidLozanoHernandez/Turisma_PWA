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
      throw new Error(`Error en la respuesta del servidor: ${response.status}`);
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
    event.preventDefault(); // Evita el envío normal del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const credentials = { email, password };

    try {
      const response = await login(credentials);
      console.log('Inicio de sesión exitoso:', response);
      
      alert('Inicio de sesión exitoso');
    } catch (error) {
      alert('Error al intentar iniciar sesión. Verifica tus credenciales.');
    }
  });
});
