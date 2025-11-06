// 🌟 Crear partículas de fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 25 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = Math.random() * 10 + 15;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);
    }
}

// Función auxiliar para mostrar mensajes
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = 'block';
    
    // Ocultar mensaje después de 5 segundos para errores
    if (type === 'error') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Inicializador del registro
(function initRegister() {
    function main() {
        const form = document.getElementById('form-register');
        const msg = document.getElementById('mensaje');
        
        if (!form) {
            console.error('Formulario de registro no encontrado');
            return;
        }

        // Cargar usuarios existentes
        const usuariosKey = 'usuariosRegistrados';
        const usuariosGuardados = JSON.parse(localStorage.getItem(usuariosKey)) || [];

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;

            // Validaciones mejoradas
            if (!nombre || !email || !password) {
                showMessage(msg, 'Por favor completa todos los campos.', 'error');
                return;
            }

            if (password.length < 6) {
                showMessage(msg, 'La contraseña debe tener al menos 6 caracteres.', 'error');
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage(msg, 'Por favor ingresa un correo electrónico válido.', 'error');
                return;
            }

            // Validar si ya existe el correo
            const yaExiste = usuariosGuardados.some(user => 
                user.email && user.email.toLowerCase() === email
            );

            if (yaExiste) {
                showMessage(msg, 'Este correo ya está registrado ', 'error');
                return;
            }

            // Crear nuevo usuario CON FOTO POR DEFECTO
            const nuevoUsuario = {
                id: Date.now(), // ID único
                nombre: nombre,
                email: email,
                pass: password,
                rol: 'cliente',
                fechaRegistro: new Date().toISOString(),
                foto: 'img/usuario-default.png' // ← FOTO POR DEFECTO AGREGADA AQUÍ
            };

            usuariosGuardados.push(nuevoUsuario);
            localStorage.setItem(usuariosKey, JSON.stringify(usuariosGuardados));

            // DEBUG: Verificar que se guardó con la foto
            console.log('Usuario registrado:', nuevoUsuario);
            console.log('Todos los usuarios después del registro:', JSON.parse(localStorage.getItem(usuariosKey)));

            showMessage(msg, '¡Registro exitoso!  Redirigiendo al login...', 'success');

            // Limpiar formulario
            form.reset();

            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });

        createParticles();
    }

    // Inicialización
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();