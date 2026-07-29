/* ==========================================================================
   Arun Y - Developer Portfolio & ATS Resume
   Interactive JavaScript Core
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavbar();
  initSkillFilters();
  initTimelineTabs();
  initProjectModals();
  initCertModals();
  initATSResume();
  initContactForm();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Interactive Particle Canvas Background
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 20), 60);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#3B82F6' : '#8B5CF6';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
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

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / 130})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Navbar Scroll & Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  });

  // Active section observer
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Skill Category Filtering
   -------------------------------------------------------------------------- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fade-in 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Timeline Section Tabs
   -------------------------------------------------------------------------- */
function initTimelineTabs() {
  const tabs = document.querySelectorAll('.timeline-tab-btn');
  const timelineContents = document.querySelectorAll('.timeline-group');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');
      timelineContents.forEach(group => {
        if (group.id === target) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Project Modals & Data
   -------------------------------------------------------------------------- */
const projectData = {
  'smart-procurement': {
    title: 'Smart Procurement & Vendor Management System',
    category: 'Java Enterprise / Backend',
    period: 'Infosys Springboard Internship 6.0',
    description: 'An enterprise-grade Java web application designed to streamline procurement, vendor onboarding, contract evaluation, and inventory tracking for organizations.',
    keyFeatures: [
      'Automated vendor registration & compliance verification workflow',
      'Real-time purchase order status tracking & invoice calculation',
      'Role-based access control (Admin, Vendor, Purchasing Manager)',
      'Database integration with MySQL for reliable transaction handling'
    ],
    techStack: ['Java', 'Object-Oriented Programming', 'MySQL', 'JDBC', 'HTML/CSS/JS'],
    github: 'https://github.com/Arun-05y'
  },
  'data-insights': {
    title: 'Data Analytics & Visual Insights Dashboard',
    category: 'Data Analytics',
    period: 'NIVOTECH R&D & Quantium Simulation',
    description: 'Analytical data pipeline and dashboard created to process customer transaction data, evaluate sales trends, and provide actionable business recommendations.',
    keyFeatures: [
      'Automated data cleaning and transformation using Excel & Python',
      'Created interactive pivot summaries and key KPI trend charts',
      'Conducted customer segmentation and purchase behavior analysis',
      'Formulated data-driven inventory management strategies'
    ],
    techStack: ['MS Excel', 'Python', 'Data Analytics', 'Statistical Modeling', 'Data Visualization'],
    github: 'https://github.com/Arun-05y'
  },
  'finai-agent': {
    title: 'FinAI – AI-Powered Budget Planning Agent',
    category: 'AI & Personal Finance Agent',
    period: 'Plan Smarter. Save Better. Grow Faster.',
    description: 'FinAI is an intelligent personal finance assistant that transforms budgeting into an interactive conversation. Instead of manually tracking expenses in spreadsheets, users simply chat with FinAI to create budgets, analyze spending habits, receive AI-powered financial insights, and achieve their savings goals.',
    keyFeatures: [
      'Conversational AI budgeting interface eliminating manual spreadsheet tracking',
      'Automated expense category analysis & spending habit pattern recognition',
      'Real-time AI-powered financial insights & customized savings recommendations',
      'Interactive budget planning with intelligent goal-tracking prompts'
    ],
    techStack: ['AI Agent', 'Python', 'JavaScript', 'Gemini / Claude API', 'Financial Analytics'],
    github: 'https://github.com/Arun-05y'
  },
  'medical-reminder': {
    title: 'Smart Medical Reminder & Diet Planner (MINI Project)',
    category: 'AI Healthcare & Web Development',
    period: 'MINI Project',
    description: 'Developed an AI-powered healthcare web application that helps users manage medication schedules and receive personalized diet recommendations based on their health profile. Built a FastAPI backend with reminder management, nutrition planning, and secure data handling, providing an intelligent and user-friendly health management solution.',
    keyFeatures: [
      'Built high-performance FastAPI backend for medication schedules & reminder management',
      'Integrated AI-driven personalized diet and nutrition recommendation engine',
      'Constructed secure user health profile data storage & access control',
      'Designed responsive intuitive frontend for seamless patient interactions'
    ],
    techStack: ['FastAPI', 'Python', 'AI Healthcare', 'REST API', 'JavaScript', 'HTML/CSS'],
    github: 'https://github.com/Arun-05y'
  }
};

function initProjectModals() {
  const projectBtns = document.querySelectorAll('.open-project-modal');
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = modalOverlay ? modalOverlay.querySelector('.modal-close-btn') : null;

  projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];
      if (!data) return;

      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-project-category').textContent = `${data.category} • ${data.period}`;
      document.getElementById('modal-project-desc').textContent = data.description;

      const featuresList = document.getElementById('modal-project-features');
      featuresList.innerHTML = '';
      data.keyFeatures.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        featuresList.appendChild(li);
      });

      const techContainer = document.getElementById('modal-project-tech');
      techContainer.innerHTML = '';
      data.techStack.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-pill';
        span.textContent = t;
        techContainer.appendChild(span);
      });

      const githubBtn = document.getElementById('modal-github-link');
      if (githubBtn) githubBtn.href = data.github;

      modalOverlay.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   6. Certification Modals
   -------------------------------------------------------------------------- */
const certData = {
  'azure-ai': {
    title: 'Microsoft Certified: Azure AI Cloud Developer Associate',
    issuer: 'Microsoft Corporation',
    date: 'Certified',
    desc: 'Validates expertise in designing and implementing AI solutions leveraging Azure Cognitive Services, Azure OpenAI, Machine Learning models, and cloud security.',
    link: 'https://drive.google.com/file/d/1dZV13N7xSBZOJMmPlGuMWXS9ZOIot76m/view?usp=drive_link'
  },
  'gcp-analytics': {
    title: 'Google Cloud Data Analytics Certificate',
    issuer: 'Google Cloud',
    date: 'Certified',
    desc: 'Demonstrates proficiency in processing data, SQL queries, BigQuery analytics, data visualization, and cloud data architecture.',
    link: 'https://www.credly.com/badges/96a3b007-5535-4ebe-b51d-de2e334a7d3a/public_url'
  },
  'nptel-netsec': {
    title: 'Network Security',
    issuer: 'NPTEL (IIT Master Certification)',
    date: 'Certified',
    desc: 'Comprehensive evaluation covering cryptographic algorithms, network protocol security, firewalls, IDS/IPS, and secure communications.',
    link: 'https://drive.google.com/file/d/1067P5xihI-xI7WL2PzFOxS4p9oajl3Du/view?usp=drive_link'
  },
  'nptel-privacy': {
    title: 'Cybersecurity and Privacy',
    issuer: 'NPTEL',
    date: 'Certified',
    desc: 'In-depth coverage of privacy principles, data protection, risk assessment, access control, and information security frameworks.',
    link: 'https://drive.google.com/file/d/1ajCDsD5RAGqwXaxgATLyzz1vWtUDqZs1/view?usp=drive_link'
  },
  'quantium-data': {
    title: 'Data Analytics Job Simulation',
    issuer: 'QUANTIUM',
    date: 'Completed',
    desc: 'Practical data analysis simulation evaluating customer purchasing patterns, metric creation, data cleaning, and executive presentation.',
    link: 'https://drive.google.com/file/d/1Sih7wVC8HaWtTOXqm7oh192I02lLA8Y-/view?usp=drive_link'
  },
  'cisco-cyber': {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Certified',
    desc: 'Foundational certification covering network security principles, threat mitigation, malware protection, and security hygiene.',
    link: 'https://drive.google.com/file/d/1Ha5bviZLVubI9hu_EQ6SSJaONHX0-Aqx/view?usp=drive_link'
  },
  'aws-practitioner': {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Certified',
    desc: 'Validates foundational knowledge of AWS Cloud platform concepts, core services, security, architecture, pricing, and support.',
    link: 'https://drive.google.com/file/d/1ONiJ3Gi2TzjDWFjNppik7lSurpmtUdSY/view?usp=drive_link'
  },
  'hdca': {
    title: 'Honours Diploma in Computer Applications (HDCA)',
    issuer: 'Recognized Institute',
    date: 'June 2022 – June 2023',
    desc: 'One-year comprehensive diploma covering computer applications, software tools, database management, and office automation suites.',
    link: 'https://drive.google.com/file/d/1LrgR5rzCpYxZm6qdFYvnkay_AsJRJqfy/view?usp=sharing'
  },
  'tcs-young-professional': {
    title: 'TCS iON Career Edge - Young Professional',
    issuer: 'TCS iON',
    date: 'Completed',
    desc: 'Equips young professionals with essential soft skills, industry communication paradigms, financial literacy, and digital concepts to excel in modern work environments.',
    link: 'https://drive.google.com/file/d/1bL4APoRLZ8WWhrLpcuTD9u-VqZ2MPjiT/view?usp=drive_link'
  }
};

function initCertModals() {
  const certCards = document.querySelectorAll('.cert-card-interactive');
  const modalOverlay = document.getElementById('cert-modal');
  const modalClose = modalOverlay ? modalOverlay.querySelector('.modal-close-btn') : null;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const certId = card.getAttribute('data-cert');
      const data = certData[certId];
      if (!data) return;

      document.getElementById('modal-cert-title').textContent = data.title;
      document.getElementById('modal-cert-issuer').textContent = `${data.issuer} • ${data.date}`;
      document.getElementById('modal-cert-desc').textContent = data.desc;

      const linkWrap = document.getElementById('modal-cert-link-wrap');
      if (linkWrap) {
        if (data.link) {
          linkWrap.innerHTML = `<a href="${data.link}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Document</a>`;
        } else {
          linkWrap.innerHTML = '';
        }
      }

      modalOverlay.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }
}

/* --------------------------------------------------------------------------
   7. Interactive ATS Resume Logic
   -------------------------------------------------------------------------- */
const plainTextATSResume = `ARUN Y
Pudukkottai, Tamil Nadu, India | arunyofficiall@gmail.com
LinkedIn: linkedin.com/in/aruny052006 | GitHub: github.com/Arun-05y

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Entry-level computer applications graduate with knowledge of Java basics programming, basic cybersecurity concepts, and office tools. Motivated to start a career in IT and continuously develop technical and problem-solving skills.

================================================================================
EDUCATION
================================================================================
B.E. Computer Science Engineering (2023 - 2027)
V.S.B Engineering College, Karur, Tamil Nadu
- Current CGPA: 7.91 (Till 6th Semester)

Higher Secondary Certificate (HSC) (2023)
Dr. J.C. Kumarappa Higher Secondary School - 71%

Secondary School Leaving Certificate (SSLC) (2021)
Dr. J.C. Kumarappa Higher Secondary School - 100%

================================================================================
TECHNICAL SKILLS
================================================================================
- Programming Languages: Java, Python
- Web Technologies: HTML5, CSS3, JavaScript
- Databases: MySQL, MongoDB
- Cloud & Platforms: Google Cloud Platform (GCP), Microsoft Azure (Azure AI Associate)
- Developer Tools: VS Code, Git, GitHub, Postman, MS Excel, Antigravity, Claude
- Domain Specialties: Data Analysis, Cybersecurity, Network Security, Prompt Engineering

================================================================================
EXPERIENCE & LEADERSHIP
================================================================================
Google Student Ambassador (GSA '2026) | Campus Leadership
- Selected as Google Campus Ambassador to promote Google technologies and Gemini AI.
- Organized campus productivity and AI workshops engaging student developer communities.

Java Developer Intern | Infosys Springboard Virtual Internship 6.0
- Developed "Java-Based Smart Procurement & Vendor Management System".
- Built backend business logic, database entities, and vendor onboarding modules using Java and MySQL.

Data Analysis Intern | NIVOTECH R&D
- Processed data handling and analytical reporting using MS Excel.
- Formulated data interpretation methods for business decision-making.

================================================================================
CERTIFICATIONS
================================================================================
- Microsoft Certified: Azure AI Cloud Developer Associate
- Google Cloud Data Analytics Certificate
- Network Security - NPTEL
- Cybersecurity and Privacy - NPTEL
- Data Analytics Job Simulation - QUANTIUM
- Introduction to Cybersecurity - Cisco
- AWS Cloud Practitioner Essentials
- TCS iON Career Edge - Young Professional
- Honours Diploma in Computer Applications (HDCA) (June 2022 - June 2023)

================================================================================
ACHIEVEMENTS & CO-CURRICULAR ACTIVITIES
================================================================================
- Paper Presentation: Presented "Emerging technologies and social impact of technology" at DAKSHAA 126, K.S. Rangasamy College of Technology.
- AI Workshop: Participated in "UNLOCK AI MASTERY" Workshop at CIT National Level Technical Symposium.
- Academic Excellence: Achieved 100% score in SSLC examinations.`;

function initATSResume() {
  const visualBtn = document.getElementById('view-visual-btn');
  const plainTextBtn = document.getElementById('view-text-btn');
  const visualPaper = document.getElementById('ats-visual-paper');
  const plainTextBox = document.getElementById('ats-plain-text-box');
  const copyBtn = document.getElementById('copy-ats-text-btn');
  const printBtn = document.getElementById('print-resume-btn');

  if (plainTextBox) {
    plainTextBox.textContent = plainTextATSResume;
  }

  if (visualBtn && plainTextBtn) {
    visualBtn.addEventListener('click', () => {
      visualBtn.classList.add('active');
      plainTextBtn.classList.remove('active');
      visualPaper.style.display = 'block';
      plainTextBox.style.display = 'none';
    });

    plainTextBtn.addEventListener('click', () => {
      plainTextBtn.classList.add('active');
      visualBtn.classList.remove('active');
      visualPaper.style.display = 'none';
      plainTextBox.style.display = 'block';
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(plainTextATSResume).then(() => {
        showToast('ATS Plain-Text Resume copied to clipboard!');
      }).catch(err => {
        console.error('Clipboard copy failed: ', err);
      });
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling & Toast Notifications
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
  });
}

function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10B981;"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* --------------------------------------------------------------------------
   9. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, .timeline-item, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  document.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal-active').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}
