// Функционал каталога
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы фильтров
    const searchInput = document.getElementById('searchInput');
    const typeSelect = document.getElementById('typeSelect');
    const sortSelect = document.getElementById('sortSelect');
    const catalogGrid = document.querySelector('.catalog-grid');
    const cards = document.querySelectorAll('.catalog-card');

    // Функция фильтрации карточек
    function filterCards() {
        const searchText = searchInput.value.toLowerCase();
        const selectedType = typeSelect.value;
        const sortBy = sortSelect.value;

        // Создаем массив из карточек для сортировки
        let filteredCards = Array.from(cards).filter(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const type = card.getAttribute('data-type');
            const matchesSearch = title.includes(searchText);
            const matchesType = selectedType === 'all' || type === selectedType;
            return matchesSearch && matchesType;
        });

        // Сортировка
        filteredCards.sort((a, b) => {
            const titleA = a.querySelector('h3').textContent;
            const titleB = b.querySelector('h3').textContent;
            
            if (sortBy === 'asc') {
                return titleA.localeCompare(titleB);
            } else {
                return titleB.localeCompare(titleA);
            }
        });

        // Очищаем и заполняем контейнер отфильтрованными карточками
        catalogGrid.innerHTML = '';
        filteredCards.forEach(card => catalogGrid.appendChild(card));
    }

    // Добавляем обработчики событий
    searchInput.addEventListener('input', filterCards);
    typeSelect.addEventListener('change', filterCards);
    sortSelect.addEventListener('change', filterCards);
}); 