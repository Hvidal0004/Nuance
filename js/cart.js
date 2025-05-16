// Funcionalidad específica de la página de carrito
document.addEventListener('DOMContentLoaded', function() {
  // Cargar carrito
  loadCart();
  
  // Botón de continuar comprando
  const continueShopping = document.querySelector('.continue-shopping');
  
  if (continueShopping) {
    continueShopping.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }
  
  // Botón de vaciar carrito
  const clearCartBtn = document.querySelector('.clear-cart');
  
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        clearCart();
      }
    });
  }
  
  // Botón de checkout
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'checkout.html';
    });
  }
});

function loadCart() {
  const cartContainer = document.querySelector('.cart-items');
  const cartSummary = document.querySelector('.cart-summary');
  const cartEmpty = document.querySelector('.cart-empty');
  
  if (!cartContainer || !cartSummary) return;
  
  // Obtener carrito
  const cart = JSON.parse(localStorage.getItem('nudeProjectCart')) || [];
  
  if (cart.length === 0) {
    // Mostrar mensaje de carrito vacío
    if (cartEmpty) cartEmpty.style.display = 'block';
    cartContainer.style.display = 'none';
    cartSummary.style.display = 'none';
    return;
  }
  
  // Ocultar mensaje de carrito vacío
  if (cartEmpty) cartEmpty.style.display = 'none';
  cartContainer.style.display = 'block';
  cartSummary.style.display = 'block';
  
  // Limpiar contenedor
  cartContainer.innerHTML = '';
  
  // Crear tabla
  const table = document.createElement('table');
  table.className = 'cart-table';
  
  // Crear cabecera
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Producto</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th>Total</th>
      <th></th>
    </tr>
  `;
  table.appendChild(thead);
  
  // Crear cuerpo
  const tbody = document.createElement('tbody');
  
  let subtotal = 0;
  
  cart.forEach((item, index) => {
    // Calcular precio
    const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
    const total = price * item.quantity;
    subtotal += total;
    
    // Crear fila
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="cart-product">
          <img src="${item.img}" alt="${item.title}" class="cart-product-img">
          <div class="cart-product-info">
            <h3 class="cart-product-title">${item.title}</h3>
            <p class="cart-product-variant">Color: ${item.color} / Talla: ${item.size}</p>
          </div>
        </div>
      </td>
      <td>${item.price}</td>
      <td>
        <div class="quantity-selector">
          <button class="quantity-btn" data-action="decrease" data-index="${index}">-</button>
          <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
          <button class="quantity-btn" data-action="increase" data-index="${index}">+</button>
        </div>
      </td>
      <td>€${total.toFixed(2)}</td>
      <td>
        <button class="cart-remove" data-index="${index}">Eliminar</button>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  cartContainer.appendChild(table);
  
  // Actualizar resumen
  const subtotalEl = document.querySelector('.summary-subtotal');
  const shippingEl = document.querySelector('.summary-shipping');
  const totalEl = document.querySelector('.summary-total');
  
  if (subtotalEl && totalEl) {
    subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    
    // Calcular envío (gratis a partir de 100€)
    const shipping = subtotal >= 100 ? 0 : 4.95;
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`;
    }
    
    const total = subtotal + shipping;
    totalEl.textContent = `€${total.toFixed(2)}`;
  }
  
  // Añadir eventos
  setupCartEvents();
}

function setupCartEvents() {
  // Botones de cantidad
  const quantityBtns = document.querySelectorAll('.cart-table .quantity-btn');
  const quantityInputs = document.querySelectorAll('.cart-table .quantity-input');
  const removeButtons = document.querySelectorAll('.cart-remove');
  
  // Botones de aumentar/disminuir cantidad
  quantityBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      const action = this.dataset.action;
      const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
      
      if (input) {
        let currentValue = parseInt(input.value);
        
        if (action === 'decrease' && currentValue > 1) {
          input.value = currentValue - 1;
        } else if (action === 'increase') {
          input.value = currentValue + 1;
        }
        
        // Actualizar carrito
        updateCartItemQuantity(index, parseInt(input.value));
      }
    });
  });
  
  // Inputs de cantidad
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      const index = parseInt(this.dataset.index);
      let value = parseInt(this.value);
      
      // Asegurar valor mínimo
      if (value < 1) {
        value = 1;
        this.value = 1;
      }
      
      // Actualizar carrito
      updateCartItemQuantity(index, value);
    });
  });
  
  // Botones de eliminar
  removeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      
      if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        removeFromCart(index);
      }
    });
  });
}

function clearCart() {
  localStorage.removeItem('nudeProjectCart');
  loadCart();
}

function updateCartItemQuantity(index, quantity) {
  let cart = JSON.parse(localStorage.getItem('nudeProjectCart')) || [];
  
  if (cart[index]) {
    cart[index].quantity = quantity;
    localStorage.setItem('nudeProjectCart', JSON.stringify(cart));
    loadCart();
  }
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('nudeProjectCart')) || [];
  
  cart.splice(index, 1);
  
  localStorage.setItem('nudeProjectCart', JSON.stringify(cart));
  loadCart();
}