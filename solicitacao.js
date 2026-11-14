'use strict';
(function () {
  function limit(value, length) { return Array.from(String(value || '').replace(/\u0000/g, '').trim()).slice(0, length).join(''); }
  function createRequest(fields) {
    const lines = [
      'Olá, quero solicitar orientação ou exclusão de dados relacionados ao ComandaFC Digital.', '',
      'Nome usado no app: ' + limit(fields.name, 100),
      'Perfil: ' + limit(fields.role, 80),
      'Estabelecimento e cidade: ' + limit(fields.shop, 160),
      'Dados/acesso envolvidos e resultado desejado:', limit(fields.detail, 800), '',
      'Entendo que os dados da operação ficam no estabelecimento e que este e-mail não executa uma exclusão automática.'
    ];
    return 'mailto:Desenvolvedorfca@gmail.com?subject=' + encodeURIComponent('ComandaFC Digital - Solicitação de exclusão de dados') + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { createRequest };
  if (typeof document === 'undefined') return;
  const form = document.getElementById('request-form');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const message = createRequest({
      name: form.elements.namedItem('name').value,
      role: form.elements.namedItem('role').value,
      shop: form.elements.namedItem('shop').value,
      detail: form.elements.namedItem('detail').value
    });
    document.getElementById('request-status').textContent = 'Mensagem preparada. Revise e envie no seu aplicativo de e-mail. Se ele não abrir, use o endereço de contato acima. Nenhum pedido é enviado automaticamente por esta página.';
    window.location.href = message;
  });
}());
