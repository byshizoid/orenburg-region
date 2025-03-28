document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phone');

    // Функция для валидации пароля
    function validatePassword() {
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        if (passwordValue !== confirmPasswordValue) {
            confirmPassword.setCustomValidity('Пароли не совпадают');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    // Функция для валидации email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Функция для форматирования телефона
    function formatPhoneNumber(value) {
        // Удаляем все символы, кроме цифр
        const phoneNumber = value.replace(/\D/g, '');
        
        // Если номер начинается с 8, заменяем на 7
        const normalizedPhone = phoneNumber.startsWith('8') ? '7' + phoneNumber.slice(1) : phoneNumber;

        // Форматируем номер
        if (normalizedPhone.length > 0) {
            if (normalizedPhone.length <= 1) {
                return '+' + normalizedPhone;
            } else if (normalizedPhone.length <= 4) {
                return '+' + normalizedPhone.slice(0, 1) + ' (' + normalizedPhone.slice(1);
            } else if (normalizedPhone.length <= 7) {
                return '+' + normalizedPhone.slice(0, 1) + ' (' + normalizedPhone.slice(1, 4) + ') ' + normalizedPhone.slice(4);
            } else if (normalizedPhone.length <= 9) {
                return '+' + normalizedPhone.slice(0, 1) + ' (' + normalizedPhone.slice(1, 4) + ') ' + normalizedPhone.slice(4, 7) + '-' + normalizedPhone.slice(7);
            } else {
                return '+' + normalizedPhone.slice(0, 1) + ' (' + normalizedPhone.slice(1, 4) + ') ' + normalizedPhone.slice(4, 7) + '-' + normalizedPhone.slice(7, 9) + '-' + normalizedPhone.slice(9, 11);
            }
        }
        return '';
    }

    // Функция для валидации телефона
    function validatePhone(phone) {
        // Проверяем, что после удаления всех не-цифр остается 11 цифр
        const digits = phone.replace(/\D/g, '');
        return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));
    }

    // Обработчик ввода телефона
    phoneInput.addEventListener('input', function(e) {
        let formattedPhone = formatPhoneNumber(e.target.value);
        e.target.value = formattedPhone;
        
        if (!validatePhone(formattedPhone)) {
            phoneInput.setCustomValidity('Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX');
        } else {
            phoneInput.setCustomValidity('');
        }
    });

    // Обработчик изменения пароля
    password.addEventListener('change', validatePassword);
    confirmPassword.addEventListener('keyup', validatePassword);

    // Обработчик отправки формы
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = phoneInput.value;
        const passwordValue = password.value;
        const terms = document.getElementById('terms').checked;

        // Валидация всех полей
        if (!fullName || !email || !phone || !passwordValue || !terms) {
            alert('Пожалуйста, заполните все поля и примите условия использования');
            return;
        }

        if (!validateEmail(email)) {
            alert('Пожалуйста, введите корректный email');
            return;
        }

        if (!validatePhone(phone)) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }

        if (passwordValue !== confirmPassword.value) {
            alert('Пароли не совпадают');
            return;
        }

        // Здесь будет отправка данных на сервер
        // Временная имитация успешной регистрации
        const userData = {
            fullName,
            email,
            phone,
            password: passwordValue // В реальном приложении пароль должен быть захеширован
        };

        // Сохраняем данные в localStorage (временное решение)
        localStorage.setItem('userData', JSON.stringify(userData));

        // Перенаправляем на страницу профиля
        window.location.href = 'profile.html';
    });
}); 