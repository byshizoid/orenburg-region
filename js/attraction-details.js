document.addEventListener('DOMContentLoaded', function() {
    // Получаем id достопримечательности из URL
    const urlParams = new URLSearchParams(window.location.search);
    const attractionId = parseInt(urlParams.get('id'));

    // Данные о достопримечательностях
    const attractions = [
        {
            id: 1,
            name: 'Пешеходный мост',
            city: 'Оренбург',
            type: 'Архитектура',
            description: 'Символ города, соединяющий Европу и Азию. Знаменитый мост через реку Урал является одним из символов города и популярным местом для прогулок и фотографий.',
            fullDescription: 'Пешеходный мост через реку Урал в Оренбурге является одним из самых узнаваемых символов города. Построенный в начале XXI века, он соединяет европейскую и азиатскую части города, символически представляя роль Оренбурга как связующего звена между двумя континентами. Мост является популярным местом для прогулок и фотосессий, особенно в вечернее время, когда включается художественная подсветка. С моста открывается живописный вид на реку Урал и городскую набережную.',
            images: [
                'images/attractions/orenburg-pedestrian.jpg',
                'images/settlements/orenburg-1.jpg',
                'images/settlements/orenburg-2.jpg'
            ],
            stats: [
                { icon: 'fa-calendar-alt', label: 'Год постройки', value: '2002' },
                { icon: 'fa-ruler-combined', label: 'Длина', value: '220 м' },
                { icon: 'fa-clock', label: 'Время работы', value: 'Круглосуточно' }
            ],
            features: [
                'Художественная подсветка в вечернее время',
                'Смотровые площадки',
                'Соединяет Европу и Азию',
                'Популярное место для фотосессий'
            ],
            location: {
                address: 'Набережная реки Урал',
                transport: 'Автобусы: 21, 33, 41; Остановка "Набережная"',
                parking: 'Бесплатная парковка рядом с мостом'
            }
        },
        // ... остальные достопримечательности ...
    ];

    // Находим достопримечательность по id
    const attraction = attractions.find(a => a.id === attractionId);

    if (attraction) {
        // Обновляем хлебные крошки и заголовок страницы
        document.getElementById('currentPage').textContent = attraction.name;
        document.title = `${attraction.name} - Оренбургская область`;

        // Устанавливаем основное изображение
        const mainImage = document.getElementById('mainImage');
        mainImage.src = attraction.images[0];
        mainImage.alt = attraction.name;

        // Добавляем миниатюры
        const galleryThumbs = document.getElementById('galleryThumbs');
        attraction.images.forEach((image, index) => {
            const thumb = document.createElement('img');
            thumb.src = image;
            thumb.alt = `${attraction.name} - изображение ${index + 1}`;
            thumb.className = index === 0 ? 'active' : '';
            thumb.onclick = () => {
                mainImage.src = image;
                document.querySelectorAll('.gallery-thumbs img').forEach(img => img.classList.remove('active'));
                thumb.classList.add('active');
            };
            galleryThumbs.appendChild(thumb);
        });

        // Заполняем основную информацию
        document.getElementById('attractionName').textContent = attraction.name;
        document.getElementById('attractionType').innerHTML = `
            <i class="fas fa-landmark"></i> ${attraction.type} 
            <span class="city"><i class="fas fa-map-marker-alt"></i> ${attraction.city}</span>
        `;

        // Добавляем статистику
        const statsHtml = attraction.stats.map(stat => `
            <div class="stat-item">
                <i class="fas ${stat.icon}"></i>
                <div>
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${stat.value}</div>
                </div>
            </div>
        `).join('');
        document.getElementById('attractionStats').innerHTML = statsHtml;

        // Добавляем описание
        document.getElementById('attractionDescription').innerHTML = `
            <p>${attraction.fullDescription}</p>
        `;

        // Добавляем особенности
        if (attraction.features && attraction.features.length > 0) {
            document.getElementById('attractionFeatures').innerHTML = `
                <ul>
                    ${attraction.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
            `;
        }

        // Добавляем информацию о местоположении
        if (attraction.location) {
            document.getElementById('attractionLocation').innerHTML = `
                <div class="location-info">
                    <p><i class="fas fa-map-marked-alt"></i> <strong>Адрес:</strong> ${attraction.location.address}</p>
                    ${attraction.location.transport ? `
                        <p><i class="fas fa-bus"></i> <strong>Транспорт:</strong> ${attraction.location.transport}</p>
                    ` : ''}
                    ${attraction.location.parking ? `
                        <p><i class="fas fa-parking"></i> <strong>Парковка:</strong> ${attraction.location.parking}</p>
                    ` : ''}
                </div>
            `;
        }

        // Добавляем похожие достопримечательности
        const nearbyAttractions = attractions
            .filter(a => a.city === attraction.city && a.id !== attraction.id)
            .slice(0, 3);

        if (nearbyAttractions.length > 0) {
            const nearbyHtml = nearbyAttractions.map(nearby => `
                <div class="attraction-card with-image">
                    <img src="${nearby.images[0]}" alt="${nearby.name}">
                    <div class="attraction-content">
                        <h3>${nearby.name}</h3>
                        <div class="attraction-type">${nearby.type}</div>
                        <p class="attraction-description">${nearby.description}</p>
                        <a href="attraction-details.html?id=${nearby.id}" class="btn-details">
                            Подробнее <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `).join('');
            document.getElementById('nearbyAttractions').innerHTML = nearbyHtml;
        } else {
            document.querySelector('.details-section:last-child').style.display = 'none';
        }
    } else {
        // Если достопримечательность не найдена
        document.getElementById('currentPage').textContent = 'Не найдено';
        document.querySelector('.details-content').innerHTML = `
            <div class="error-message">
                <h2>Достопримечательность не найдена</h2>
                <p>К сожалению, запрашиваемая достопримечательность не существует.</p>
                <a href="attractions.html" class="btn-back">
                    <i class="fas fa-arrow-left"></i>
                    Вернуться к списку достопримечательностей
                </a>
            </div>
        `;
    }
}); 