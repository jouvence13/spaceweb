const qs = (s, o = document) => o.querySelector(s);
const qsa = (s, o = document) => [...o.querySelectorAll(s)];

// Loader
window.addEventListener("load", () => {
  const loader = qs("#loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
  }, 1800);
});

// Theme toggle
const themeToggle = qs("#themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Burger menu
const burger = qs("#burger");
const navLinks = qs("#navLinks");

burger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});

qsa(".nav__link").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Typing effect avec son
const typingNameEl = qs("#typingName");
const typingEl = qs("#typing");
const nameText = "AKODE Jouvence";
const typingText = "Développeur Web | Front-end & Back-end";
let nameIndex = 0;
let typeIndex = 0;

// Créer le contexte audio pour le son de typing
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playTypeSound() {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Son court et discret de frappe de clavier
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.05);
}

// Animation du nom
function typeNameLoop() {
  typingNameEl.textContent = nameText.slice(0, nameIndex++);
  
  // Jouer le son uniquement pour les lettres (pas les espaces)
  if (nameText[nameIndex - 1] && nameText[nameIndex - 1] !== ' ') {
    playTypeSound();
  }
  
  if (nameIndex <= nameText.length) {
    setTimeout(typeNameLoop, 50); // Plus rapide
  } else {
    // Démarrer l'animation du sous-titre après le nom
    setTimeout(typeLoop, 200);
  }
}

// Animation du sous-titre
function typeLoop() {
  typingEl.textContent = typingText.slice(0, typeIndex++);
  
  // Jouer le son uniquement pour les lettres (pas les espaces)
  if (typingText[typeIndex - 1] && typingText[typeIndex - 1] !== ' ') {
    playTypeSound();
  }
  
  if (typeIndex <= typingText.length) {
    setTimeout(typeLoop, 50); // Plus rapide
  }
}

// Démarrer l'animation du nom
setTimeout(typeNameLoop, 400);

// Parallax hero
const orb = qs(".orb");
const grid = qs(".grid");
window.addEventListener("scroll", () => {
  const y = window.scrollY * 0.15;
  orb.style.transform = `translateY(${y}px)`;
  grid.style.transform = `translateY(${y * 0.4}px)`;
});

// Scroll indicator
const indicator = qs(".scroll-indicator");
window.addEventListener("scroll", () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / height) * 100;
  indicator.style.width = `${progress}%`;
});

// Back to top
const backToTop = qs("#backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Scrollspy
const sections = qsa("main section");
const navItems = qsa(".nav__link");

const spy = () => {
  let current = sections[0].id;
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) current = section.id;
  });
  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
  });
};
window.addEventListener("scroll", spy);
spy();

// Filters
const filterButtons = qsa(".filter");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    // Sélectionner les cartes à chaque fois (car elles peuvent être recréées)
    const projectCards = qsa(".project-card");
    let visibleCount = 0;
    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "block" : "none";
      if (show) visibleCount++;
    });
    // Mettre à jour le compteur
    const counter = qs('#projectsCount');
    if (counter) {
      counter.textContent = `${visibleCount} projet${visibleCount > 1 ? 's' : ''}`;
    }
  });
});

// Modal
const modal = qs("#projectModal");
const modalTitle = qs("#modalTitle");
const modalDesc = qs("#modalDesc");
const modalStack = qs("#modalStack");
const modalDemo = qs("#modalDemo");
const modalCode = qs("#modalCode");
const modalClose = qs("#modalClose");

// Les listeners seront attachés dynamiquement après le chargement des projets

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// On-scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        const progress = entry.target.querySelector(".progress__bar span");
        if (progress && progress.dataset.done !== "true") {
          const percent = progress.closest(".progress").dataset.progress;
          progress.style.width = `${percent}%`;
          progress.dataset.done = "true";
        }
      }
    });
  },
  { threshold: 0.2 }
);

qsa(".section, .skill-card, .project-card, .timeline__item, .service-card, .contact__form").forEach(
  (el) => {
    el.classList.add("fade-up");
    observer.observe(el);
  }
);

// Contact form validation + toast
const form = qs("#contactForm");
const toast = qs("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showToast("Merci de remplir tous les champs.");
    return;
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isEmailValid) {
    showToast("Email invalide.");
    return;
  }

  // Désactiver le bouton pendant l'envoi
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Envoi en cours...";

  try {
    // Email 1 : Notification pour VOUS
    await emailjs.send(
      'service_nd0r86q',
      'template_tnvooz8', // Template pour vous (notification)
      {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Jouvence",
        reply_to: email
      }
    );

    // Email 2 : Auto-réponse pour le VISITEUR
    await emailjs.send(
      'service_nd0r86q',
      'template_c0v43vp', // Template pour le visiteur (auto-réponse)
      {
        from_name: name,
        to_email: email, // Email du visiteur
        message: message
      }
    );

    showToast("✓ Message envoyé ! Je vous réponds rapidement.");
    form.reset();
  } catch (error) {
    console.error('Erreur EmailJS:', error);
    showToast("⚠ Erreur lors de l'envoi. Réessayez ou contactez-moi directement.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// Copy email
const copyEmail = qs("#copyEmail");
copyEmail.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("spaceweb1997@gmail.com");
    showToast("Email copié.");
  } catch {
    showToast("Copie impossible.");
  }
});

// ===== FONCTIONNALITÉ GITHUB =====
// Fonction pour déterminer la catégorie d'un projet
function detectCategory(repo) {
  const desc = (repo.description || '').toLowerCase();
  const lang = (repo.language || '').toLowerCase();
  const topics = repo.topics || [];
  
  // Détection front-end
  if (topics.includes('html') || topics.includes('css') || topics.includes('frontend') ||
      lang === 'html' || lang === 'css' || 
      desc.includes('landing') || desc.includes('portfolio') || desc.includes('ui')) {
    return 'front';
  }
  
  // Détection back-end
  if (topics.includes('api') || topics.includes('backend') || topics.includes('server') ||
      lang === 'python' || lang === 'java' || lang === 'php' ||
      desc.includes('api') || desc.includes('server') || desc.includes('backend')) {
    return 'back';
  }
  
  // Détection fullstack
  if (topics.includes('fullstack') || topics.includes('full-stack') ||
      lang === 'javascript' || lang === 'typescript' ||
      desc.includes('fullstack') || desc.includes('full-stack')) {
    return 'full';
  }
  
  // Par défaut, on considère comme fullstack
  return 'full';
}

// Fonction pour obtenir une image placeholder selon le langage
function getProjectImage(repo) {
  const lang = repo.language?.toLowerCase() || '';
  const images = {
    javascript: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=900&q=60',
    typescript: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60',
    python: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=60',
    php: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?auto=format&fit=crop&w=900&q=60',
    html: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=900&q=60',
    css: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?auto=format&fit=crop&w=900&q=60',
    java: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=60',
    default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=60'
  };
  return images[lang] || images.default;
}

// Fonction pour créer une carte de projet
function createProjectCard(repo) {
  const category = detectCategory(repo);
  const desc = repo.description || 'Aucune description disponible';
  const stack = repo.language || 'Divers';
  const topics = repo.topics?.slice(0, 3).join(' • ') || stack;
  
  const card = document.createElement('article');
  card.className = 'project-card fade-up';
  card.dataset.category = category;
  card.dataset.title = repo.name;
  card.dataset.stack = topics;
  card.dataset.desc = desc;
  card.dataset.demo = repo.homepage || repo.html_url;
  card.dataset.code = repo.html_url;
  
  card.innerHTML = `
    <img src="${getProjectImage(repo)}" alt="Aperçu projet ${repo.name}" loading="lazy" />
    <div class="project-card__body">
      <h4>${repo.name}</h4>
      <p>${desc.slice(0, 80)}${desc.length > 80 ? '...' : ''}</p>
      <div class="stack">${topics}</div>
      <div class="project-card__actions">
        <button class="btn btn--small" data-action="details">Détails</button>
        <a class="btn btn--small btn--ghost" href="${repo.html_url}" target="_blank" rel="noopener">Code</a>
      </div>
    </div>
  `;
  
  return card;
}

// Charger les projets depuis GitHub
async function loadGithubProjects() {
  const username = window.GITHUB_USERNAME || 'jouvence13';
  const grid = qs('#projectsGrid');
  const loading = qs('#projectsLoading');
  const btn = qs('#loadGithubProjects');
  
  if (!grid || !loading || !btn) {
    console.error('Éléments manquants dans le DOM');
    return;
  }
  
  try {
    btn.disabled = true;
    btn.textContent = ' Chargement...';
    loading.style.display = 'grid';
    
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      const errorMsg = response.status === 404 ? 'Utilisateur GitHub introuvable' : `Erreur ${response.status}`;
      throw new Error(errorMsg);
    }
    
    const repos = await response.json();
    
    if (!Array.isArray(repos)) {
      throw new Error('Réponse GitHub invalide');
    }
    
    // Filtrer les repos intéressants (non-forks, avec description)
    const filteredRepos = repos
      .filter(repo => !repo.fork && !repo.private)
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 6); // Limiter à 6 projets max
    
    // Vider la grille (mais garder le loader)
    const loaderElement = grid.querySelector('#projectsLoading');
    grid.innerHTML = '';
    if (loaderElement) grid.appendChild(loaderElement);
    
    if (filteredRepos.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 3rem;">Aucun projet trouvé pour cet utilisateur.</p>';
      showToast('ℹ Aucun projet trouvé');
      btn.disabled = false;
      btn.textContent = ' Charger mes projets GitHub';
      return;
    }
    
    // Ajouter les cartes
    filteredRepos.forEach(repo => {
      const card = createProjectCard(repo);
      grid.appendChild(card);
      observer.observe(card);
    });
    
    // Mettre à jour le compteur
    const counter = qs('#projectsCount');
    if (counter) {
      counter.textContent = `${filteredRepos.length} projet${filteredRepos.length > 1 ? 's' : ''}`;
    }
    
    // Réattacher les event listeners
    attachProjectListeners();
    
    showToast(` ${filteredRepos.length} projets chargés depuis GitHub`);
    btn.textContent = '✓ Projets chargés';
    
  } catch (error) {
    console.error('Erreur GitHub:', error);
    const errorMessage = error.message || 'Erreur inconnue';
    showToast(` ${errorMessage}`);
    btn.disabled = false;
    btn.textContent = ' Réessayer';
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 3rem;">Erreur : ${errorMessage}<br><small>Vérifiez le nom d'utilisateur GitHub dans le code source.</small></p>`;
  } finally {
    if (loading) loading.style.display = 'none';
  }
}

// Fonction pour réattacher les listeners sur les nouvelles cartes
function attachProjectListeners() {
  qsa('.project-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest("[data-action='details']")) return;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalStack.textContent = `Stack : ${card.dataset.stack}`;
      modalDemo.href = card.dataset.demo;
      modalCode.href = card.dataset.code;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
}

// Event listener sur le bouton
const loadBtn = qs('#loadGithubProjects');
if (loadBtn) {
  loadBtn.addEventListener('click', loadGithubProjects);
  
  // Charger automatiquement au démarrage (optionnel)
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loadBtn && !loadBtn.disabled) {
        loadGithubProjects();
      }
    }, 2500);
  });
}
