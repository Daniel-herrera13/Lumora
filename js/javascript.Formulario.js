//no funciona XD
document.getElementById('formularioLumora').addEventListener('submit', function(event) {
  event.preventDefault();

  alert('Formulario enviado correctamente ');
  this.reset();
  document.getElementById('previewLogo').style.display = 'none';
  document.getElementById('previewGaleria').innerHTML = '';
});


