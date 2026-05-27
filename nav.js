// nav.js — hamburger menu for all pages
(function () {
  // Inject overlay backdrop into body
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'navOverlay';
  document.body.appendChild(overlay);

  // Find nav elements
  const navLinks = document.querySelector('.nav-links');
  const nav = document.querySelector('nav');

  // Inject burger button into nav (before nav-links)
  const burger = document.createElement('button');
  burger.className = 'burger-btn';
  burger.id = 'burgerBtn';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.innerHTML = `
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
  `;
  nav.appendChild(burger);

  function openMenu() {
    navLinks.classList.add('open');
    overlay.classList.add('visible');
    burger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    overlay.classList.remove('visible');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();