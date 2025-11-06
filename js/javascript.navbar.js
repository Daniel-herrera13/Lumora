// navbar.js - VERSIÓN SEGURA
function actualizarNavbar() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo') || sessionStorage.getItem('usuarioActivo'));
    const profileImg = document.querySelector('.profile-icon img');
    
    if (profileImg) {
        profileImg.src = (usuario && usuario.foto) ? usuario.foto : 'img/usuario-default.png';
    }
    
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu) {
    }
}

document.addEventListener('DOMContentLoaded', actualizarNavbar);
window.addEventListener('storage', actualizarNavbar);