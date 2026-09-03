/* Lightweight site interactions — no Bootstrap JS dependency */
(() => {
  const mainNav = document.querySelector('#mainNav');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('#navbarResponsive');

  const navbarShrink = () => {
    if (!mainNav) return;
    const forceShrink = document.body.classList.contains('page-internal');
    mainNav.classList.toggle('navbar-shrink', forceShrink || window.scrollY > 0);
  };

  const closeDropdowns = (except = null) => {
    document.querySelectorAll('#mainNav .dropdown').forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('show');
      const menu = dropdown.querySelector('.dropdown-menu');
      const toggle = dropdown.querySelector('.dropdown-toggle');
      menu?.classList.remove('show');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  };

  const closeMenu = () => {
    if (!navbarMenu || !navbarToggler) return;
    navbarMenu.classList.remove('show');
    navbarToggler.setAttribute('aria-expanded', 'false');
    closeDropdowns();
  };

  navbarToggler?.addEventListener('click', () => {
    if (!navbarMenu) return;
    const isOpen = navbarMenu.classList.toggle('show');
    navbarToggler.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('#mainNav .dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const dropdown = toggle.closest('.dropdown');
      const menu = dropdown?.querySelector('.dropdown-menu');
      if (!dropdown || !menu) return;
      const willOpen = !menu.classList.contains('show');
      closeDropdowns(dropdown);
      dropdown.classList.toggle('show', willOpen);
      menu.classList.toggle('show', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('#mainNav .dropdown')) closeDropdowns();
  });

  document.querySelectorAll('#navbarResponsive a:not(.dropdown-toggle)').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.querySelectorAll('.accordion-button[data-bs-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const selector = button.getAttribute('data-bs-target');
      if (!selector || !selector.startsWith('#')) return;
      const panel = document.querySelector(selector);
      if (!panel) return;
      const accordionSelector = panel.getAttribute('data-bs-parent');
      const willOpen = !panel.classList.contains('show');

      if (willOpen && accordionSelector) {
        const accordion = document.querySelector(accordionSelector);
        accordion?.querySelectorAll('.accordion-collapse.show').forEach((openPanel) => {
          if (openPanel === panel) return;
          openPanel.classList.remove('show');
          const openButton = accordion.querySelector(`[data-bs-target="#${openPanel.id}"]`);
          openButton?.classList.add('collapsed');
          openButton?.setAttribute('aria-expanded', 'false');
        });
      }

      panel.classList.toggle('show', willOpen);
      button.classList.toggle('collapsed', !willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });

  navbarShrink();
  document.addEventListener('scroll', navbarShrink, { passive: true });
})();
