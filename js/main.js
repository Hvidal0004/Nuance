// Funcionalidad principal del sitio
document.addEventListener('DOMContentLoaded', function() {
  // Menú móvil (a implementar)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Acordeón general
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    if (header) {
      header.addEventListener('click', function() {
        item.classList.toggle('active');
      });
    }
  });
  
  // Carrito de compra
  setupCart();
  
  // Newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (emailInput && emailInput.value) {
        // Aquí iría la lógica para enviar el email al servidor
        alert('¡Gracias por suscribirte a nuestro newsletter!');
        emailInput.value = '';
      }
    });
  }
});

// Funciones del carrito
function setupCart() {
  // Inicializar carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem('nudeProjectCart')) || [];
  
  // Actualizar contador del carrito
  updateCartCount(cart);
  
  // Botones de añadir al carrito
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productContainer = this.closest('.product-info') || this.closest('.product-card');
      
      if (productContainer) {
        // Obtener información del producto
        const productId = productContainer.dataset.productId || '1';
        const productTitle = productContainer.querySelector('.product-title')?.textContent || 'Producto';
        const productPrice = productContainer.querySelector('.product-price')?.textContent || '€0.00';
        const productImg = document.querySelector('.product-main-img')?.src || '/placeholder.svg';
        
        // Obtener variantes si están disponibles
        const selectedColor = productContainer.querySelector('.color-option.active')?.title || 'Negro';
        const selectedSize = productContainer.querySelector('.size-option.active')?.textContent || 'M';
        const quantity = parseInt(productContainer.querySelector('.quantity-input')?.value || 1);
        
        // Crear objeto de producto
        const product = {
          id: productId,
          title: productTitle,
          price: productPrice,
          img: productImg,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity
        };
        
        // Añadir al carrito
        addToCart(product);
        
        // Mostrar mensaje
        alert('¡Producto añadido al carrito!');
      }
    });
  });
}

function addToCart(product) {
  // Obtener carrito actual
  let cart = JSON.parse(localStorage.getItem('nudeProjectCart')) || [];
  
  // Comprobar si el producto ya está en el carrito
  const existingProductIndex = cart.findIndex(item => 
    item.id === product.id && 
    item.color === product.color && 
    item.size === product.size
  );
  
  if (existingProductIndex > -1) {
    // Actualizar cantidad si ya existe
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    // Añadir nuevo producto
    cart.push(product);
  }
  
  // Guardar carrito en localStorage
  localStorage.setItem('nudeProjectCart', JSON.stringify(cart));
  
  // Actualizar contador
  updateCartCount(cart);
}

function updateCartCount(cart) {
  const cartCount = document.querySelector('.cart-count');
  
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
      cartCount.classList.add('active');
    } else {
      cartCount.classList.remove('active');
    }
  }
}

function removeFromCart(index) {
  // Obtener carrito actual
  let cart = JSON.parse(localStorage.getItem('nudeProjectCart')) || [];
  
  // Eliminar producto
  if (index > -1 && index < cart.length) {
    cart.splice(index, 1);
    
    // Guardar carrito actualizado
    localStorage.setItem('nudeProjectCart', JSON.stringify(cart));
    
    // Actualizar contador
    updateCartCount(cart);
    
    // Recargar página si estamos en la página del carrito
    if (window.location.pathname.includes('carrito.html')) {
      window.location.reload();
    }
  }
}

function updateCartItemQuantity(index, quantity) {
  // Obtener carrito actual
  let cart = JSON.parse(localStorage.getItem('nudeProjectCart')) || [];
  
  // Actualizar cantidad
  if (index > -1 && index < cart.length) {
    cart[index].quantity = quantity;
    
    // Guardar carrito actualizado
    localStorage.setItem('nudeProjectCart', JSON.stringify(cart));
    
    // Actualizar contador
    updateCartCount(cart);
    
    // Recargar página si estamos en la página del carrito
    if (window.location.pathname.includes('carrito.html')) {
      window.location.reload();
    }
  }
}

function clearCart() {
  // Limpiar carrito
  localStorage.removeItem('nudeProjectCart');
  
  // Actualizar contador
  updateCartCount([]);
  
  // Recargar página si estamos en la página del carrito
  if (window.location.pathname.includes('carrito.html')) {
    window.location.reload();
  }
}