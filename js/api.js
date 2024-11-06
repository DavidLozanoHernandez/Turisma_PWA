const BASE_URL = 'http://localhost:3000';

// Función para enviar credenciales de inicio de sesión
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
    return data; // Devuelve los datos del servidor, como un token de autenticación
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    throw error;
  }
}

// Manejo del evento de envío del formulario
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío normal del formulario

    // Captura los datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepara las credenciales en el formato esperado
    const credentials = { email, password };

    try {
      // Llama a la función login para enviar las credenciales
      const response = await login(credentials);
      console.log('Inicio de sesión exitoso:', response);
      
      alert('Inicio de sesión exitoso');
    } catch (error) {
      alert('Error al intentar iniciar sesión. Verifica tus credenciales.');
    }
  });
});
