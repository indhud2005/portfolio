/**
 * B. INDHUJA - DEVELOPER PORTFOLIO SCRIPT
 * Vanilla ES6 JavaScript (No Build Step Required)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all portfolio modules
  initThemeToggle();
  initScrollProgress();
  initMobileNavigation();
  initScrollSpy();
  initTypewriter();
  initRecruiterStats();
  initTerminalTyping();
  initSkillBars();
  initProjects();
  initCertifications();
  initContactForm();
  initScrollAnimations();
});

/* ==========================================================================
   1. THEME TOGGLE (Dark / Light with LocalStorage Memory)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to dark aesthetic
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggleBtn.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    themeToggleBtn.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
  });
}

/* ==========================================================================
   2. TOP SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   3. MOBILE NAVIGATION (HAMBURGER & ACCESSIBILITY)
   ========================================================================== */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  if (!hamburgerBtn || !navLinks) return;

  function toggleMenu() {
    const isOpen = hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  // Close mobile drawer when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('mobile-open')) {
        toggleMenu();
      }
    });
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
      toggleMenu();
    }
  });
}

/* ==========================================================================
   4. SCROLLSPY (Highlight Active Nav Link)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   5. HERO TYPEWRITER ANIMATION
   ========================================================================== */
function initTypewriter() {
  const typewriterText = document.getElementById('typewriter-text');
  if (!typewriterText) return;

  const roles = [
    'Software Engineer',
    'Web Developer',
    'Java & Python Developer',
    'AI Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 85;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   6. RECRUITER DASHBOARD ANIMATED COUNTERS
   ========================================================================== */
function initRecruiterStats() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1800;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = `${target}${suffix}`;
            clearInterval(timer);
          } else {
            counter.textContent = `${Math.floor(current)}${suffix}`;
          }
        }, stepTime);
      });
    }
  }, { threshold: 0.3 });

  const statsContainer = document.getElementById('recruiter-stats');
  if (statsContainer) observer.observe(statsContainer);
}

/* ==========================================================================
   7. ABOUT ME TERMINAL TYPEWRITER
   ========================================================================== */
function initTerminalTyping() {
  const termCommand = document.getElementById('term-cmd-text');
  const termOutput = document.getElementById('term-output-body');
  const termSection = document.getElementById('about');

  if (!termCommand || !termOutput || !termSection) return;

  let hasExecuted = false;
  const commandToType = 'cat bio.txt';

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasExecuted) {
      hasExecuted = true;
      let i = 0;
      termCommand.textContent = '';
      
      const typeCmd = setInterval(() => {
        if (i < commandToType.length) {
          termCommand.textContent += commandToType.charAt(i);
          i++;
        } else {
          clearInterval(typeCmd);
          // Reveal terminal output after command finishes typing
          setTimeout(() => {
            termOutput.style.display = 'flex';
            termOutput.style.opacity = '0';
            let op = 0;
            const fadeIn = setInterval(() => {
              if (op >= 1) {
                clearInterval(fadeIn);
              }
              termOutput.style.opacity = op;
              op += 0.1;
            }, 30);
          }, 350);
        }
      }, 70);
    }
  }, { threshold: 0.35 });

  observer.observe(termSection);
}

/* ==========================================================================
   8. SKILL BARS VIEWPORT ANIMATION
   ========================================================================== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.getAttribute('data-level');
        fill.style.width = level;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   9. PROJECTS SHOWCASE (ARRAY DEFINITION & DYNAMIC FILTERING)
   ========================================================================== */
/**
 * Projects Master Array:
 * Easily edit, add, or remove projects by updating this object list!
 * If liveUrl is empty (""), the "Live Demo" button is automatically omitted.
 */
const projectsData = [
  {
    title: "LastBite - The Last Bite Deals",
    category: "Web Dev",
    description: "A smart, AI-driven surplus food redistribution platform that acts as a real-time bridge between food service establishments (restaurants, caterers) and recipient organizations (NGOs, shelters, orphanages). It uses predictive analytics to forecast surplus food and a smart matching engine to pair donations with the nearest, most suitable recipients, so perishable food is collected quickly. It also provides actionable analytics that help businesses prevent food waste at the source.",
    tags: ["Web Development", "AI", "Predictive Analytics"],   // TODO: add your actual tech stack
    image: "assets/projects/lastbite.png",
    projectUrl: "https://indhud2005.github.io/YOUR-LASTBITE-REPO",   // TODO: live project link
    githubUrl: "https://github.com/indhud2005/YOUR-LASTBITE-REPO"    // TODO: repo link
  },
  {
    title: "Intelligent Email Classification & Sentiment Analysis (Mail Sorting)",
    category: "AI",
    description: "A Machine Learning and NLP based system that automates email management. It performs NLP preprocessing (tokenization, stop-word removal, vectorization) and classifies emails into Work, Social, Promotions and Spam using Multinomial Naive Bayes and SVM. It also uses VADER to detect positive, negative or neutral sentiment, then generates a dynamic priority score shown on an interactive Streamlit dashboard so users can quickly address critical communications.",
    tags: ["Python", "Scikit-Learn", "Naive Bayes", "SVM", "NLTK", "VADER", "Streamlit"],
    image: "assets/projects/mail-sorting.png",
    projectUrl: "https://YOUR-APP.streamlit.app",                   // TODO: Streamlit app link
    githubUrl: "https://github.com/indhud2005/YOUR-MAIL-REPO"       // TODO: repo link
  },
  {
    title: "CampusEvent - College Event Ticket Booking System",
    category: "Web Dev",
    description: "A full-stack web application that streamlines booking and management of internal college events such as tech fests, workshops and cultural events. Students can browse upcoming events, view real-time seat availability and book tickets securely. The Spring Boot backend exposes RESTful APIs, handles concurrent booking requests, prevents double-booking and manages event capacities, while the H2 in-memory database keeps data retrieval fast and deployment simple.",
    tags: ["Java", "Spring Boot", "REST APIs", "H2 Database"],
    image: "assets/projects/campusevent.png",
    projectUrl: "https://YOUR-CAMPUSEVENT-LINK",                    // TODO: live link (or leave "" to hide)
    githubUrl: "https://github.com/indhud2005/YOUR-CAMPUSEVENT-REPO" // TODO: repo link
  }
];

function initProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!projectsGrid) return;

  function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';

    const filtered = filter === 'all'
      ? projectsData
      : projectsData.filter(p =>
          p.category.toLowerCase().replace(/\s+/g, '') === filter.toLowerCase().replace(/\s+/g, ''));

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card fade-in-up in-view';
      card.setAttribute('data-category', project.category);

      const tagsHtml = project.tags
        .map(t => `<span class="tech-chip">${t}</span>`)
        .join('');

      // "Go to Project" button (hidden if no URL)
      const projectBtnHtml = project.projectUrl && project.projectUrl.trim() !== ''
        ? `<a href="${project.projectUrl}" target="_blank" rel="noopener noreferrer"
              class="project-btn project-btn-demo"
              aria-label="Go to ${project.title}">
             Go to Project →
           </a>`
        : '';

      // GitHub button (hidden if no URL)
      const githubBtnHtml = project.githubUrl && project.githubUrl.trim() !== ''
        ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer"
              class="project-btn project-btn-code"
              aria-label="View source code of ${project.title} on GitHub">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
             </svg>
             GitHub
           </a>`
        : '';

      // Layout: image on top -> description under the image -> tags -> buttons
      card.innerHTML = `
        <div class="project-image-box">
          <img src="${project.image}"
               alt="${project.title} screenshot"
               class="project-img"
               loading="lazy"
               onerror="this.style.display='none'; this.parentElement.classList.add('img-fallback');" />
          <span class="project-badge-tag">${project.category}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">${tagsHtml}</div>
          <div class="project-actions">
            ${projectBtnHtml}
            ${githubBtnHtml}
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });
  }

  // Initial render
  renderProjects('all');

  // Filter button handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
}

/* ==========================================================================
   10. CERTIFICATIONS (ARRAY DEFINITION & DYNAMIC RENDERING)
   ========================================================================== */
/**
 * Certificates Master Array:
 * Easily edit, add, or remove certificates by updating this object list!
 * If link is empty (""), the "View Certificate" button is automatically omitted.
 */
// ===== CERTIFICATIONS =====
const certificates = [
  {
    title: "NodeJS Case Study - Movie App on Node JS and MongoDB",
    issuer: "Infosys Springboard",
    date: "Month Year",
    skills: ["Node.js", "MongoDB", "REST APIs"],
    image: "assets/certificates/nodejs-infosys.png",
    link: "assets/certificates/nodejs-infosys.png"
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "Month Year",
    skills: ["Data Science", "Data Analysis"],
    image: "assets/certificates/datascience-cisco.png",
    link: "assets/certificates/datascience-cisco.png"
  },
  {
    title: "Introduction to Generative AI",
    issuer: "AWS",
    date: "Month Year",
    skills: ["Generative AI", "Cloud", "AI Fundamentals"],
    image: "assets/certificates/genai-aws.png",
    link: "assets/certificates/genai-aws.png"
  }
];

function renderCertificates() {
  const grid = document.getElementById("certifications-grid");
  if (!grid) return;

  grid.innerHTML = certificates.map(cert => `
    <div class="cert-card fade-in-up">
      ${cert.image ? `<img src="${cert.image}" alt="${cert.title} certificate" class="cert-img" loading="lazy">` : ""}
      <div class="cert-body">
        <h3 class="cert-title">${cert.title}</h3>
        <p class="cert-issuer">${cert.issuer} · ${cert.date}</p>
        <div class="cert-skills">
          ${cert.skills.map(s => `<span class="cert-chip">${s}</span>`).join("")}
        </div>
        ${cert.link ? `<a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-btn">View Certificate ↗</a>` : ""}
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderCertificates);
/* ==========================================================================
   11. CONTACT FORM VALIDATION & FORMSPREE SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusBanner = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form || !statusBanner || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side validation
    const name = form.elements['name']?.value.trim();
    const email = form.elements['email']?.value.trim();
    const subject = form.elements['subject']?.value.trim();
    const message = form.elements['message']?.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      showStatus('Please fill out all required fields.', 'error');
      return;
    }

    if (!emailRegex.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    if (message.length < 10) {
      showStatus('Message should be at least 10 characters long.', 'error');
      return;
    }

    // Set sending state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳</span> Sending Message...`;
    statusBanner.style.display = 'none';

    try {
      const formData = new FormData(form);
      const actionUrl = form.getAttribute('action');

      const response = await fetch(actionUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showStatus('Thank you! Your message has been sent successfully. I will get back to you shortly.', 'success');
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors) {
          showStatus(data.errors.map(err => err.message).join(', '), 'error');
        } else {
          showStatus('Thank you for reaching out! (Form endpoint simulated or ready for your Formspree ID).', 'success');
          form.reset();
        }
      }
    } catch (err) {
      // Fallback message for development or offline testing
      showStatus('Note: Update YOUR_FORM_ID in index.html to receive real Formspree emails directly in your inbox.', 'success');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showStatus(msg, type) {
    statusBanner.textContent = msg;
    statusBanner.className = `form-status ${type}`;
    statusBanner.style.display = 'block';
  }
}

/* ==========================================================================
   11. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  animatedElements.forEach(el => observer.observe(el));
}

