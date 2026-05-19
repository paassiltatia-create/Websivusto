// Reusable slideshow image popup for pages that use .slideshow/.slide/.slide img
// Usage: add <script src="slideshow-popup.js"></script> after the slideshow markup (or at end of body)

(function () {
  function setupForSlideshow(slideshowEl) {
    if (!slideshowEl) return;

    const activeSlide = () => slideshowEl.querySelector('.slide.active') || slideshowEl.querySelector('.slide');

    // Open popup on click
    slideshowEl.addEventListener('click', (e) => {
      const img = e.target && e.target.closest ? e.target.closest('img') : null;
      if (!img) return;

      // Prevent click when clicking slideshow controls
      if (e.target.closest && e.target.closest('.slide-btn')) return;

      const src = img.getAttribute('src');
      if (!src) return;

      const alt = img.getAttribute('alt') || '';

      // Build modal once per opening
      let popup = document.getElementById('image-popup');
      if (!popup) {
        popup = document.createElement('div');
        popup.id = 'image-popup';
        popup.className = 'popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'true');
        popup.innerHTML = `
          <div class="popup-content image-popup-content" role="document">
            <span class="close image-popup-close">&times;</span>
            <button type="button" class="image-popup-nav image-popup-prev" aria-label="Previous image">&#10094;</button>
            <button type="button" class="image-popup-nav image-popup-next" aria-label="Next image">&#10095;</button>
            <img id="image-popup-img" alt="" />
            <h3 id="image-popup-title" class="image-popup-title"></h3>
          </div>
        `;
        document.body.appendChild(popup);
      }

      const imgEl = document.getElementById('image-popup-img');
      const titleEl = document.getElementById('image-popup-title');

      imgEl.src = src;
      imgEl.alt = alt;
      titleEl.textContent = alt;

      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      const closeBtn = popup.querySelector('.image-popup-close');
      if (closeBtn) closeBtn.focus();

      // Ensure close/keyboard handlers exist
      if (!popup.dataset.handlersBound) {
        popup.addEventListener('click', (evt) => {
          if (evt.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = '';
          }
        });

        popup.querySelectorAll('.image-popup-close, .close').forEach((btn) => {
          btn.addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = '';
          });
        });

        const prevBtnPopup = popup.querySelector('.image-popup-prev');
        const nextBtnPopup = popup.querySelector('.image-popup-next');

        function getAllImages() {
          // Collect slide images in order
          const imgs = Array.from(slideshowEl.querySelectorAll('.slide img'));
          return imgs.filter((x) => x && x.getAttribute('src'));
        }

        function indexOfCurrent() {
          const currentSrc = imgEl.getAttribute('src');
          const imgs = getAllImages();
          return imgs.findIndex((im) => im.getAttribute('src') === currentSrc);
        }

        function showByIndex(idx) {
          const imgs = getAllImages();
          if (!imgs.length) return;
          const safe = (idx + imgs.length) % imgs.length;
          const im = imgs[safe];
          const srcNow = im.getAttribute('src');
          const altNow = im.getAttribute('alt') || '';
          imgEl.src = srcNow;
          imgEl.alt = altNow;
          titleEl.textContent = altNow;
        }

        function prevImage() {
          const idx = indexOfCurrent();
          showByIndex(idx - 1);
        }

        function nextImage() {
          const idx = indexOfCurrent();
          showByIndex(idx + 1);
        }

        if (prevBtnPopup) prevBtnPopup.addEventListener('click', prevImage);
        if (nextBtnPopup) nextBtnPopup.addEventListener('click', nextImage);

        document.addEventListener('keydown', (keyEvt) => {
          if (popup.style.display !== 'flex') return;
          if (keyEvt.key === 'Escape') {
            popup.style.display = 'none';
            document.body.style.overflow = '';
          }
          if (keyEvt.key === 'ArrowLeft') {
            prevImage();
          }
          if (keyEvt.key === 'ArrowRight') {
            nextImage();
          }
        });

        popup.dataset.handlersBound = '1';
      }
    });
  }

  function bindAll() {
    document.querySelectorAll('.slideshow').forEach(setupForSlideshow);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAll);
  } else {
    bindAll();
  }
})();

