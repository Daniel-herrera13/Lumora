// editar-perfil.js
document.addEventListener('DOMContentLoaded', function() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo') || sessionStorage.getItem('usuarioActivo'));
    
    if (!usuarioActivo) {
        window.location.href = 'login.html';
        return;
    }

    // Cargar datos actuales
    document.getElementById('nombre-input').value = usuarioActivo.nombre;
    document.getElementById('foto-preview').src = usuarioActivo.foto || 'img/usuario-default.png';
    
    // Actualizar navbar
    actualizarNavbar(usuarioActivo);

    // Preview de nueva foto
    document.getElementById('foto-input').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('foto-preview').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Guardar cambios
    document.getElementById('form-editar-perfil').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nuevoNombre = document.getElementById('nombre-input').value.trim();
        const fotoInput = document.getElementById('foto-input');
        const mensaje = document.getElementById('mensaje');

        if (!nuevoNombre) {
            mostrarMensaje(mensaje, 'El nombre no puede estar vacío', 'error');
            return;
        }

        // Actualizar usuario activo
        usuarioActivo.nombre = nuevoNombre;
        
        // Guardar nueva foto si se seleccionó
        if (fotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                usuarioActivo.foto = e.target.result;
                guardarCambios(usuarioActivo, mensaje);
            }
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            guardarCambios(usuarioActivo, mensaje);
        }
    });
});

function guardarCambios(usuario, mensaje) {
    // Actualizar en localStorage/sessionStorage
    if (localStorage.getItem('usuarioActivo')) {
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    } else {
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    }

    // Actualizar en la lista de usuarios registrados
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuarioIndex = usuariosRegistrados.findIndex(u => u.id === usuario.id);
    
    if (usuarioIndex !== -1) {
        usuariosRegistrados[usuarioIndex].nombre = usuario.nombre;
        usuariosRegistrados[usuarioIndex].foto = usuario.foto;
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
    }

    mostrarMensaje(mensaje, '¡Perfil actualizado correctamente! ', 'success');
    
    // Actualizar navbar inmediatamente
    actualizarNavbar(usuario);
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
        window.location.href = 'usuario-default.html';
    }, 2000);
}

function mostrarMensaje(elemento, mensaje, tipo) {
    elemento.textContent = mensaje;
    elemento.className = `message ${tipo}`;
    elemento.style.display = 'block';
}