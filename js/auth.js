document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const phoneInput = document.getElementById('phone');

    // Маска для телефона
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : !x[3] ? x[1] + x[2] : !x[4] ? x[1] + x[2] + x[3] : !x[5] ? x[1] + x[2] + x[3] + x[4] : x[1] + x[2] + x[3] + x[4] + x[5];
    });

    // Обработка отправки формы
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const phone = phoneInput.value;
        const password = document.getElementById('password').value;

        // Валидация телефона
        if (phone.length !== 11) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }

        // Здесь будет отправка данных на сервер
        // Временная имитация авторизации
        if (phone && password) {
            // Сохраняем данные в localStorage для демонстрации
            localStorage.setItem('userPhone', phone);
            localStorage.setItem('isAuthenticated', 'true');
            
            // Перенаправляем на страницу профиля
            window.location.href = 'profile.html';
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
}); 