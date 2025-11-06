const formNegocio = document.getElementById('form-negocio');
const negociosLista = document.getElementById('negocios-lista');
const notification = document.getElementById('notification');
const imagenInput = document.getElementById('imagenes');
const imagenPreview = document.getElementById('imagenes-preview');
const apartadosContainer = document.getElementById('apartados-container');
const agregarApartadoBtn = document.getElementById('agregar-apartado');

// Mostrar preview de imágenes
imagenInput.addEventListener('change', () => {
    imagenPreview.innerHTML = '';
    const files = Array.from(imagenInput.files);
    if(files.length === 0){
        imagenPreview.textContent = '🖼️ Previsualización';
        return;
    }
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagenPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

// Agregar apartado
agregarApartadoBtn.addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = 'apartado-item';
    div.innerHTML = `
        <input type="text" placeholder="Título del apartado" class="apartado-titulo" required>
        <input type="text" placeholder="Detalle del apartado" class="apartado-detalle" required>
        <button type="button" onclick="this.parentElement.remove()">Eliminar</button>
    `;
    apartadosContainer.appendChild(div);
});

// Guardar negocio
formNegocio.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const files = Array.from(imagenInput.files);

    if(!nombre || !descripcion || files.length === 0){
        alert('Completa todos los campos');
        return;
    }

    // Capturar apartados
    const apartadosElems = apartadosContainer.querySelectorAll('.apartado-item');
    const apartados = [];
    apartadosElems.forEach(div => {
        const titulo = div.querySelector('.apartado-titulo').value.trim();
        const detalle = div.querySelector('.apartado-detalle').value.trim();
        if(titulo && detalle){
            apartados.push({ titulo, detalle });
        }
    });

    if(apartados.length === 0){
        alert('Agrega al menos un apartado');
        return;
    }

    // Convertir imágenes a base64
    const imagenesBase64 = [];
    let cargadas = 0;

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            imagenesBase64.push(e.target.result);
            cargadas++;
            if(cargadas === files.length){
                // Guardar negocio completo
                const nuevoNegocio = {
                    nombre,
                    descripcion,
                    imagenes: imagenesBase64,
                    apartados
                };
                let negocios = JSON.parse(localStorage.getItem('negocios')) || [];
                negocios.push(nuevoNegocio);
                localStorage.setItem('negocios', JSON.stringify(negocios));

                formNegocio.reset();
                imagenPreview.innerHTML = ' Previsualización';
                apartadosContainer.innerHTML = '';
                mostrarNotificacion(' Negocio agregado con éxito');
                cargarNegocios(true);
            }
        };
        reader.readAsDataURL(file);
    });
});

// Cargar negocios
function cargarNegocios(nuevo=false){
    const negocios = JSON.parse(localStorage.getItem('negocios')) || [];
    negociosLista.innerHTML = '';

    if(negocios.length === 0){
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-state';
        emptyDiv.innerHTML = `
            <i>🏬</i>
            <p>Agrega un negocio usando el formulario superior</p>
        `;
        negociosLista.appendChild(emptyDiv);
        return;
    }

    negocios.forEach((negocio, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        if(nuevo && index === negocios.length - 1){
            card.style.opacity = 0;
            card.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }, 50);
        }

        const imgSrc = negocio.imagenes[0];
        const apartadosHTML = negocio.apartados.map(a => `<p><strong>${a.titulo}:</strong> ${a.detalle}</p>`).join('');

        //Aquí agregamos el botón eliminar
        card.innerHTML = `
            <div class="product-image">
                <img src="${imgSrc}" alt="${negocio.nombre}">
            </div>
            <div class="product-name">${negocio.nombre}</div>
            <div class="product-desc">${negocio.descripcion}</div>
            <div class="product-apartados">${apartadosHTML}</div>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        negociosLista.appendChild(card);
    });

    // Agregar funcionalidad a los botones eliminar
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', e => {
            const index = e.target.getAttribute('data-index');
            eliminarNegocio(index);
        });
    });
}

// Eliminar negocio
function eliminarNegocio(index){
    const confirmar = confirm("¿Seguro que deseas eliminar este negocio?");
    if(!confirmar) return;

    let negocios = JSON.parse(localStorage.getItem('negocios')) || [];
    negocios.splice(index, 1);
    localStorage.setItem('negocios', JSON.stringify(negocios));
    cargarNegocios();
    mostrarNotificacion('Negocio eliminado correctamente');
}

// Notificación
function mostrarNotificacion(mensaje){
    notification.textContent = mensaje;
    notification.classList.add('show');
    setTimeout(()=> notification.classList.remove('show'), 3000);
}

// Cerrar sesión
function cerrarSesion(){
    localStorage.removeItem('usuarioActivo');
    sessionStorage.removeItem('usuarioActivo');
}

// Inicializar al cargar página
document.addEventListener('DOMContentLoaded', () => cargarNegocios());
