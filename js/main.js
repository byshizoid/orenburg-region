document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карт
    const mapPoints = [
        { id: 'map1', coordinates: [52.5, 52.0], title: 'Бузулукский бор' },
        { id: 'map2', coordinates: [51.7, 57.3], title: 'Шайтан-тау' },
        { id: 'map3', coordinates: [51.2, 56.5], title: 'Оренбургский заповедник' }
    ];

    mapPoints.forEach(point => {
        const map = new ymaps.Map(point.id, {
            center: point.coordinates,
            zoom: 12,
            controls: ['zoomControl']
        });

        const placemark = new ymaps.Placemark(point.coordinates, {
            balloonContent: point.title
        });

        map.geoObjects.add(placemark);
    });

    // Обработка формы поиска
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = this.querySelector('input').value;
            const category = this.querySelector('select').value;
            
            // Здесь будет логика поиска
            console.log('Поисковый запрос:', searchQuery);
            console.log('Категория:', category);
            
            // Перенаправление на страницу результатов поиска
            window.location.href = `search.html?q=${encodeURIComponent(searchQuery)}&category=${category}`;
        });
    }

    // Обработка кнопок "Подробнее" в карточках предложений
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.offer-card');
            const title = card.querySelector('h3').textContent;
            // Здесь будет логика открытия подробного описания
            console.log('Открыть подробное описание:', title);
        });
    });

    // Обработка кнопок "Забронировать"
    document.querySelectorAll('.btn-book').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.offer-card');
            const title = card.querySelector('h3').textContent;
            const agency = card.querySelector('.tour-agency p').textContent;
            
            // Проверка авторизации
            if (!localStorage.getItem('isAuthenticated')) {
                alert('Для бронирования необходимо войти в личный кабинет');
                window.location.href = 'auth.html';
                return;
            }
            
            // Здесь будет логика бронирования
            console.log('Бронирование:', title);
            console.log('Туристическая фирма:', agency);
        });
    });
}); 