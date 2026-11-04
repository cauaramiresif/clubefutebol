// Controle de tamanho da fonte do site Clube Futebol.
// Ajusta a variável CSS --font-scale no <html>; o valor fica salvo no navegador.
(function () {
  var PASSOS = [0.875, 1, 1.125, 1.25, 1.5, 1.75];
  var CHAVE = 'clube-futebol-font-scale';
  var raiz = document.documentElement;

  function lerIndice() {
    var salvo = parseFloat(localStorage.getItem(CHAVE));
    var i = PASSOS.indexOf(salvo);
    return i === -1 ? 1 : i;
  }

  function aplicar(indice, anunciar) {
    var valor = PASSOS[indice];
    raiz.style.setProperty('--font-scale', valor);
    localStorage.setItem(CHAVE, String(valor));

    var mostrado = document.getElementById('fonte-valor');
    if (mostrado) mostrado.textContent = Math.round(valor * 100) + '%';

    var aviso = document.getElementById('fonte-aviso');
    if (aviso && anunciar) {
      aviso.textContent = 'Tamanho da fonte ajustado para ' + Math.round(valor * 100) + ' por cento.';
    }
    document.querySelectorAll('[data-fonte]').forEach(function (b) {
      b.setAttribute('aria-disabled', String(
        (b.dataset.fonte === 'diminuir' && indice === 0) ||
        (b.dataset.fonte === 'aumentar' && indice === PASSOS.length - 1)
      ));
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var indice = lerIndice();
    aplicar(indice, false);

    document.querySelectorAll('[data-fonte]').forEach(function (botao) {
      botao.addEventListener('click', function () {
        var proximo = botao.dataset.fonte === 'aumentar'
          ? Math.min(indice + 1, PASSOS.length - 1)
          : Math.max(indice - 1, 0);
        if (proximo !== indice) {
          indice = proximo;
          aplicar(indice, true);
        }
      });
    });
  });

  // Aplica antes do primeiro paint para evitar texto piscando.
  aplicar(lerIndice(), false);
})();
