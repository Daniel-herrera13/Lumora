const contenedor = document.getElementById('negocios-container');
const modal = document.getElementById('modal-info');
const modalNombre = document.getElementById('modal-nombre');
const modalDescripcion = document.getElementById('modal-descripcion');
const modalApartados = document.getElementById('modal-apartados');
const modalImagenes = document.getElementById('modal-imagenes');
const cerrarModal = document.getElementById('cerrar-modal');

function cargarNegocios() {
    // Traer negocios desde localStorage
    const negocios = JSON.parse(localStorage.getItem('negocios')) || [];

    contenedor.innerHTML = ''; // Limpiar contenedor

    if (negocios.length === 0) {
        contenedor.innerHTML = `<p style="color:#bbb; text-align:center;">No hay negocios agregados todavía</p>`;
        return;
    }

    negocios.forEach(neg => {
        const div = document.createElement('div');
        div.classList.add('negocio');
        div.innerHTML = `
            <img src="${neg.imagenes[0]}" alt="${neg.nombre}">
            <div class="info">
                <h3>${neg.nombre}</h3>
                <p>${neg.descripcion}</p>
                <div>
                    ${neg.apartados.map(a => `<span class="apartado">${a.titulo}</span>`).join('')}
                </div>
            </div>
        `;

        div.addEventListener('click', () => {
            modalNombre.textContent = neg.nombre;
            modalDescripcion.textContent = neg.descripcion;

            // cargar imágenes
            modalImagenes.innerHTML = '';
            neg.imagenes.forEach(img => {
                const i = document.createElement('img');
                i.src = img;
                modalImagenes.appendChild(i);
            });

            // cargar apartados detallados
            modalApartados.innerHTML = '';
            neg.apartados.forEach(a => {
                const d = document.createElement('div');
                d.classList.add('apartado');
                d.innerHTML = `<strong>${a.titulo}:</strong> ${a.detalle}`;
                modalApartados.appendChild(d);
            });

            modal.style.display = "flex";
        });

        contenedor.appendChild(div);
    });
}

cerrarModal.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', e => { if(e.target === modal) modal.style.display = "none"; });

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', cargarNegocios);
