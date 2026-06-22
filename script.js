document.addEventListener('DOMContentLoaded', () => {
  // Scroll Animations: Reveal elements
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };
  
  // Initial run and bind to scroll
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let currentSectionId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // Spotlight Effect for Cards
  const cards = document.querySelectorAll('.card, .skill-category');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});
