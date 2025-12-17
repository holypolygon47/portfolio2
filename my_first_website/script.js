// Данные портфолио
const portfolioSlides = [
    {
        id: 1,
        image: 'images/pf_pics/семья_1 1.png',
        title: 'Название проекта 1',
        description: 'Полное описание проекта 1...'
    },
    {
        id: 2,
        image: 'images/pf_pics/натюрморт.png',
        title: 'Название проекта 2',
        description: 'Полное описание проекта 2...'
    },
    {
        id: 3,
        image: 'images/pf_pics/мокапобложка.png',
        title: 'Название проекта 3',
        description: 'Полное описание проекта 3...'
    }
];

let currentSlide = 1;
const totalSlides = 3;

function changeSlide(direction) {
    // Скрываем текущий слайд
    document.querySelector(`.slide[data-slide="${currentSlide}"]`).classList.add('opacity-0', 'hidden');
    document.querySelector(`.slide[data-slide="${currentSlide}"]`).classList.remove('opacity-100', 'block');
    
    // Вычисляем новый слайд
    currentSlide += direction;
    if (currentSlide > totalSlides) currentSlide = 1;
    if (currentSlide < 1) currentSlide = totalSlides;
    
    // Показываем новый слайд
    document.querySelector(`.slide[data-slide="${currentSlide}"]`).classList.remove('opacity-0', 'hidden');
    document.querySelector(`.slide[data-slide="${currentSlide}"]`).classList.add('opacity-100', 'block');
}

function openModal(preventToggle = false) {
    if (!preventToggle) {
        event?.preventDefault();
        const modal = document.getElementById('portfolioModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    event.preventDefault();
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Получаем данные текущего слайда
    const currentSlideElement = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    const imageSrc = currentSlideElement.querySelector('img').src;
    const title = currentSlideElement.querySelector('p').textContent;
    
    // Заполняем модальное окно
    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <div class="flex h-full items-center">
            <!-- Левая часть: изображение с отступом вправо -->
            <div class="w-1/2 pr-8 flex justify-end">
                <div class="w-[90%] max-w-[450px]">
                    <img src="${imageSrc}" alt="${title}" 
                        class="w-full h-auto object-contain max-h-[450px]">
                </div>
            </div>
            
            <!-- Правая часть: текст -->
            <div class="w-1/2 pl-8">
                <div class="max-w-[85%]"> <!-- Ограничиваем ширину текстового блока -->
                    <h2 class="text-4xl mb-6 font-monocraft text-custom-gray">${title}</h2>
                    <p class="text-l text-custom-gray font-mono">
                        ${getProjectDescription(currentSlide)}
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Функция с описаниями проектов
function getProjectDescription(slideNumber) {
    const descriptions = {
        1: 'Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки дальнейших направлений развития. Разнообразный и богатый опыт новая модель организационной деятельности позволяет выполнять важные задания по разработке позиций, занимаемых участниками.',
        2: 'Таким образом реализация намеченных плановых заданий позволяет выполнять важные задания по разработке соответствующий условий активизации.Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности способствует подготовки и реализации новых предложений',
        3: 'Не следует, однако забывать, что консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании модели развитияРазнообразный и богатый опыт консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании форм развития.'
    };
    return descriptions[slideNumber] || 'Описание проекта будет добавлено позже.';
}

function closeModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function changeSlideInModal(direction) {
    event.stopPropagation(); // Чтобы не закрывало модалку
    
    // Сначала меняем слайд в основном слайдере
    changeSlide(direction);
    
    // Затем обновляем контент модального окна
    openModal(true);
}
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Собираем данные в объект
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        project: this.querySelector('input[name="project"]').value,
        message: this.querySelector('textarea[name="message"]').value
    };
    
    // Отправка как JSON
    try {
        const response = await fetch('https://formspree.io/f/xeoyywna', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Сообщение отправлено!');
            this.reset();
        } else {
            const error = await response.json();
            alert('Ошибка: ' + (error.error || 'Неизвестная ошибка'));
        }
    } catch (error) {
        alert('Ошибка сети');
    }
});
// Открытие лайтбокса при клике на фото портфолио
document.querySelectorAll('.portfolio-slider img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
    });
});

// Закрытие
function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.getElementById('lightbox').classList.remove('flex');
}

// Закрытие по клику на фон
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});
