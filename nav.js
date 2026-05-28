// nav.js — hamburger menu for all pages
(function () {
  var nav      = document.querySelector('nav');
  var navLinks = document.querySelector('.nav-links');
  if (!nav || !navLinks) return;

  // ── 1. Move dark-toggle out of nav-links → sits after it in nav ──
  var darkBtn = navLinks.querySelector('.dark-toggle');
  if (darkBtn) {
    navLinks.removeChild(darkBtn);
    nav.appendChild(darkBtn);
  }

  // ── 2. Inject burger button (hidden on desktop via CSS) ──
  var burger = document.createElement('button');
  burger.id = 'burgerBtn';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(burger);

  // ── 3. Inject all needed CSS once ──
  var style = document.createElement('style');
  style.textContent = [
    /* Burger button base */
    '#burgerBtn{',
      'display:none;',
      'flex-direction:column;justify-content:center;align-items:center;gap:5px;',
      'background:rgba(255,75,110,0.07);',
      'border:1.5px solid rgba(255,75,110,0.15);',
      'border-radius:12px;padding:8px 10px;',
      'cursor:pointer;transition:background 0.2s ease;',
      'flex-shrink:0;margin-left:8px;',
    '}',
    '#burgerBtn span{',
      'display:block;width:20px;height:2.5px;',
      'background:var(--primary);border-radius:3px;',
      'transition:all 0.3s ease;transform-origin:center;',
    '}',
    '#burgerBtn.open span:nth-child(1){transform:translateY(7.5px) rotate(45deg);}',
    '#burgerBtn.open span:nth-child(2){opacity:0;transform:scaleX(0);}',
    '#burgerBtn.open span:nth-child(3){transform:translateY(-7.5px) rotate(-45deg);}',
    '#burgerBtn:hover{background:rgba(255,75,110,0.14);}',
    'body.dark #burgerBtn{background:rgba(124,131,255,0.1);border-color:rgba(124,131,255,0.2);}',

    /* Overlay */
    '#navOverlay{',
      'position:fixed;inset:0;z-index:998;',
      'background:rgba(0,0,0,0.35);',
      'opacity:0;visibility:hidden;',
      'transition:opacity 0.25s ease,visibility 0.25s ease;',
    '}',
    '#navOverlay.visible{opacity:1;visibility:visible;}',

    /* Mobile */
    '@media(max-width:768px){',
      '#burgerBtn{display:flex;}',
      'nav{flex-wrap:nowrap!important;gap:0!important;position:relative;}',
      '.nav-links{',
        'display:none;',
        'position:absolute;',
        'top:calc(100% + 10px);left:0;right:0;',
        'flex-direction:column;gap:2px;',
        'background:rgba(255,255,255,0.98);',
        'backdrop-filter:blur(20px);',
        'border:1.5px solid var(--border);',
        'border-radius:18px;padding:10px;',
        'box-shadow:0 12px 40px rgba(255,75,110,0.14);',
        'z-index:999;',
      '}',
      'body.dark .nav-links{',
        'background:rgba(22,22,31,0.98);',
        'box-shadow:0 12px 40px rgba(124,131,255,0.12);',
      '}',
      '.nav-links.open{display:flex;}',
      '.nav-links a{',
        'display:block;',
        'padding:12px 16px!important;',
        'font-size:15px!important;',
        'border-radius:12px;',
        'width:100%;text-align:left;',
      '}',
    '}',
  ].join('');
  document.head.appendChild(style);

  // ── 4. Overlay element ──
  var overlay = document.createElement('div');
  overlay.id = 'navOverlay';
  document.body.appendChild(overlay);

  // ── 5. Open / close ──
  function open() {
    navLinks.classList.add('open');
    burger.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.contains('open') ? close() : open();
  });

  overlay.addEventListener('click', close);

  navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', close);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });

})();