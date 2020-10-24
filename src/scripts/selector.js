const query = document.querySelector('#query');
const go = document.querySelector('#go');
const options = [...document.querySelector('#pypinfo').children]
go.addEventListener('click', function() {
  const selected = options.find((option) => option.value === query.value)
  if (!selected) {
    const alert = document.createElement('div')
    alert.textContent = 'Seleccione una opción de la lista.'
    go.parentNode.append(alert)
    
    return;
  }
  window.location.href = selected.dataset.url;
});
