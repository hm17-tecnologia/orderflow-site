/*
 * OrderFlow: barra fixa no celular (WhatsApp + prévia grátis) e conversão do Google Ads.
 * - A barra só aparece em telas de até 760px, depois que a pessoa passa da primeira dobra.
 * - O WhatsApp da barra usa o mesmo link (com a mensagem pronta) do primeiro botão de WhatsApp da página.
 * - Conversão do Google Ads: ID e rótulo vêm de /api/public/site-config (aba Marketing do admin).
 *   Conta como conversão o clique em qualquer link de WhatsApp e o envio do pedido de prévia (evento Lead).
 */
(function () {
  var WA_PADRAO = 'https://wa.me/551152171727?text=' + encodeURIComponent('Olá! Quero saber mais sobre o OrderFlow.')
  var naHome = !!document.getElementById('contato')
  var linkPrevia = document.querySelector('a[href$="#contato"]')
  var previa = naHome ? '#contato' : (linkPrevia ? linkPrevia.getAttribute('href') : '/#contato')
  var waLink = (document.querySelector('a[href*="wa.me/"]') || {}).href || WA_PADRAO

  // ── Conversão do Google Ads ──
  var envio = null
  function converter(tipo) {
    try {
      if (envio && window.gtag) window.gtag('event', 'conversion', { send_to: envio, event_label: tipo })
    } catch (e) { /* sem rastreamento, sem problema */ }
  }
  fetch('https://pedido.orderflow.tec.br/api/public/site-config').then(function (r) { return r.json() }).then(function (c) {
    if (!c || !/^AW-\d{8,12}$/.test(c.gads || '')) return
    if (!window.gtag) {
      var g = document.createElement('script'); g.async = true
      g.src = 'https://www.googletagmanager.com/gtag/js?id=' + c.gads
      document.head.appendChild(g)
      window.dataLayer = window.dataLayer || []
      window.gtag = function () { window.dataLayer.push(arguments) }
      window.gtag('js', new Date())
    }
    window.gtag('config', c.gads)
    if (/^[A-Za-z0-9_-]{8,40}$/.test(c.gads_label || '')) envio = c.gads + '/' + c.gads_label
  }).catch(function () {})

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me/"]') : null
    if (a) converter('whatsapp')
  }, true)
  // Pedido de prévia enviado (a home chama ofTrack('Lead'))
  if (typeof window.ofTrack === 'function') {
    var orig = window.ofTrack
    window.ofTrack = function (ev, p) { orig(ev, p); if (ev === 'Lead') converter('previa') }
  }

  // ── Barra fixa no celular ──
  var css = document.createElement('style')
  css.textContent =
    '.of-barra{position:fixed;left:0;right:0;bottom:0;z-index:60;display:none;gap:10px;padding:10px 16px calc(10px + env(safe-area-inset-bottom));background:rgba(255,255,255,.97);border-top:1px solid #E7E2E1;box-shadow:0 -8px 24px -12px rgba(0,0,0,.25);transform:translateY(110%);transition:transform .25s ease}' +
    '.of-barra.mostra{transform:none}' +
    '.of-barra a{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;min-height:52px;border-radius:12px;font:600 16px/1 Geist,system-ui,-apple-system,"Segoe UI",sans-serif;text-decoration:none}' +
    '.of-barra .wa{background:#1F7A4D;color:#fff}' +
    '.of-barra .pv{background:#C2461A;color:#fff}' +
    '@media (max-width:760px){.of-barra{display:flex}body.tem-barra{padding-bottom:80px}body.tem-barra .wa-float{display:none!important}}' +
    '@media (prefers-reduced-motion:reduce){.of-barra{transition:none}}'
  document.head.appendChild(css)

  var barra = document.createElement('nav')
  barra.className = 'of-barra'
  barra.setAttribute('aria-label', 'Falar com o OrderFlow')
  barra.innerHTML =
    '<a class="wa" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21z"/></svg>WhatsApp</a>' +
    '<a class="pv">Prévia grátis</a>'
  barra.querySelector('.wa').href = waLink
  barra.querySelector('.pv').href = previa
  document.body.appendChild(barra)
  document.body.classList.add('tem-barra')

  // Aparece depois da primeira tela (o topo já tem os botões grandes)
  function ver() { barra.classList.toggle('mostra', window.scrollY > window.innerHeight * 0.6) }
  window.addEventListener('scroll', ver, { passive: true })
  ver()
})()
