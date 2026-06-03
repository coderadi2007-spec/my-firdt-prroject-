new Swiper('.testimonial-swiper', {
  loop: true,
  autoplay: { delay: 3000 },
  pagination: { el: '.swiper-pagination', clickable: true },
  slidesPerView: 1,
  breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});