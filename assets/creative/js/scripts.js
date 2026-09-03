/* Native, dependency-free interactions for Defensa Penal Córdoba. */
(() => {
  const nav = document.querySelector('#mainNav');
  const navToggle = nav?.querySelector('[data-nav-toggle]');
  const navPanel = nav?.querySelector('[data-nav-panel]');
  const mobileQuery = window.matchMedia('(max-width: 1079.98px)');

  const setDropdown = (dropdown, open) => {
    const toggle = dropdown?.querySelector('[data-dropdown-toggle]');
    if (!dropdown || !toggle) return;
    dropdown.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  const closeDropdowns = (except = null) => {
    nav?.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
      if (dropdown !== except) setDropdown(dropdown, false);
    });
  };

  const setMenu = (open, returnFocus = false) => {
    if (!navToggle || !navPanel) return;
    navPanel.classList.toggle('is-open', open);
    navToggle.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open && mobileQuery.matches);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    if (!open) closeDropdowns();
    if (returnFocus) navToggle.focus();
  };

  navToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    setMenu(!navPanel?.classList.contains('is-open'));
  });

  nav?.querySelectorAll('[data-dropdown-toggle]').forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const dropdown = toggle.closest('[data-dropdown]');
      if (!dropdown) return;
      const willOpen = !dropdown.classList.contains('is-open');
      closeDropdowns(dropdown);
      setDropdown(dropdown, willOpen);
    });
  });

  navPanel?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileQuery.matches) setMenu(false);
      else closeDropdowns();
    });
  });

  document.addEventListener('click', (event) => {
    if (nav?.contains(event.target)) return;
    closeDropdowns();
    if (mobileQuery.matches) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openDropdown = nav?.querySelector('[data-dropdown].is-open');
    if (openDropdown) {
      const toggle = openDropdown.querySelector('[data-dropdown-toggle]');
      setDropdown(openDropdown, false);
      toggle?.focus();
      return;
    }
    if (navPanel?.classList.contains('is-open')) setMenu(false, true);
  });

  const resetNavigation = () => {
    setMenu(false);
    closeDropdowns();
  };

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', resetNavigation);
  } else {
    mobileQuery.addListener(resetNavigation);
  }

  const updateNavSurface = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateNavSurface();
  document.addEventListener('scroll', updateNavSurface, { passive: true });

  document.addEventListener('click', (event) => {
    const target = event.target.closest('a[data-track], a[href^="tel:"], a[href*="wa.me"]');
    if (!target) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'site_cta_click',
      cta: target.getAttribute('data-track') || target.textContent.trim(),
      href: target.href,
      page_path: window.location.pathname
    });
  });
})();
