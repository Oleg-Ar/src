// Function to initialize navbar JS
function initNavbar() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  // Safety check:
  // If header hasn't loaded or elements don't exist, stop here
  if (!toggle || !menu) return;

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    const isOpened = toggle.getAttribute('aria-expanded');
    if (isOpened === 'false') {
      toggle.setAttribute('aria-expanded', 'true');
    } else {
      toggle.setAttribute('aria-expanded', 'false');
    }
    menu.classList.toggle('active');
  });
}

// Highlights the current page link in the navbar
function setActiveNavLink() {
  const links = document.querySelectorAll('.nav-menu a');

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.parentElement?.classList.add('active');
    }
  });
}

// Load header async then init navbar
async function loadHeader() {
  const resp = await fetch('/partials/header.html');
  const text = await resp.text();
  const headerContainer = document.getElementById('header');

  if (headerContainer) {
    headerContainer.innerHTML = text;
    initNavbar(); // Initialize after header exists
    setActiveNavLink(); // Highlight the active navigation link
  } else {
    console.error('Container #header was not found.');
  }
}

// Run everything only after the page DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);
