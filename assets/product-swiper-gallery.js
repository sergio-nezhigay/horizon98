/**
 * Product Swiper Gallery Script
 * This script initializes Swiper.js for the product gallery
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize product gallery Swiper
  const productGallerySwipers = document.querySelectorAll(
    '.swiper-product-gallery'
  );

  if (productGallerySwipers.length > 0) {
    productGallerySwipers.forEach((swiperElement) => {
      // Check if we have more than one slide
      const slides = swiperElement.querySelectorAll('.swiper-slide');

      if (slides.length > 1) {
        const gallerySwiper = new Swiper(swiperElement, {
          // Optional parameters
          loop: true,
          speed: 500,
          slidesPerView: 1,
          spaceBetween: 10,
          grabCursor: true,

          // Navigation arrows
          navigation: {
            nextEl: swiperElement.querySelector('.swiper-button-next'),
            prevEl: swiperElement.querySelector('.swiper-button-prev'),
          },

          // Pagination
          pagination: {
            el: swiperElement.querySelector('.swiper-pagination'),
            clickable: true,
            dynamicBullets: true,
          },

          // Keyboard control for accessibility
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },

          // A11y
          a11y: {
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
          },

          // Autoplay (optional, can be removed)
          /*
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          */
        });

        // Handle variant changes to update the active slide when variant images change
        document.addEventListener('variant:change', function (event) {
          if (event.detail.variant && event.detail.variant.featured_media) {
            const variantMediaId = event.detail.variant.featured_media.id;

            // Find the slide with this media and go to it
            slides.forEach((slide, index) => {
              const slideMediaId = slide
                .querySelector('[data-media-id]')
                ?.getAttribute('data-media-id')
                ?.split('-')
                .pop();
              if (slideMediaId && slideMediaId == variantMediaId) {
                gallerySwiper.slideTo(index);
              }
            });
          }
        });
      }
    });
  }

  // When the modal opens, reinitialize Swiper if it's in the modal
  document.addEventListener('modalOpen', function (event) {
    const modalSwipers = document.querySelectorAll(
      '.product-media-modal .swiper-product-gallery'
    );
    if (modalSwipers.length > 0) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  });
});
