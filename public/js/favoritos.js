// Favoritos apenas ilustrativos: o coração fica guardado no navegador,
// sem relação com nenhum usuário autenticado ou registro no banco de dados.
(function () {
  var CHAVE = 'clube-futebol-favoritos';
  var CORATIVADO = '\u2665';
  var CORVAZIO = '\u2661';

  function lerLista() {
    try {
      var salvo = JSON.parse(localStorage.getItem(CHAVE));
      return Array.isArray(salvo) ? salvo : [];
    } catch (e) {
      return [];
    }
  }

  function gravarLista(ids) {
    localStorage.setItem(CHAVE, JSON.stringify(ids));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var favoritos = lerLista();
    var botoes = Array.prototype.slice.call(document.querySelectorAll('[data-favorito]'));
    var contadores = document.querySelectorAll('[data-contador-favoritos]');
    var filtro = document.querySelector('[data-filtro-favoritos]');
    var aviso = document.getElementById('favoritos-aviso');
    var avisoVazio = document.querySelector('[data-aviso-sem-favoritos]');

    function atualizarContador() {
      contadores.forEach(function (elemento) {
        elemento.textContent = String(favoritos.length);
      });
    }

    function marcar(botao, ativo) {
      var id = botao.dataset.favorito;
      var nome = botao.dataset.nome || 'clube';
      var tem = favoritos.indexOf(id) !== -1;

      if (ativo && !tem) favoritos.push(id);
      if (!ativo && tem) favoritos = favoritos.filter(function (x) { return x !== id; });
      if (ativo === tem) return;

      botao.setAttribute('aria-pressed', String(ativo));
      botao.querySelector('.card__favorito__icone').textContent = ativo ? CORATIVADO : CORVAZIO;
      botao.setAttribute('aria-label',
        (ativo ? 'Remover ' : 'Adicionar ') + nome + ' dos clubes favoritos');
      botao.closest('.card').classList.toggle('card--favorito', ativo);

      gravarLista(favoritos);
      atualizarContador();
      seletorFiltro();

      if (aviso) {
        aviso.textContent = nome + (ativo ? ' ficou entre os favoritos.' : ' saiu dos favoritos.');
      }
    }

    function aplicar(botao) {
      var ativo = favoritos.indexOf(botao.dataset.favorito) !== -1;
      botao.setAttribute('aria-pressed', String(ativo));
      botao.querySelector('.card__favorito__icone').textContent = ativo ? CORATIVADO : CORVAZIO;
      botao.setAttribute('aria-label',
        (ativo ? 'Remover ' : 'Adicionar ') + (botao.dataset.nome || 'clube') + ' dos clubes favoritos');
      botao.closest('.card').classList.toggle('card--favorito', ativo);
    }

    function seletorFiltro() {
      if (!filtro) return;
      var somenteFavoritos = filtro.getAttribute('aria-pressed') === 'true';
      var visiveis = 0;

      botoes.forEach(function (botao) {
        var ehFavorito = botao.getAttribute('aria-pressed') === 'true';
        var mostrar = !somenteFavoritos || ehFavorito;
        botao.closest('.card').hidden = !mostrar;
        if (mostrar) visiveis++;
      });

      if (avisoVazio) avisoVazio.hidden = !(somenteFavoritos && visiveis === 0);
    }

    botoes.forEach(aplicar);
    atualizarContador();

    botoes.forEach(function (botao) {
      botao.addEventListener('click', function () {
        marcar(botao, botao.getAttribute('aria-pressed') !== 'true');
      });
    });

    if (filtro) {
      filtro.addEventListener('click', function () {
        var ativo = filtro.getAttribute('aria-pressed') !== 'true';
        filtro.setAttribute('aria-pressed', String(ativo));
        seletorFiltro();
      });
    }

    seletorFiltro();
  });
})();
