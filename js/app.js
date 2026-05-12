// js/app.js
// if (import.meta.env?.DEV) {
//   // This line only for Vite
//   import('../partials/header.html?raw');
//   import('../partials/footer.html?raw');
// }

/**
 * @param {string} id
 * @param {string} url
 */
async function loadHTML(id, url) {
  const el = document.getElementById(id);
  if (!el) return; // <-key line

  const resp = await fetch(url);
  const text = await resp.text();
  el.innerHTML = text;

  // If we just loaded the footer, update the year
  if (id === 'footer') {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString();
    }
  }
}

async function init() {
  // 1. Load partials first
  await Promise.all([
    loadHTML('header', './partials/header.html'),
    loadHTML('footer', './partials/footer.html')
  ]);

  // 2. Only then touch the DOM
  const loader = document.getElementById('page-loader');
  const content = document.querySelector('.content');
  const videoWrapper = document.querySelector('.logo-video');
  const main = document.querySelector('main');
  const bgVideo = document.querySelector('.background-video');

  const activatePage = () => {
    content?.classList.add('animate');
    videoWrapper?.classList.add('animate');
    main?.classList.add('animate');

    if (bgVideo instanceof HTMLVideoElement) {
      bgVideo.play().catch((err) => {
        console.warn('Video playback was deferred:', err);
      });
    }
  };

  if (loader) {
    // Check loader show / not show
    if (sessionStorage.getItem('viewedLoader')) {
      // If show - remove animation
      loader.style.display = 'none';
      activatePage();
    } else {
      // If not show - add animation
      setTimeout(() => {
        loader.classList.add('hide');
        activatePage();
        sessionStorage.setItem('viewedLoader', 'true');
      }, 3000);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
