const API_NEWS_URL = 'http://localhost:8080/api/news.php';

async function fetchNews() {
    const response = await fetch(API_NEWS_URL);
    const news = await response.json();
    const container = document.getElementById('news-container');

    news.forEach(item => {
        const article = document.createElement('div');
        article.className = 'news-article';
        article.innerHTML = `
            <img src="${item.image_url}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <p><small>Published at: ${item.published_at}</small></p>
        `;
        container.appendChild(article);
    });
}

document.addEventListener('DOMContentLoaded', fetchNews);