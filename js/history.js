document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    if (!localStorage.getItem('isAuthenticated')) {
        window.location.href = 'auth.html';
        return;
    }

    const historyContent = document.getElementById('historyContent');
    
    // Получение истории посещений из localStorage
    const visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '[]');

    if (visitHistory.length === 0) {
        // Если история пуста, показываем сообщение
        historyContent.innerHTML = '<div class="no-history">Здесь пока ничего нет</div>';
        return;
    }

    // Отображение истории посещений
    const historyHTML = visitHistory.map(visit => `
        <div class="history-item">
            <h3>${visit.place}</h3>
            <p>${visit.description}</p>
            <p class="date">Дата посещения: ${new Date(visit.date).toLocaleDateString()}</p>
        </div>
    `).join('');

    historyContent.innerHTML = historyHTML;
}); 