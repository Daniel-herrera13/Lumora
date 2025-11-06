// logout.js - Para manejar el cierre de sesión
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesion();
        });
    }
});

function cerrarSesion() {
    // Mostrar confirmación
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Eliminar datos de sesión
        localStorage.removeItem('usuarioActivo');
        sessionStorage.removeItem('usuarioActivo');
        
        // Mostrar mensaje de éxito
        alert('Sesión cerrada correctamente. ¡Hasta pronto!');
        
        // Redirigir al login
        window.location.href = 'login.html';
    }
}