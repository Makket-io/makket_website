// ============================================================================
// MAKKET Website - Complete JavaScript File
// Handles all interactions, animations, and form submissions
// ============================================================================

// ============================================================================
// 1. HEADER SCROLL EFFECT
// ============================================================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================================================
// 2. MOBILE MENU TOGGLE
// ============================================================================
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = document.querySelectorAll('#mobileMenu a');

mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  // Hamburger to X animation handled by CSS .open state
  const spans = mobileToggle.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
});

// Close menu when any menu link is clicked
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// ============================================================================
// 3. SCROLL REVEAL - IntersectionObserver
// ============================================================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once revealed (optional, remove if re-triggers needed)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '-50px'
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ============================================================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================================
const headerHeight = header.offsetHeight;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Only prevent default for internal section links
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================================================
// 5. ROLE TOGGLE (HERO SECTION)
// ============================================================================
const roleToggle = document.getElementById('roleToggle');
const roleButtons = roleToggle ? roleToggle.querySelectorAll('.role-btn') : [];
let selectedRole = localStorage.getItem('selectedRole') || 'buyer';

if (roleToggle) {
  roleButtons.forEach(btn => {
    if (btn.dataset.role === selectedRole) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = btn.dataset.role;
      localStorage.setItem('selectedRole', selectedRole);
    });
  });
}

// ============================================================================
// 6. ROLE TOGGLE (CTA SECTION)
// ============================================================================
const ctaRoleToggle = document.getElementById('ctaRoleToggle');
const ctaRoleButtons = ctaRoleToggle ? ctaRoleToggle.querySelectorAll('.cta-role') : [];
let selectedCtaRole = localStorage.getItem('selectedCtaRole') || 'buyer';

if (ctaRoleToggle) {
  ctaRoleButtons.forEach(btn => {
    if (btn.dataset.role === selectedCtaRole) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      ctaRoleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCtaRole = btn.dataset.role;
      localStorage.setItem('selectedCtaRole', selectedCtaRole);
    });
  });
}

// ============================================================================
// 7. TOAST NOTIFICATION SYSTEM
// ============================================================================
const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message = 'Success!') {
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// ============================================================================
// 8. FORM SUBMISSION - HERO FORM
// ============================================================================
const heroForm = document.getElementById('heroForm');

if (heroForm) {
  heroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('heroEmail')?.value.trim();
    const phone = document.getElementById('heroPhone')?.value.trim();
    const city = document.getElementById('heroCity')?.value.trim();

    // Validate email (required)
    if (!email || !isValidEmail(email)) {
      showToast('Please enter a valid email address');
      return;
    }

    // Collect data
    const formData = {
      email,
      phone,
      city,
      role: selectedRole,
      timestamp: new Date().toISOString()
    };

    // Log to console
    console.log('Hero Form Submission:', formData);

    // Show success toast
    showToast('Welcome to MAKKET! Check your email.');

    // Reset form
    heroForm.reset();
  });
}

// ============================================================================
// 9. FORM SUBMISSION - CTA FORM
// ============================================================================
const ctaForm = document.getElementById('ctaForm');

if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('ctaEmail')?.value.trim();
    const phone = document.getElementById('ctaPhone')?.value.trim();
    const city = document.getElementById('ctaCity')?.value.trim();

    // Validate email (required)
    if (!email || !isValidEmail(email)) {
      showToast('Please enter a valid email address');
      return;
    }

    // Collect data
    const formData = {
      email,
      phone,
      city,
      role: selectedCtaRole,
      timestamp: new Date().toISOString()
    };

    // Log to console
    console.log('CTA Form Submission:', formData);

    // Show success toast
    showToast('Thanks for joining! We\'ll be in touch soon.');

    // Reset form
    ctaForm.reset();
  });
}

// ============================================================================
// 10. EMAIL VALIDATION HELPER
// ============================================================================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================================================
// 11. COUNTER ANIMATION
// ============================================================================
const statNumbers = document.querySelectorAll('.hero-stat .number');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach(num => counterObserver.observe(num));

function animateCounter(element) {
  const target = parseInt(element.dataset.count, 10);
  const duration = 1500; // 1.5 seconds
  const startTime = Date.now();
  const suffix = target >= 100 ? '+' : '';

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();
}

// ============================================================================
// 12. ACTIVE NAV HIGHLIGHTING ON SCROLL
// ============================================================================
const navLinks = document.querySelectorAll('#navLinks a');
const sections = document.querySelectorAll(
  '#hero, #problems, #how-it-works, #features, #categories, #trending, #trust, #for-sellers, #testimonials, #waitlist'
);

function highlightNav() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);
highlightNav(); // Initial call

// ============================================================================
// 13. PARALLAX FLOATING CARDS
// ============================================================================
const floatCards = document.querySelectorAll('.hero-float-card');

if (floatCards.length > 0) {
  window.addEventListener('scroll', () => {
    floatCards.forEach((card, index) => {
      const speed = 0.3 + (index * 0.1); // Different speed per card
      const yOffset = window.scrollY * speed;
      card.style.transform = `translateY(${yOffset}px)`;
    });
  });
}

// ============================================================================
// 14. STAGGERED REVEALS FOR GRID ITEMS
// ============================================================================
const gridItems = document.querySelectorAll(
  '.feature-card, .category-card, .seller-benefit, .trending-chip'
);

gridItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.05}s`;
});

// ============================================================================
// 15. PHONE MOCKUP SUBTLE ANIMATION
// ============================================================================
// Gentle float animation handled by CSS animation
// This JS section is for any dynamic adjustments if needed
const phoneMockup = document.querySelector('.hero-phone');

if (phoneMockup) {
  // Optional: Add subtle mouse-following animation
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 10 - 5;
    const mouseY = (e.clientY / window.innerHeight) * 10 - 5;
    phoneMockup.style.transform = `translateY(${mouseY * 0.5}px) translateX(${mouseX * 0.3}px)`;
  });
}

// ============================================================================
// INITIALIZATION COMPLETE
// ============================================================================
console.log('MAKKET website initialized successfully');
