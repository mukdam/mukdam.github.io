/* ==========================================================================
   PRINCE YADAV - PORTFOLIO INTERACTIVITY, CANVAS & TERMINAL LOG SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. DYNAMIC CANVAS PARTICLE NETWORK BACKGROUND
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('canvas-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 65);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE HAMBURGER MENU TOGGLE
  // --------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. SCROLL REVEAL ANIMATIONS & ACTIVE NAV HIGHLIGHTING
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const sections = document.querySelectorAll('section');
  const menuLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    // Reveal elements on scroll
    const triggerBottom = (window.innerHeight / 5) * 4;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });

    // Active Section Navigation Highlighting
    let currentSection = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - 160 && window.scrollY < sectionTop + sectionHeight - 160) {
        currentSection = section.getAttribute('id');
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll);
  onScroll(); // Run once on load

  // --------------------------------------------------------------------------
  // 4. SPOTLIGHT MOUSE CURSOR EFFECT FOR CARDS
  // --------------------------------------------------------------------------
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

// ----------------------------------------------------------------------------
// 5. COPY TO CLIPBOARD HELPER & TOAST NOTIFICATION
// ----------------------------------------------------------------------------
function copyToClipboard(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`);
    }).catch(err => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`${label} copied to clipboard!`);
    trackAnalyticsEvent('copy_contact_info', { label: label });
  } catch (err) {
    showToast(`Failed to copy ${label}`);
  }
  document.body.removeChild(textArea);
}

function trackAnalyticsEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ----------------------------------------------------------------------------
// 6. INTERACTIVE TERMINAL TELEMETRY CONSOLE LOG HANDLER
// ----------------------------------------------------------------------------
function handleTermInput(e) {
  if (e.key === 'Enter') {
    const inputEl = document.getElementById('term-input');
    const cmd = inputEl.value.trim();
    if (cmd) {
      execTermCmd(cmd);
      inputEl.value = '';
    }
  }
}

function execTermCmd(cmd) {
  const dynamicLogs = document.getElementById('dynamic-logs');
  if (!dynamicLogs) return;

  const cleanCmd = cmd.trim().toLowerCase();

  // Print prompt entry line
  const cmdLine = document.createElement('div');
  cmdLine.className = 'log-line';
  cmdLine.innerHTML = `<span style="color: #34d399;">prince@architect:~$</span> <span style="color: #ffffff;">${escapeHtml(cmd)}</span>`;
  dynamicLogs.appendChild(cmdLine);

  const resLine = document.createElement('div');
  resLine.className = 'log-line';

  if (cleanCmd === 'clear') {
    dynamicLogs.innerHTML = '';
    return;
  } else if (cleanCmd === 'help') {
    resLine.innerHTML = `<span style="color: #38bdf8;">Available commands:</span><br>&nbsp;&bull; <b>cat contact.json</b> - Output contact info JSON<br>&nbsp;&bull; <b>status</b> - Check microservices telemetry status<br>&nbsp;&bull; <b>skills</b> - Display Python, Adobe Commerce & Cloud tech stack<br>&nbsp;&bull; <b>resume</b> - Trigger resume PDF download<br>&nbsp;&bull; <b>clear</b> - Clear terminal logs`;
  } else if (cleanCmd === 'cat contact.json' || cleanCmd === 'contact') {
    resLine.innerHTML = `<pre style="color: #a5b4fc; font-family: var(--font-mono); margin-top: 4px;">{
  "name": "Prince Yadav",
  "role": "Solution Architect",
  "email": "princemukdam@gmail.com",
  "phone": "+91-9887852003",
  "location": "Jaipur, Rajasthan, India",
  "github": "https://github.com/mukdam",
  "linkedin": "https://linkedin.com/in/prince-yadav-80001359"
}</pre>`;
  } else if (cleanCmd === 'status') {
    resLine.innerHTML = `<span style="color: #34d399;">[OK] MonitoringCarrier (Python/FastAPI): RUNNING (Port 8000)</span><br><span style="color: #34d399;">[OK] Adobe App Builder Serverless: ONLINE</span><br><span style="color: #34d399;">[OK] SAP Boomi Middleware: CONNECTED (Latency &lt; 40ms)</span><br><span style="color: #34d399;">[OK] Adobe Commerce PaaS: 39+ REGIONS ONLINE</span>`;
  } else if (cleanCmd === 'skills') {
    resLine.innerHTML = `<span style="color: #fbbf24;">[STACK] Python (FastAPI/Django) | Adobe Commerce Cloud (PaaS) | Adobe App Builder | SAP Boomi | AWS | Redis | Docker | AI Copilot</span>`;
  } else if (cleanCmd === 'resume' || cleanCmd === 'download') {
    resLine.innerHTML = `<span style="color: #34d399;">[DOWNLOAD] Initiating download for 'Prince Resume.pdf'...</span>`;
    window.location.href = 'Prince Resume.pdf';
  } else {
    resLine.innerHTML = `<span style="color: #f87171;">bash: command not found: ${escapeHtml(cmd)}. Type 'help' for options.</span>`;
  }

  dynamicLogs.appendChild(resLine);

  // Auto-scroll terminal body
  const termBody = document.getElementById('terminal-body');
  if (termBody) {
    termBody.scrollTop = termBody.scrollHeight;
  }
}

function clearTerminalLogs() {
  const dynamicLogs = document.getElementById('dynamic-logs');
  if (dynamicLogs) dynamicLogs.innerHTML = '';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}
