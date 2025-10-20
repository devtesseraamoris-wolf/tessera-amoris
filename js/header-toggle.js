document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-menu');
  if (!btn || !nav) return;

  btn.addEventListener('click', function() {
    if (nav.classList.contains('mobile-open')) {
      nav.classList.remove('mobile-open');
      nav.classList.add('mobile-collapsed');
    } else {
      nav.classList.remove('mobile-collapsed');
      nav.classList.add('mobile-open');
    }
  });
});
