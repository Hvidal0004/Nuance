// Funcionalidad específica de la página de producto
document.addEventListener('DOMContentLoaded', function() {
  // Thumbnails
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImg = document.querySelector('.product-main-img');
  
  if (thumbnails.length > 0 && mainImg) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Quitar clase active de todos los thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        // Añadir clase active al thumbnail clickeado
        this.classList.add('active');
        // Cambiar imagen principal
        mainImg.src = this.src.replace('200x200', '800x1000');
      });
    });
  }
  
  // Opciones de color
  const colorOptions = document.querySelectorAll('.color-option');
  const colorTitle = document.querySelector('.color-title');
  
  if (colorOptions.length > 0 && colorTitle) {
    colorOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Quitar clase active de todas las opciones
        colorOptions.forEach(o => o.classList.remove('active'));
        // Añadir clase active a la opción clickeada
        this.classList.add('active');
        
        // Actualizar texto del color seleccionado
        let colorName = 'Negro';
        if (this.classList.contains('color-white')) colorName = 'Blanco';
        if (this.classList.contains('color-gray')) colorName = 'Gris';
        if (this.classList.contains('color-beige')) colorName = 'Beige';
        
        colorTitle.textContent = `Color: ${colorName}`;
      });
    });
  }
  
  // Opciones de talla
  const sizeOptions = document.querySelectorAll('.size-option:not(.disabled)');
  const sizeTitle = document.querySelector('.size-title span');
  
  if (sizeOptions.length > 0 && sizeTitle) {
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Quitar clase active de todas las opciones
        sizeOptions.forEach(o => o.classList.remove('active'));
        // Añadir clase active a la opción clickeada
        this.classList.add('active');
        
        // Actualizar texto de la talla seleccionada
        sizeTitle.textContent = `Talla: ${this.textContent}`;
      });
    });
  }
  
  // Selector de cantidad
  const quantityInput = document.querySelector('.quantity-input');
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  
  if (quantityInput && quantityBtns.length > 0) {
    quantityBtns.forEach((btn, index) => {
      btn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        
        if (index === 0 && currentValue > 1) {
          // Botón de restar
          quantityInput.value = currentValue - 1;
        } else if (index === 1) {
          // Botón de sumar
          quantityInput.value = currentValue + 1;
        }
      });
    });
  }
});