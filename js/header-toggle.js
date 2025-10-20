document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleButton || !navMenu) return;

  if (!navMenu.id) {
    navMenu.id = 'primary-navigation';
  }

  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-controls', navMenu.id);
  toggleButton.setAttribute('aria-label', 'Open navigation menu');

  const collapseNav = () => {
    navMenu.classList.remove('expanded');
    navMenu.classList.add('collapsed');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('nav-open');
  };

  const expandNav = () => {
    navMenu.classList.remove('collapsed');
    navMenu.classList.add('expanded');
    toggleButton.setAttribute('aria-expanded', 'true');
    toggleButton.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('nav-open');
  };

  const syncState = () => {
    if (window.innerWidth >= 900) {
      navMenu.classList.remove('collapsed', 'expanded');
      toggleButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    } else if (navMenu.classList.contains('expanded')) {
      expandNav();
    } else {
      collapseNav();
    }
  };

  syncState();

  toggleButton.addEventListener('click', () => {
    if (navMenu.classList.contains('expanded')) {
      collapseNav();
    } else {
      expandNav();
    }
  });

  window.addEventListener('resize', () => {
    window.requestAnimationFrame(syncState);
  });

  window.addEventListener('orientationchange', syncState);

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('expanded')) {
      collapseNav();
      toggleButton.focus();
    }
  });
});
