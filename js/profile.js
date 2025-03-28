document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы
    const editProfileBtn = document.getElementById('editProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const profileForm = document.getElementById('profileForm');
    const viewMode = document.getElementById('viewMode');
    const logoutBtn = document.getElementById('logoutBtn');

    // Поля формы
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Элементы для отображения данных
    const fullNameValue = document.getElementById('fullNameValue');
    const emailValue = document.getElementById('emailValue');
    const phoneValue = document.getElementById('phoneValue');

    // Переключение режима редактирования
    editProfileBtn.addEventListener('click', () => {
        viewMode.style.display = 'none';
        profileForm.style.display = 'block';
        
        // Заполняем форму текущими данными
        fullNameInput.value = fullNameValue.textContent;
        emailInput.value = emailValue.textContent;
        phoneInput.value = phoneValue.textContent;
    });

    // Отмена редактирования
    cancelEditBtn.addEventListener('click', () => {
        viewMode.style.display = 'block';
        profileForm.style.display = 'none';
    });

    // Обработка отправки формы
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            // Здесь будет отправка данных на сервер
            // await updateProfile({
            //     fullName: fullNameInput.value,
            //     email: emailInput.value,
            //     phone: phoneInput.value
            // });

            // Обновляем отображаемые данные
            fullNameValue.textContent = fullNameInput.value;
            emailValue.textContent = emailInput.value;
            phoneValue.textContent = phoneInput.value;

            // Возвращаемся к режиму просмотра
            viewMode.style.display = 'block';
            profileForm.style.display = 'none';

            // Показываем уведомление об успешном обновлении
            showNotification('Профиль успешно обновлен', 'success');
        } catch (error) {
            showNotification('Ошибка при обновлении профиля', 'error');
        }
    });

    // Обработка выхода
    logoutBtn.addEventListener('click', () => {
        // Здесь будет логика выхода
        window.location.href = 'auth.html';
    });

    // Функция для показа уведомлений
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Добавляем стили
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem';
        notification.style.borderRadius = '4px';
        notification.style.color = '#fff';
        notification.style.zIndex = '1000';

        if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
        }

        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Маска для телефона
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = value.substring(1);
            }
            const matches = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !matches[2] ? `+7 (${matches[1]}` 
                : !matches[3] ? `+7 (${matches[1]}) ${matches[2]}`
                : !matches[4] ? `+7 (${matches[1]}) ${matches[2]}-${matches[3]}`
                : `+7 (${matches[1]}) ${matches[2]}-${matches[3]}-${matches[4]}`;
        }
    });
}); 