gsap.registerPlugin(ScrollTrigger);

// Split Text Animation
document.querySelectorAll('.split-text').forEach(el => {
  const text = el.innerText;
  el.innerHTML = text.split('').map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
  gsap.fromTo(el.querySelectorAll('.char'), 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.03, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 80%' } }
  );
});

// Parallax effect
gsap.to('.hero-bg-video', {
  scale: 1.1,
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// Floating Icons Animation
gsap.to('.floating-tech-icons i', {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  stagger: 0.2,
  ease: 'power1.inOut'
});