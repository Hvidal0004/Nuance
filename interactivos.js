// JavaScript para el carrusel de influencers
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las tarjetas
    const cards = document.querySelectorAll('.influencer-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Índice de la tarjeta actual
    let currentCardIndex = 0;
    
    // Función para mostrar la siguiente tarjeta
    function showNextCard() {
        // Ocultar la tarjeta actual
        cards[currentCardIndex].classList.remove('active');
        
        // Avanzar al siguiente índice (cíclicamente)
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        
        // Mostrar la nueva tarjeta actual
        cards[currentCardIndex].classList.add('active');
    }
    
    // Función para mostrar la tarjeta anterior
    function showPrevCard() {
        // Ocultar la tarjeta actual
        cards[currentCardIndex].classList.remove('active');
        
        // Retroceder al índice anterior (cíclicamente)
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        
        // Mostrar la nueva tarjeta actual
        cards[currentCardIndex].classList.add('active');
    }
    
    // Asignar eventos a los botones
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', showPrevCard);
        nextBtn.addEventListener('click', showNextCard);
        console.log('Botones de control de tarjetas configurados correctamente');
    } else {
        console.error('No se encontraron los botones de control para las tarjetas');
    }
    
    // Opcional: cambio automático cada 5 segundos
    // const autoChange = setInterval(showNextCard, 5000);
});
