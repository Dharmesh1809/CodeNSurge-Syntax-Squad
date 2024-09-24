document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'e0df20e0e89849ebbab01b32758805d5'; // Replace with your actual API key
    const mainNewsSection = document.getElementById('blockcontainer');
    const newsSearchInput = document.getElementById('news-search-input');
    const searchButton = document.getElementById('search-button');

    // Function to fetch news
    const fetchNews = async (query = 'tesla') => {
        const url = `https://newsapi.org/v2/top-headlines?category=politics&language=en&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            mainNewsSection.innerHTML = ''; // Clear existing content

            data.articles.forEach(article => {
                const articleElement = document.createElement('article');
                const imageSrc = article.urlToImage || 'https://via.placeholder.com/400x200'; // Default image if no URL provided

                articleElement.innerHTML = `
                    <div class="blog-card" data-aos="fade-up-right">
                        <img src="${imageSrc}" alt="${article.title}">
                        <div class="blog-content">
                            <h2>${article.title}</h2>
                            <p>${article.description || 'No description available'}</p>
                            <a href="${article.url}" target="_blank">Read more</a>
                        </div>
                    </div>
                `;

                mainNewsSection.appendChild(articleElement);
            });
        } catch (error) {
            console.error('Error fetching news:', error);
            mainNewsSection.innerHTML = '<p>Error fetching news. Please try again later.</p>';
        }
    };

    // Fetch initial news when page loads
    fetchNews();

    // Add event listener to the search button
    searchButton.addEventListener('click', () => {
        const query = newsSearchInput.value;
        fetchNews(query);
    });

   
});
