// Funcionalidad específica de la página de checkout
document.addEventListener('DOMContentLoaded', function() {
  // Cargar resumen del carrito
  loadCheckoutSummary();
  
  // Formulario de checkout
  const checkoutForm = document.querySelector('.checkout-form');
  
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar formulario
      if (validateCheckoutForm()) {
        // Procesar pedido
        processOrder();
      }
    });
  }
  
  // Cambio de método de pago
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
  const paymentDetails = document.querySelectorAll('.payment-details');
  
  if (paymentMethods.length > 0 && paymentDetails.length > 0) {
    paymentMethods.forEach(method => {
      method.addEventListener('change', function() {
        // Ocultar todos los detalles
        paymentDetails.forEach(detail => {
          detail.style.display = 'none';
        });
        
        // Mostrar detalles del método seleccionado
        const selectedMethod = this.value;
        const selectedDetails = document.querySelector(`.payment-details[data-method="${selectedMethod}"]`);
        
        if (selectedDetails) {
          selectedDetails.style.display = 'block';
        }
      });
    });
  }
});

function loadCheckoutSummary() {
  const summaryContainer = document.querySelector('.checkout-summary');
  
  if (!summaryContainer) return;
  
  // Obtener carrito
  const cart = JSON.parse(localStorage.getItem('nudeProjectCart')) || [];
  
  if (cart.length === 0) {
    // Redirigir a la página del carrito si está vacío
    window.location.href = 'carrito.html';
    return;
  }
  
  // Calcular totales
  let subtotal = 0;
  let totalItems = 0;
  
  cart.forEach(item => {
    const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
    subtotal += price * item.quantity;
    totalItems += item.quantity;
  });
  
  // Calcular envío (gratis a partir de 100€)
  const shipping = subtotal >= 100 ? 0 : 4.95;
  const total = subtotal + shipping;
  
  // Actualizar resumen
  summaryContainer.innerHTML = `
    <h2 class="summary-title">Resumen del pedido</h2>
    
    <div class="summary-products">
      <p>${totalItems} producto${totalItems !== 1 ? 's' : ''}</p>
      
      ${cart.map(item => `
        <div class="summary-product">
          <div class="summary-product-info">
            <p class="summary-product-title">${item.title} x${item.quantity}</p>
            <p class="summary-product-variant">Color: ${item.color} / Talla: ${item.size}</p>
          </div>
          <p class="summary-product-price">€${(parseFloat(item.price.replace('€', '').replace(',', '.')) * item.quantity).toFixed(2)}</p>
        </div>
      `).join('')}
    </div>
    
    <div class="summary-totals">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>€${subtotal.toFixed(2)}</span>
      </div>
      
      <div class="summary-row">
        <span>Envío</span>
        <span>${shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}</span>
      </div>
      
      <div class="summary-row total">
        <span>Total</span>
        <span>€${total.toFixed(2)}</span>
      </div>
    </div>
  `;
}

function validateCheckoutForm() {
  // Obtener campos
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  const email = document.querySelector('#email');
  const phone = document.querySelector('#phone');
  const address = document.querySelector('#address');
  const city = document.querySelector('#city');
  const postalCode = document.querySelector('#postal-code');
  const country = document.querySelector('#country');
  
  // Validar campos requeridos
  const requiredFields = [firstName, lastName, email, phone, address, city, postalCode, country];
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field || !field.value.trim()) {
      isValid = false;
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  });
  
  // Validar email
  if (email && email.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email.value.trim())) {
      isValid = false;
      email.classList.add('error');
    }
  }
  
  // Validar método de pago
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
  
  if (!paymentMethod) {
    isValid = false;
    document.querySelector('.payment-methods').classList.add('error');
  } else {
    document.querySelector('.payment-methods').classList.remove('error');
  }
  
  // Mostrar mensaje de error
  if (!isValid) {
    alert('Por favor, completa todos los campos requeridos correctamente.');
  }
  
  return isValid;
}

function processOrder() {
  // Aquí iría la lógica para procesar el pedido
  alert('¡Gracias por tu compra! Tu pedido ha sido procesado correctamente.');
  
  // Limpiar carrito
  clearCart();
  
  // Redirigir a la página de confirmación
  window.location.href = 'confirmacion.html';
}