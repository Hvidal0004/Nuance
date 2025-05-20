// Funcionalidad específica de la página de cuenta
document.addEventListener('DOMContentLoaded', function() {
  // Menú de cuenta
  const accountMenuLinks = document.querySelectorAll('.account-menu-link');
  const accountSections = document.querySelectorAll('.account-section-content');
  
  if (accountMenuLinks.length > 0 && accountSections.length > 0) {
    accountMenuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtener sección
        const section = this.getAttribute('href').substring(1);
        
        // Actualizar menú
        accountMenuLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Mostrar sección
        accountSections.forEach(s => {
          s.style.display = 'none';
        });
        
        const activeSection = document.querySelector(`.account-section-content[data-section="${section}"]`);
        
        if (activeSection) {
          activeSection.style.display = 'block';
        }
        
        // Actualizar URL sin recargar
        history.pushState(null, null, `cuenta.html#${section}`);
      });
    });
    
    // Comprobar hash en la URL
    const hash = window.location.hash.substring(1);
    
    if (hash) {
      const activeLink = document.querySelector(`.account-menu-link[href="#${hash}"]`);
      
      if (activeLink) {
        activeLink.click();
      }
    } else {
      // Activar primera opción por defecto
      accountMenuLinks[0].click();
    }
  }
  
  // Formulario de inicio de sesión
  const loginForm = document.querySelector('.login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('#login-email').value;
      const password = this.querySelector('#login-password').value;
      
      if (email && password) {
        // Aquí iría la lógica de autenticación
        alert('Inicio de sesión simulado. En una aplicación real, esto conectaría con un backend.');
        
        // Simular inicio de sesión exitoso
        localStorage.setItem('nudeProjectUser', JSON.stringify({
          email: email,
          name: 'Usuario de Prueba'
        }));
        
        // Recargar página
        window.location.reload();
      } else {
        alert('Por favor, introduce tu email y contraseña.');
      }
    });
  }
  
  // Formulario de registro
  const registerForm = document.querySelector('.register-form');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = this.querySelector('#register-name').value;
      const email = this.querySelector('#register-email').value;
      const password = this.querySelector('#register-password').value;
      const confirmPassword = this.querySelector('#register-confirm-password').value;
      
      if (name && email && password && confirmPassword) {
        if (password !== confirmPassword) {
          alert('Las contraseñas no coinciden.');
          return;
        }
        
        // Aquí iría la lógica de registro
        alert('Registro simulado. En una aplicación real, esto conectaría con un backend.');
        
        // Simular registro exitoso
        localStorage.setItem('nudeProjectUser', JSON.stringify({
          email: email,
          name: name
        }));
        
        // Recargar página
        window.location.reload();
      } else {
        alert('Por favor, completa todos los campos.');
      }
    });
  }
  
  // Comprobar si el usuario está logueado
  const user = JSON.parse(localStorage.getItem('nudeProjectUser'));
  const loginContainer = document.querySelector('.login-container');
  const accountContainer = document.querySelector('.account-container');
  
  if (user && loginContainer && accountContainer) {
    loginContainer.style.display = 'none';
    accountContainer.style.display = 'grid';
    
    // Actualizar nombre de usuario
    const userName = document.querySelector('.user-name');
    
    if (userName) {
      userName.textContent = user.name;
    }
  } else if (loginContainer && accountContainer) {
    loginContainer.style.display = 'block';
    accountContainer.style.display = 'none';
  }
  
  // Botón de cerrar sesión
  const logoutBtn = document.querySelector('.logout-btn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Eliminar usuario
      localStorage.removeItem('nudeProjectUser');
      
      // Recargar página
      window.location.reload();
    });
  }
});