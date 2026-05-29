// nav.js — hamburger menu for all pages
(function () {
  var nav      = document.querySelector('nav');
  var navLinks = document.querySelector('.nav-links');
  if (!nav || !navLinks) return;

  // 1. Move dark-toggle out of nav-links so it's always visible
  var darkBtn = navLinks.querySelector('.dark-toggle');
  if (darkBtn) {
    navLinks.removeChild(darkBtn);
    nav.appendChild(darkBtn);
  }

  // 2. Inject burger button styles
  var style = document.createElement('style');
  style.textContent =
    '#burgerBtn{' +
      'display:none;' +
      'flex-direction:column;justify-content:center;align-items:center;gap:5px;' +
      'background:rgba(255,75,110,0.07);' +
      'border:1.5px solid rgba(255,75,110,0.15);' +
      'border-radius:12px;padding:8px 10px;' +
      'cursor:pointer;transition:background 0.2s ease;' +
      'flex-shrink:0;margin-left:8px;' +
    '}' +
    '#burgerBtn span{' +
      'display:block;width:20px;height:2.5px;' +
      'background:var(--primary);border-radius:3px;' +
      'transition:all 0.3s ease;transform-origin:center;' +
    '}' +
    '#burgerBtn.open span:nth-child(1){transform:translateY(7.5px) rotate(45deg);}' +
    '#burgerBtn.open span:nth-child(2){opacity:0;transform:scaleX(0);}' +
    '#burgerBtn.open span:nth-child(3){transform:translateY(-7.5px) rotate(-45deg);}' +
    '#burgerBtn:hover{background:rgba(255,75,110,0.14);}' +
    'body.dark #burgerBtn{background:rgba(124,131,255,0.1);border-color:rgba(124,131,255,0.2);}' +
    '#navOverlay{position:fixed;inset:0;z-index:998;background:rgba(0,0,0,0.35);opacity:0;visibility:hidden;transition:opacity 0.25s ease,visibility 0.25s ease;}' +
    '#navOverlay.visible{opacity:1;visibility:visible;}' +
    '@media(max-width:768px){#burgerBtn{display:flex;}}';
  document.head.appendChild(style);

  // 3. Create burger button
  var burger = document.createElement('button');
  burger.id = 'burgerBtn';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(burger);

  // 4. Create overlay
  var overlay = document.createElement('div');
  overlay.id = 'navOverlay';
  document.body.appendChild(overlay);

  // 5. Open / Close
  function openMenu() {
    navLinks.classList.add('open');
    burger.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);
  navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

})();