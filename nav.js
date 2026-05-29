// nav.js — hamburger menu for all pages
(function () {
  var nav      = document.querySelector('nav');
  var navLinks = document.querySelector('.nav-links');
  if (!nav || !navLinks) return;

  // 1. Move dark-toggle out of nav-links
  var darkBtn = navLinks.querySelector('.dark-toggle');
  if (darkBtn) {
    navLinks.removeChild(darkBtn);
    nav.appendChild(darkBtn);
  }

  // 2. Inject all styles
  var style = document.createElement('style');
  style.textContent = `
    #burgerBtn {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      background: rgba(255,75,110,0.08);
      border: 1.5px solid rgba(255,75,110,0.2);
      border-radius: 12px;
      cursor: pointer;
      flex-shrink: 0;
      margin-left: 8px;
      padding: 0;
    }
    #burgerBtn span {
      display: block;
      width: 20px;
      height: 2.5px;
      background: var(--primary);
      border-radius: 3px;
      transition: all 0.3s ease;
      transform-origin: center;
    }
    #burgerBtn.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
    #burgerBtn.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    #burgerBtn.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }
    body.dark #burgerBtn {
      background: rgba(124,131,255,0.1);
      border-color: rgba(124,131,255,0.2);
    }

    #navOverlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      background: rgba(0,0,0,0.6);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }
    #navOverlay.visible {
      opacity: 1;
      visibility: visible;
    }

    @media (max-width: 768px) {
      #burgerBtn { display: flex; }

      .nav-links {
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: auto !important;
        width: 75vw !important;
        max-width: 300px !important;
        height: 100vh !important;
        z-index: 9999 !important;
        background: #ffffff !important;
        padding: 80px 20px 40px !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 6px !important;
        overflow-y: auto !important;
        transform: translateX(100%) !important;
        transition: transform 0.32s cubic-bezier(0.4,0,0.2,1) !important;
        box-shadow: -8px 0 40px rgba(0,0,0,0.2) !important;
        display: flex !important;
      }

      body.dark .nav-links {
        background: #16161f !important;
      }

      .nav-links.open {
        transform: translateX(0) !important;
      }

      .nav-links a {
        display: block !important;
        width: 100% !important;
        padding: 14px 18px !important;
        border-radius: 14px !important;
        font-size: 1rem !important;
        font-weight: 700 !important;
        color: #1a1a2e !important;
        text-decoration: none !important;
        transition: background 0.18s ease !important;
        cursor: pointer !important;
        pointer-events: all !important;
        position: relative !important;
        z-index: 10000 !important;
      }

      body.dark .nav-links a {
        color: #f0f0ff !important;
      }

      .nav-links a:hover,
      .nav-links a.active {
        background: rgba(255,75,110,0.1) !important;
        color: #ff4b6e !important;
      }

      body.dark .nav-links a:hover,
      body.dark .nav-links a.active {
        background: rgba(124,131,255,0.12) !important;
        color: #7c83ff !important;
      }
    }
  `;
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