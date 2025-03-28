document.addEventListener('DOMContentLoaded', function() {
    // Данные о достопримечательностях
    const attractions = [
        {
            id: 1,
            name: 'Пешеходный мост',
            city: 'Оренбург',
            type: 'Архитектура',
            description: 'Символ города, соединяющий Европу и Азию. Знаменитый мост через реку Урал является одним из символов города и популярным местом для прогулок и фотографий.',
            image: 'images/attractions/orenburg-pedestrian.jpg'
        },
        {
            id: 2,
            name: 'Драматический театр',
            city: 'Оренбург',
            type: 'Культура',
            description: 'Один из старейших театров России. Здание театра является архитектурным памятником и культурным центром города.',
            image: 'images/attractions/orenburg-drama.jpg'
        },
        {
            id: 3,
            name: 'Краеведческий музей',
            city: 'Оренбург',
            type: 'Музей',
            description: 'Крупнейший музей области, где представлены уникальные экспонаты, рассказывающие об истории и культуре Оренбургского края.',
            image: 'images/attractions/orenburg-museum.jpg'
        },
        {
            id: 4,
            name: 'Орская крепость',
            city: 'Орск',
            type: 'Архитектура',
            description: 'Исторический центр города, основанный в XVIII веке. Крепость является важным историческим памятником и свидетелем основания города.',
            image: 'images/attractions/orsk-fortress.jpg'
        },
        {
            id: 5,
            name: 'Драматический театр',
            city: 'Орск',
            type: 'Культура',
            description: 'Культурный центр города Орска, где проходят театральные постановки и культурные мероприятия.',
            image: 'images/attractions/orsk-theater.jpg'
        },
        {
            id: 6,
            name: 'Краеведческий музей',
            city: 'Орск',
            type: 'Музей',
            description: 'Музей истории города Орска, где собраны экспонаты, рассказывающие о развитии города и региона.',
            image: 'images/attractions/orsk-museum.jpg'
        },
        {
            id: 7,
            name: 'Парк культуры и отдыха',
            city: 'Новотроицк',
            type: 'Парк',
            description: 'Центральный парк города Новотроицка, любимое место отдыха горожан с аттракционами и зелеными зонами.',
            image: 'images/attractions/novotroitsk-park.jpg'
        },
        {
            id: 8,
            name: 'Дворец культуры металлургов',
            city: 'Новотроицк',
            type: 'Культура',
            description: 'Культурный центр города, где проходят концерты, выставки и другие культурные мероприятия.',
            image: 'images/attractions/novotroitsk-palace.jpg'
        },
        {
            id: 9,
            name: 'Краеведческий музей',
            city: 'Новотроицк',
            type: 'Музей',
            description: 'Музей истории города Новотроицка, рассказывающий о становлении металлургической промышленности и развитии города.',
            image: 'images/attractions/novotroitsk-museum.jpg'
        },
        {
            id: 10,
            name: 'Озеро Гайское',
            city: 'Гай',
            type: 'Природа',
            description: 'Искусственное озеро в центре города Гай, популярное место отдыха горожан.',
            image: 'images/attractions/gai-lake.jpg'
        },
        {
            id: 11,
            name: 'Парк культуры и отдыха',
            city: 'Гай',
            type: 'Парк',
            description: 'Центральный парк города Гай с аттракционами и зонами отдыха.',
            image: 'images/attractions/gai-park.jpg'
        },
        {
            id: 12,
            name: 'Краеведческий музей',
            city: 'Гай',
            type: 'Музей',
            description: 'Музей истории города Гай, рассказывающий о развитии горнодобывающей промышленности и истории города.',
            image: 'images/attractions/gai-museum.jpg'
        }
    ];

    const grid = document.getElementById('attractionsGrid');
    const searchInput = document.getElementById('searchInput');
    const cityFilter = document.getElementById('cityFilter');
    const typeFilter = document.getElementById('typeFilter');
    const noResults = document.getElementById('noResults');

    // Функция создания карточки достопримечательности
    function createAttractionCard(attraction) {
        return `
            <div class="attraction-card" data-city="${attraction.city}" data-type="${attraction.type}">
                <div class="attraction-image">
                    <img src="${attraction.image}" alt="${attraction.name}">
                    <div class="attraction-overlay">
                        <span class="city-tag">${attraction.city}</span>
                        <span class="type-tag">${attraction.type}</span>
                    </div>

                </div>
                <div class="attraction-info">
                    <h3>${attraction.name}</h3>
                    <p>${attraction.description}</p>
                </div>
            </div>
        `;
    }

    // Функция фильтрации достопримечательностей
    function filterAttractions() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCity = cityFilter.value;
        const selectedType = typeFilter.value;
        let hasResults = false;

        grid.innerHTML = '';

        attractions.forEach(attraction => {
            if ((selectedCity === '' || attraction.city === selectedCity) &&
                (selectedType === '' || attraction.type === selectedType) &&
                (attraction.name.toLowerCase().includes(searchTerm) || 
                 attraction.description.toLowerCase().includes(searchTerm))) {
                grid.innerHTML += createAttractionCard(attraction);
                hasResults = true;
            }
        });

        // Показываем сообщение, если нет результатов
        if (hasResults) {
            noResults.style.display = 'none';
        } else {
            noResults.style.display = 'block';
        }

        // Плавная прокрутка к фильтрам при изменении
        document.querySelector('.filters').scrollIntoView({ behavior: 'smooth' });
    }

    // Добавляем обработчики событий
    searchInput.addEventListener('input', filterAttractions);
    cityFilter.addEventListener('change', filterAttractions);
    typeFilter.addEventListener('change', filterAttractions);

    // Инициализация страницы
    filterAttractions();

    // Добавляем анимации при наведении
    grid.addEventListener('mouseover', function(e) {
        const card = e.target.closest('.attraction-card');
        if (card) {
            card.classList.add('hovered');
        }
    });

    grid.addEventListener('mouseout', function(e) {
        const card = e.target.closest('.attraction-card');
        if (card) {
            card.classList.remove('hovered');
        }
    });
}); 