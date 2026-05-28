// nav.js — hamburger menu for all pages
(function () {

  const navLinks = document.querySelector('.nav-links');
  const nav      = document.querySelector('nav');
  if (!navLinks || !nav) return;

  // Move dark-toggle OUT of nav-links so it stays visible on mobile
  const darkToggle = navLinks.querySelector('.dark-toggle');
  if (darkToggle) {
    navLinks.removeChild(darkToggle);
    nav.appendChild(darkToggle);
  }

  // Overlay backdrop
  const overlay = document.createElement('div');
  overlay.id = 'navOverlay';
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:998',
    'background:rgba(0,0,0,0.4)', 'backdrop-filter:blur(2px)',
    'display:none', 'opacity:0', 'transition:opacity 0.25s ease'
  ].join(';');
  document.body.appendChild(overlay);

  // Burger button
  const burger = document.createElement('button');
  burger.id = 'burgerBtn';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.style.cssText = [
    'display:none',
    'flex-direction:column', 'gap:5px',
    'background:rgba(255,75,110,0.07)',
    'border:1.5px solid rgba(255,75,110,0.15)',
    'border-radius:12px', 'padding:8px 10px',
    'cursor:pointer', 'transition:background 0.2s ease',
    'flex-shrink:0', 'margin-left:8px'
  ].join(';');
  burger.innerHTML =
    '<span class="bl"></span><span class="bl"></span><span class="bl"></span>';
  nav.appendChild(burger);

  // Style the burger lines via a <style> tag so dark mode works too
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    /* ── Burger lines ── */
    #burgerBtn .bl {
      display: block; width: 20px; height: 2.5px;
      background: var(--primary); border-radius: 3px;
      transition: all 0.3s ease; transform-origin: center;
    }
    #burgerBtn.active .bl:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
    #burgerBtn.active .bl:nth-child(2) { opacity: 0; transform: scaleX(0); }
    #burgerBtn.active .bl:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }
    #burgerBtn:hover { background: rgba(255,75,110,0.14) !important; }
    body.dark #burgerBtn {
      background: rgba(124,131,255,0.1) !important;
      border-color: rgba(124,131,255,0.2) !important;
    }

    /* ── Mobile nav ── */
    @media (max-width: 768px) {
      #burgerBtn { display: flex !important; }

      nav {
        flex-wrap: nowrap !important;
        gap: 0 !important;
        position: relative;
      }

      /* Hide links by default */
      .nav-links {
        display: none !important;
        position: absolute !important;
        top: calc(100% + 10px) !important;
        left: 0 !important; right: 0 !important;
        flex-direction: column !important;
        gap: 2px !important;
        background: rgba(255,255,255,0.98) !important;
        backdrop-filter: blur(20px) !important;
        border: 1.5px solid var(--border) !important;
        border-radius: 18px !important;
        padding: 10px !important;
        box-shadow: 0 12px 40px rgba(255,75,110,0.12) !important;
        z-index: 999 !important;
        width: 100% !important;
      }
      body.dark .nav-links {
        background: rgba(22,22,31,0.98) !important;
        box-shadow: 0 12px 40px rgba(124,131,255,0.12) !important;
      }

      /* Show when open */
      .nav-links.open { display: flex !important; }

      nav a {
        padding: 12px 16px !important;
        font-size: 15px !important;
        border-radius: 12px !important;
        width: 100% !important;
        text-align: left !important;
      }
    }
  `;
  document.head.appendChild(styleTag);

  // ── Open / Close ──
  function openMenu() {
    navLinks.classList.add('open');
    burger.classList.add('active');
    overlay.style.display = 'block';
    requestAnimationFrame(() => overlay.style.opacity = '1');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 250);
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

})();