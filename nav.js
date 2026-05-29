// nav.js — simple nav, no hamburger
(function () {
  var nav      = document.querySelector('nav');
  var navLinks = document.querySelector('.nav-links');
  if (!nav || !navLinks) return;

  // Move dark-toggle out of nav-links (keeps it beside the logo row)
  var darkBtn = navLinks.querySelector('.dark-toggle');
  if (darkBtn) {
    navLinks.removeChild(darkBtn);
    nav.appendChild(darkBtn);
  }
})();