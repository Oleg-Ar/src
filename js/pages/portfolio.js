// ─── Scroll Progress Bar ──────────────────────────────────────────────────────

function initScrollBar() {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / height;

        bar.style.transform = `scaleX(${progress})`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ─── Gallery & Lightbox ───────────────────────────────────────────────────────

function initGallery() {
  const grid = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (!grid || !lightbox || !lightboxImg) {
    console.error(
      'One of these elements was not found: gallery, lightbox, or lightbox-img.'
    );
    return;
  }

  fetch('data/images.json')
    .then((response) => response.json())
    .then((images) => {
      images.forEach(
        /** @param {string} fileName */
        (fileName) => {
          const link = document.createElement('div');
          link.classList.add('loading'); // Сразу вешаем класс анимации
          link.innerHTML = `
                <img src="assets/images/${fileName}" alt = "Picture ${fileName}" class="image" loading = "lazy" >
                    `;
          const img = link.querySelector('.image');

          if (img instanceof HTMLImageElement) {
            // For downloaded images
            img.onload = () => {
              img.classList.add('loaded');
              link.classList.remove('loading');
              link.classList.add('is-loaded');
            };

            // For images from cash
            if (img.complete) {
              img.classList.add('loaded');
              link.classList.remove('loading');
              link.classList.add('is-loaded');
            }
          }

          link.addEventListener('click', () => {
            if (lightboxImg instanceof HTMLImageElement) {
              lightboxImg.src = `assets/images/${fileName}`;
              lightboxImg.alt = `Full size picture ${fileName}`;
              lightbox.classList.add('active');
            }
          });

          grid.appendChild(link);
        }
      );
    })
    .catch((error) => console.error('Error loading JSON:', error));

  // close when clicking outside image
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  // prevent close  image  by  click
  // lightboxImg.addEventListener('click', (e) => {
  //     e.stopPropagation();
  // });

  // close with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
}
// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initScrollBar();
  initGallery();
});
