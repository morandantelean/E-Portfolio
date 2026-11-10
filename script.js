/**
 * LEAN MORANDANTE — PORTFOLIO JAVASCRIPT
 * Front-End Web Developer & Cum Laude IT Graduate
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initAnnouncement();
  initSpeedSimulator();
  initViewportSwitcher();
  initJsMiniApp();
  initModalKeybindings();
  initHeroCanvas();
  initCertFilters();
  initResumeTabs();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('lean_portfolio_theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlElement.setAttribute('data-theme', 'light');
  } else {
    htmlElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('lean_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Dynamic Typing Text Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'Front-End Web Developer',
    'Cum Laude IT Graduate',
    'Speed & Performance Specialist (+30%)',
    'Responsive UI/UX Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 2200;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Navbar Active Link & Scroll Spy
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileBtn || !mobileDrawer) return;

  mobileBtn.addEventListener('click', () => {
    const isOpen = mobileBtn.classList.toggle('open');
    mobileDrawer.classList.toggle('open', isOpen);
    mobileBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileBtn.classList.remove('open');
      mobileDrawer.classList.remove('open');
      mobileBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   5. Announcement Bar Dismissal
   -------------------------------------------------------------------------- */
function initAnnouncement() {
  const closeBtn = document.getElementById('closeAnnouncement');
  const bar = document.getElementById('announcementBar');
  if (closeBtn && bar) {
    closeBtn.addEventListener('click', () => {
      bar.style.display = 'none';
    });
  }
}

/* --------------------------------------------------------------------------
   6. Speed Optimizer Simulator (Project 1)
   -------------------------------------------------------------------------- */
function initSpeedSimulator() {
  const btnBefore = document.getElementById('btnBeforeOpt');
  const btnAfter = document.getElementById('btnAfterOpt');
  if (!btnBefore || !btnAfter) return;

  const scoreCircle = document.getElementById('scoreCircle');
  const scoreValue = document.getElementById('scoreValue');
  const scoreStatus = document.getElementById('scoreStatus');

  const barLoadTime = document.getElementById('barLoadTime');
  const valLoadTime = document.getElementById('valLoadTime');

  const barFCP = document.getElementById('barFCP');
  const valFCP = document.getElementById('valFCP');

  const barLCP = document.getElementById('barLCP');
  const valLCP = document.getElementById('valLCP');

  const barPayload = document.getElementById('barPayload');
  const valPayload = document.getElementById('valPayload');

  const simChecklist = document.getElementById('simChecklist');

  btnBefore.addEventListener('click', () => {
    btnBefore.classList.add('active');
    btnAfter.classList.remove('active');

    // Before state (Unoptimized)
    scoreCircle.classList.add('bad');
    scoreValue.textContent = '54';
    scoreStatus.textContent = 'Performance: Poor (Slow)';
    scoreStatus.classList.add('bad');

    barLoadTime.className = 'sim-bar-fill fill-red';
    barLoadTime.style.width = '85%';
    valLoadTime.textContent = '2.80s (Unoptimized)';

    barFCP.className = 'sim-bar-fill fill-red';
    barFCP.style.width = '75%';
    valFCP.textContent = '2.1s (Render-blocked)';

    barLCP.className = 'sim-bar-fill fill-red';
    barLCP.style.width = '82%';
    valLCP.textContent = '3.4s (Slow hero image)';

    barPayload.className = 'sim-bar-fill fill-red';
    barPayload.style.width = '90%';
    valPayload.textContent = '1.80 MB (Uncompressed)';

    simChecklist.innerHTML = `
      <div class="check-item uncheck">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Blocking CSS &amp; JS delays first meaningful paint</span>
      </div>
      <div class="check-item uncheck">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Uncompressed high-res PNG/JPEG images loaded upfront</span>
      </div>
      <div class="check-item uncheck">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Unminified scripts with redundant CSS declarations</span>
      </div>
      <div class="check-item uncheck">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span>Cumulative Layout Shift causes visual jumpiness</span>
      </div>
    `;
  });

  btnAfter.addEventListener('click', () => {
    btnAfter.classList.add('active');
    btnBefore.classList.remove('active');

    // After state (Optimized by Lean)
    scoreCircle.classList.remove('bad');
    scoreValue.textContent = '98';
    scoreStatus.textContent = 'Performance: Excellent (Lean\'s Work)';
    scoreStatus.classList.remove('bad');

    barLoadTime.className = 'sim-bar-fill fill-green';
    barLoadTime.style.width = '25%';
    valLoadTime.textContent = '0.85s (30%+ faster)';

    barFCP.className = 'sim-bar-fill fill-green';
    barFCP.style.width = '20%';
    valFCP.textContent = '0.4s (Instant)';

    barLCP.className = 'sim-bar-fill fill-green';
    barLCP.style.width = '30%';
    valLCP.textContent = '0.9s (Fast)';

    barPayload.className = 'sim-bar-fill fill-green';
    barPayload.style.width = '28%';
    valPayload.textContent = '380 KB (-79% payload)';

    simChecklist.innerHTML = `
      <div class="check-item checked">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Critical CSS extracted inline; unblocking initial render</span>
      </div>
      <div class="check-item checked">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Modern image formats (WebP/AVIF) with native lazy-loading</span>
      </div>
      <div class="check-item checked">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Minified HTML, CSS &amp; JavaScript payloads</span>
      </div>
      <div class="check-item checked">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Eliminated layout shifts (CLS &lt; 0.01)</span>
      </div>
    `;
  });
}

/* --------------------------------------------------------------------------
   7. Viewport Switcher (Project 2)
   -------------------------------------------------------------------------- */
function initViewportSwitcher() {
  const vpBtns = document.querySelectorAll('.vp-btn');
  const previewFrame = document.getElementById('viewportPreview');
  if (!previewFrame || !vpBtns.length) return;

  vpBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      vpBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const vpMode = btn.getAttribute('data-vp');
      previewFrame.className = 'viewport-preview-frame';

      if (vpMode === 'desktop') {
        previewFrame.classList.add('desktop-mode');
      } else if (vpMode === 'tablet') {
        previewFrame.classList.add('tablet-mode');
      } else if (vpMode === 'mobile') {
        previewFrame.classList.add('mobile-mode');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. JavaScript Algorithmic Tool & Live Search Filter (Project 3)
   -------------------------------------------------------------------------- */
function initJsMiniApp() {
  const container = document.getElementById('jsResultsGrid');
  const searchInput = document.getElementById('toolSearchInput');
  const chips = document.querySelectorAll('#filterChips .chip');
  if (!container || !searchInput) return;

  const dataset = [
    {
      id: 1,
      title: 'Responsive Client Corporate Portal',
      category: 'client',
      tech: 'HTML5, CSS Grid, Vanilla JS',
      desc: 'Delivered for Local IT Solutions Co. with cross-browser responsive layouts and interactive contact tools.',
      metric: '30% Page Speed Boost',
      date: '2025'
    },
    {
      id: 2,
      title: 'SaaS Marketing & Landing Page Suite',
      category: 'client',
      tech: 'HTML5, CSS3, Flexbox, Mobile-First',
      desc: 'Converted high-fidelity Figma mockups into fluid, high-converting landing pages for Caraga businesses.',
      metric: '100% Mobile Responsive',
      date: '2024'
    },
    {
      id: 3,
      title: 'Internal Ops & Employee Dashboard',
      category: 'internal',
      tech: 'Vanilla JavaScript, DOM API, CSS',
      desc: 'Built internal web tool for Surigao Bay IT Services to streamline daily client onboarding and logs.',
      metric: 'Zero-Framework Lightweight',
      date: '2024'
    },
    {
      id: 4,
      title: 'Core Web Vitals Audit & Asset Optimizer',
      category: 'performance',
      tech: 'Lighthouse, Critical CSS, WebP',
      desc: 'Systematic performance pipeline eliminating render blocking scripts, optimizing DOM, and lazy loading.',
      metric: 'Lighthouse 98 Score',
      date: '2025'
    },
    {
      id: 5,
      title: 'Dynamic Data Filter & Algorithmic Search',
      category: 'internal',
      tech: 'JavaScript ES6+, Regex, Array Methods',
      desc: 'Real-time client-side algorithmic filter implementing freeCodeCamp algorithms & data structures curriculum.',
      metric: 'Instant Client-Side Filtering',
      date: '2024'
    }
  ];

  let currentCategory = 'all';
  let searchQuery = '';

  function render() {
    const filtered = dataset.filter((item) => {
      const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.tech.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.metric.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
          <p>No project records found matching "<strong>${escapeHtml(searchQuery)}</strong>".</p>
          <button class="btn btn-sm btn-outline" style="margin-top: 1rem;" onclick="resetToolSearch()">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((item) => `
      <div class="js-item-card">
        <h4 class="js-item-title">${escapeHtml(item.title)}</h4>
        <p class="js-item-desc">${escapeHtml(item.desc)}</p>
        <div class="js-item-footer">
          <span>🏷️ ${escapeHtml(item.tech)}</span>
          <strong style="color: var(--accent-tertiary);">${escapeHtml(item.metric)}</strong>
        </div>
      </div>
    `).join('');
  }

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    render();
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-filter');
      render();
    });
  });

  window.resetToolSearch = function () {
    searchQuery = '';
    currentCategory = 'all';
    searchInput.value = '';
    chips.forEach((c) => c.classList.remove('active'));
    chips[0].classList.add('active');
    render();
  };

  render();
}

/* --------------------------------------------------------------------------
   9. Certificate Lightbox Modal
   -------------------------------------------------------------------------- */
function openCertModal(imageSrc, title, issuer, certId, issueDate, description) {
  const modal = document.getElementById('certModal');
  const img = document.getElementById('certModalImg');
  const titleEl = document.getElementById('certModalTitle');
  const issuerEl = document.getElementById('certModalIssuer');
  const idEl = document.getElementById('certModalId');
  const dateEl = document.getElementById('certModalDate');
  const descEl = document.getElementById('certModalDesc');
  const downloadLink = document.getElementById('certModalDownload');

  if (!modal) return;

  img.src = imageSrc;
  img.alt = `${title} Certificate - Lean Morandante`;
  titleEl.textContent = title;
  issuerEl.textContent = `${issuer} Certified`;
  idEl.textContent = certId;
  dateEl.textContent = issueDate;
  descEl.textContent = description;
  downloadLink.href = imageSrc;
  downloadLink.setAttribute('download', `Lean_Morandante_${title.replace(/\s+/g, '_')}_Certificate.jpg`);

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   10. PDF Resume Modal
   -------------------------------------------------------------------------- */
function openPdfModal() {
  const modal = document.getElementById('pdfModal');
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   11. Cover Letter Modal
   -------------------------------------------------------------------------- */
function openCoverLetterModal() {
  const modal = document.getElementById('coverLetterModal');
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCoverLetterModal() {
  const modal = document.getElementById('coverLetterModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   12. Modal Keybindings & Backdrop Click
   -------------------------------------------------------------------------- */
function initModalKeybindings() {
  const modals = [
    document.getElementById('certModal'),
    document.getElementById('pdfModal'),
    document.getElementById('coverLetterModal')
  ];

  modals.forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCertModal();
      closePdfModal();
      closeCoverLetterModal();
    }
  });
}

/* --------------------------------------------------------------------------
   13. Copy Email to Clipboard with Fallback
   -------------------------------------------------------------------------- */
function copyEmail() {
  const email = 'morandantelean@gmail.com';

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email)
      .then(() => {
        showToast('✓ Email copied: morandantelean@gmail.com');
      })
      .catch(() => {
        fallbackCopyText(email);
      });
  } else {
    fallbackCopyText(email);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('✓ Email copied: morandantelean@gmail.com');
  } catch (err) {
    showToast('Please copy: morandantelean@gmail.com');
  }
  document.body.removeChild(textArea);
}

/* --------------------------------------------------------------------------
   14. Toast Notification
   -------------------------------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

/* --------------------------------------------------------------------------
   15. Contact Form Handler
   -------------------------------------------------------------------------- */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('senderSubject').value.trim();
  const message = document.getElementById('senderMessage').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill out all required fields.');
    return;
  }

  // Compose mailto link with encoded parameters
  const mailtoUrl = `mailto:morandantelean@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(`Hi Lean,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`)}`;

  showToast(`Preparing email from ${name}...`);

  setTimeout(() => {
    window.location.href = mailtoUrl;
    showToast('Email client opened! Thank you for reaching out.');
    document.getElementById('contactForm').reset();
  }, 800);
}

/* Helper to escape HTML characters */
function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

// Export functions to global window for inline HTML onclick handlers
window.openCertModal = openCertModal;
window.closeCertModal = closeCertModal;
window.openPdfModal = openPdfModal;
window.closePdfModal = closePdfModal;
window.openCoverLetterModal = openCoverLetterModal;
window.closeCoverLetterModal = closeCoverLetterModal;
window.copyEmail = copyEmail;
window.showToast = showToast;
window.handleFormSubmit = handleFormSubmit;


/* --------------------------------------------------------------------------
   16. Interactive Hero Constellation Canvas
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 120;
  let mouse = { x: null, y: null };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.x -= (dx / dist) * 0.8;
          this.y -= (dy / dist) * 0.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   17. Certificate Category Filters
   -------------------------------------------------------------------------- */
function initCertFilters() {
  const chips = document.querySelectorAll('#certFilterChips .cert-chip');
  const cards = document.querySelectorAll('#certGrid .cert-card');
  if (!chips.length || !cards.length) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-cert-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-cert-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInPane 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   18. In-Page Resume View Switcher Tabs
   -------------------------------------------------------------------------- */
function initResumeTabs() {
  const tabBtns = document.querySelectorAll('#resumeTabsNav .res-tab-btn');
  const panes = document.querySelectorAll('.resume-tab-pane');
  if (!tabBtns.length || !panes.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      panes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-res-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   19. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.glass-card, .timeline-item, .metric-card');
  if (!('IntersectionObserver' in window)) return;

  elements.forEach((el) => {
    el.classList.add('reveal-on-scroll');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => observer.observe(el));
}
