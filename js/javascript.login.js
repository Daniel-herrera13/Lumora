// Crear partículas para el fondo
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

// Inicializador login
(function initLogin() {
    function main() {
        const form = document.getElementById('form-login');
        const msg = document.getElementById('mensaje');
        
        if (!form) {
            console.error('Formulario de login no encontrado');
            return;
        }

        // Usuarios predefinidos 
        const usuariosPredefinidos = [
            { id: 1, email: 'admin@example.com', pass: '1234', rol: 'admin', nombre: 'Administrador' },
            { id: 2, email: 'premium@example.com', pass: '12345', rol: 'premium', nombre: 'Usuario Premium' },
            { id: 3, email: 'basico@example.com', pass: '4321', rol: 'basico', nombre: 'Usuario Básico' }
        ];

        // Combinar usuarios predefinidos con registrados
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
        const usuarios = [...usuariosPredefinidos, ...usuariosRegistrados];

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = (document.getElementById('email').value || '').trim().toLowerCase();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;

            // Buscar usuario
            const usuarioEncontrado = usuarios.find(us => 
                us.email && us.email.toLowerCase() === emailInput && us.pass === password
            );

            if (usuarioEncontrado) {
                showMessage(msg, '¡Inicio de sesión exitoso! ✅ Redirigiendo...', 'success');

                // Guardar usuario activo
                const usuarioActivo = {
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    email: usuarioEncontrado.email,
                    rol: usuarioEncontrado.rol,
                    fechaLogin: new Date().toISOString()
                };

                if (remember) {
                    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
                } else {
                    sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
                }

                // Redirección según rol
                setTimeout(() => {
                    switch(usuarioEncontrado.rol) {
                        case 'admin':
                            window.location.href = 'admin.html';
                            break;
                        case 'premium':
                            window.location.href = 'usuario-premium1.html';  //esto estaba mal
                            break;
                        case 'basico':
                        case 'cliente':
                        default:
                            window.location.href = 'usuario-default.html'; 
                    }
                }, 1500);
            } else {
                showMessage(msg, 'Correo o contraseña incorrectos ', 'error');
            }
        });

        // Autocompletar si estaba recordado
        const usuarioGuardado = localStorage.getItem('usuarioActivo') || sessionStorage.getItem('usuarioActivo');
        if (usuarioGuardado) {
            try {
                const usuario = JSON.parse(usuarioGuardado);
                if (usuario?.email) {
                    document.getElementById('email').value = usuario.email;
                    if (document.getElementById('remember')) {
                        document.getElementById('remember').checked = true;
                    }
                }
            } catch (err) {
                console.error('Error al cargar usuario guardado:', err);
            }
        }

        createParticles();
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

    // Inicialización
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();
