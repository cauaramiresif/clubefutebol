// Alterna o menu principal em telas pequenas, mantendo acessibilidade por teclado.
document.addEventListener('DOMContentLoaded', function () {
  var gatilho = document.getElementById('menu-trigger');
  var lista = document.getElementById('menu-lista');
  if (!gatilho || !lista) return;

  gatilho.addEventListener('click', function () {
    var aberto = lista.dataset.aberto === 'true';
    lista.dataset.aberto = String(!aberto);
    gatilho.setAttribute('aria-expanded', String(!aberto));
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lista.dataset.aberto === 'true') {
      lista.dataset.aberto = 'false';
      gatilho.setAttribute('aria-expanded', 'false');
      gatilho.focus();
    }
  });
});
