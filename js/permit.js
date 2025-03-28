document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    if (!localStorage.getItem('isAuthenticated')) {
        window.location.href = 'auth.html';
        return;
    }

    const permitForm = document.getElementById('permitForm');
    const visitDateInput = document.getElementById('visitDate');

    // Установка минимальной даты (сегодня)
    const today = new Date().toISOString().split('T')[0];
    visitDateInput.min = today;

    // Обработка отправки формы
    permitForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Получение данных формы
        const formData = new FormData(permitForm);
        const permitData = {
            location: formData.get('location'),
            visitDate: formData.get('visitDate'),
            groupSize: formData.get('groupSize'),
            purpose: formData.get('purpose'),
            equipment: formData.get('equipment'),
            experience: formData.get('experience'),
            documents: formData.getAll('documents'),
            status: 'pending',
            dateSubmitted: new Date().toISOString()
        };

        // Получение существующих заявок
        const existingPermits = JSON.parse(localStorage.getItem('permits') || '[]');
        
        // Добавление новой заявки
        existingPermits.push(permitData);
        
        // Сохранение обновленного списка заявок
        localStorage.setItem('permits', JSON.stringify(existingPermits));

        // Показ уведомления об успешной отправке
        alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        
        // Очистка формы
        permitForm.reset();
    });

    // Валидация размера группы
    const groupSizeInput = document.getElementById('groupSize');
    groupSizeInput.addEventListener('input', function() {
        if (this.value < 1) this.value = 1;
        if (this.value > 10) this.value = 10;
    });
}); 