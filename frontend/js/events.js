const API_EVENTS_URL = 'http://localhost:8080/api/events.php';

async function fetchEvents() {
    const response = await fetch(API_EVENTS_URL);
    const events = await response.json();
    const container = document.getElementById('cards-container');

    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'card-wrapper';
        card.innerHTML = `
            <div class="flip-card">
                <div class="flip-card-front">
                    <img src="${event.image_url}" alt="${event.title}">
                </div>
                <div class="flip-card-back">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', fetchEvents);