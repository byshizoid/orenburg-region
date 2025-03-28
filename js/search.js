document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');
    const sortResults = document.getElementById('sortResults');
    let currentPage = 1;
    const resultsPerPage = 12;

    // Моковые данные для демонстрации
    const mockData = {
        settlements: [
            { id: 1, name: 'Оренбург', category: 'settlements', location: 'orenburg', rating: 4.8 },
            { id: 2, name: 'Орск', category: 'settlements', location: 'orsk', rating: 4.5 },
            { id: 3, name: 'Новотроицк', category: 'settlements', location: 'novotroitsk', rating: 4.2 }
        ],
        industries: [
            { id: 4, name: 'Орский нефтеперерабатывающий завод', category: 'industries', location: 'orsk', rating: 4.3 },
            { id: 5, name: 'Новотроицкий цементный завод', category: 'industries', location: 'novotroitsk', rating: 4.1 }
        ],
        attractions: [
            { id: 6, name: 'Национальный парк "Бузулукский бор"', category: 'attractions', location: 'orenburg', rating: 4.9 },
            { id: 7, name: 'Соль-Илецкое озеро', category: 'attractions', location: 'orenburg', rating: 4.7 }
        ]
    };

    // Функция для отображения результатов поиска
    function displayResults(results) {
        searchResults.innerHTML = '';
        
        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            
            // Определяем ссылку в зависимости от категории
            let link = '#';
            switch(result.category) {
                case 'settlements':
                    link = `settlement-details.html?id=${result.id}`;
                    break;
                case 'industries':
                    link = `industry-details.html?id=${result.id}`;
                    break;
                case 'attractions':
                    link = `attraction-details.html?id=${result.id}`;
                    break;
                case 'reserves':
                    link = `reserve-details.html?id=${result.id}`;
                    break;
            }

            resultCard.innerHTML = `
                <a href="${link}" class="result-link">
                    <div class="result-image">
                        <img src="images/${result.category}/${result.location}/${result.id}.jpg" alt="${result.name}">
                    </div>
                    <div class="result-info">
                        <h3>${result.name}</h3>
                        <p class="category">${getCategoryName(result.category)}</p>
                        <p class="location">${getLocationName(result.location)}</p>
                        <div class="rating">
                            <span class="stars">${'★'.repeat(Math.floor(result.rating))}${result.rating % 1 !== 0 ? '½' : ''}</span>
                            <span class="rating-value">${result.rating}</span>
                        </div>
                    </div>
                </a>
            `;
            searchResults.appendChild(resultCard);
        });
    }

    // Функция для получения названия категории
    function getCategoryName(category) {
        const categories = {
            settlements: 'Населенный пункт',
            industries: 'Производство',
            attractions: 'Достопримечательность',
            reserves: 'Заповедная зона'
        };
        return categories[category] || category;
    }

    // Функция для получения названия местоположения
    function getLocationName(location) {
        const locations = {
            orenburg: 'Оренбург',
            orsk: 'Орск',
            novotroitsk: 'Новотроицк'
        };
        return locations[location] || location;
    }

    // Функция для фильтрации результатов
    function filterResults(query, category, location) {
        let allResults = [];
        
        // Собираем все результаты из разных категорий
        Object.values(mockData).forEach(categoryData => {
            allResults = allResults.concat(categoryData);
        });

        // Применяем фильтры
        return allResults.filter(result => {
            const matchesQuery = result.name.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = !category || result.category === category;
            const matchesLocation = !location || result.location === location;
            
            return matchesQuery && matchesCategory && matchesLocation;
        });
    }

    // Обработчик отправки формы поиска
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('searchQuery').value;
        const category = document.getElementById('category').value;
        const location = document.getElementById('location').value;

        const results = filterResults(query, category, location);
        displayResults(results);
    });

    // Обработчик изменения сортировки
    sortResults.addEventListener('change', function() {
        const results = Array.from(searchResults.children);
        const sortBy = this.value;

        results.sort((a, b) => {
            const ratingA = parseFloat(a.querySelector('.rating-value').textContent);
            const ratingB = parseFloat(b.querySelector('.rating-value').textContent);

            switch(sortBy) {
                case 'rating':
                    return ratingB - ratingA;
                case 'popularity':
                    // Здесь можно добавить логику сортировки по популярности
                    return 0;
                default:
                    return 0;
            }
        });

        results.forEach(result => searchResults.appendChild(result));
    });

    // Инициализация страницы
    const initialResults = filterResults('', '', '');
    displayResults(initialResults);
}); 