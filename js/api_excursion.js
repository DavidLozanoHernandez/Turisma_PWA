const BASE_URL = 'http://localhost:3000';

async function login() {
    const token = localStorage.getItem('token');  // Suponiendo que el token está almacenado bajo la clave 'token'
    
    if (!token) {
        console.error('No se encontró un token válido en el localStorage');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/excursions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Se agrega el token en el encabezado
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            shoWError(errorData);
            throw new Error(errorData);
        }

        const data = await response.json();
        return data;  // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await login();
        console.log('Datos obtenidos:', data);
        displayExcursions(data);  // Llamamos a la función para generar las tarjetas
    } catch (error) {
        console.error('Error al hacer login:', error);
    }
});

function displayExcursions(excursions) {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevas tarjetas

    excursions.forEach(excursion => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '80%';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = excursion.name;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = `Precio: $${excursion.price}`;

        const cardDate = document.createElement('p');
        cardDate.classList.add('card-text');
        cardText.textContent = `Fecha de salida: ${new Date(excursion.departureDate).toLocaleDateString()}`;

        const cardStatus = document.createElement('p');
        cardStatus.classList.add('card-text');
        cardStatus.textContent = `Estado: ${excursion.status}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        //cardBody.appendChild(cardDate);
        cardBody.appendChild(cardStatus);

        // Crear el carrusel
        const carousel = document.createElement('div');
        carousel.classList.add('carousel', 'carousel-dark', 'carousel-fade');
        carousel.setAttribute('data-bs-ride', 'carousel');  // Activar autoplay
        carousel.setAttribute('data-bs-interval', '4000');  // Intervalo en milisegundos (4 segundos)

        const carouselInner = document.createElement('div');
        carouselInner.classList.add('carousel-inner');

        // Agregar las imágenes al carrusel
        excursion.photos.forEach((photo, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active'); // La primera imagen será la activa por defecto
            }

            const img = document.createElement('img');
            img.src = photo.imageUrl;
            img.classList.add('d-block', 'w-100');
            img.alt = `Imagen de la excursión ${excursion.name}`;

            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        });

        // Append the inner carousel and controls to the main carousel
        carousel.appendChild(carouselInner);

        // Add carousel to the card
        card.appendChild(cardBody);
        card.appendChild(carousel);
        cardContainer.appendChild(card);

        // Inicializar el carrusel con bootstrap
        new bootstrap.Carousel(carousel, {
            interval: 4000, // Ajusta el intervalo si es necesario
            ride: 'carousel' // Habilitar autoplay
        });
    });
}
