// JavaScript para el carrusel de influencers
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

// Función para mostrar la diapositiva siguiente
function showNextSlide() {
    carouselItems[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % carouselItems.length;
    carouselItems[currentSlide].classList.add('active');
}

// Función para mostrar la diapositiva anterior
function showPrevSlide() {
    carouselItems[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentSlide].classList.add('active');
}

// Eventos para los botones de control
prevBtn.addEventListener('click', showPrevSlide);
nextBtn.addEventListener('click', showNextSlide);
