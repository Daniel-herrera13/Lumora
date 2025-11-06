// usuario.js - Cargar datos del usuario en la página de perfil
document.addEventListener('DOMContentLoaded', function() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo') || sessionStorage.getItem('usuarioActivo'));
    
    if (!usuarioActivo) {
        window.location.href = 'login.html';
        return;
    }

    // Actualizar datos en la página
    document.querySelector('.info-usuario h1').textContent = usuarioActivo.nombre;
    document.querySelector('.info-usuario p').textContent = usuarioActivo.rol === 'cliente' ? 'Usuario' : usuarioActivo.rol;
    
    // Actualizar foto de perfil
    const fotoPerfil = document.querySelector('.foto-usuario img');
    if (usuarioActivo.foto) {
        fotoPerfil.src = usuarioActivo.foto;
    }

    // Botón editar usuario
    document.querySelector('.btn-editar').addEventListener('click', function() {
        window.location.href = 'editar-perfil.html';
    });

    // Actualizar navbar también
    actualizarNavbar(usuarioActivo);
});

// Función para actualizar navbar en todas las páginas
function actualizarNavbar(usuario = null) {
    if (!usuario) {
        usuario = JSON.parse(localStorage.getItem('usuarioActivo') || sessionStorage.getItem('usuarioActivo'));
    }
    
    const profileImg = document.querySelector('.profile-icon img');
    if (profileImg && usuario && usuario.foto) {
        profileImg.src = usuario.foto;
    }
}

// Llamar a actualizarNavbar en todas las páginas
actualizarNavbar();