// As telas de entrada e cadastro são apenas ilustrativas: o envio do formulário
// é interrompido no navegador e nenhuma credencial chega ao servidor.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-form-ilustrativo]').forEach(function (form) {
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var aviso = form.querySelector('[data-aviso-envio]');
      if (aviso) aviso.hidden = false;
      var destino = aviso || form;
      destino.setAttribute('tabindex', '-1');
      destino.focus();
    });
  });
});
