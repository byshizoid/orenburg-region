document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const tourName = urlParams.get('tour');
    
    // Если название тура передано в URL, заполняем поле
    if (tourName) {
        document.getElementById('tourName').value = decodeURIComponent(tourName);
    }

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Данные бронирования:', data);
        
        // Показываем уведомление об успешной отправке
        alert('Спасибо! Ваша заявка на бронирование принята. Мы свяжемся с вами в ближайшее время.');
        
        // Очищаем форму
        bookingForm.reset();
    });
}); 