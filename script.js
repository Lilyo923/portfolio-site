/* ═══════════════════════════════════════════
   Données des projets
═══════════════════════════════════════════ */
const PROJECTS = {
  bradbitt: {
    title:       'Brad Bitt — Le Site',
    studio:      'imagine',
    studioLabel: 'IMAGINe Studio',
    image:       '/images/brad.png',
    iconClass:   'm-icon--white',
    type:        'Site créatif',
    url:         'https://bbittmaislesite.netlify.app',
    desc:        "Le site officiel de Brad Bitt. Retrouvez l'intégralité de l'univers, les personnages, le lore et tous les détails de ce projet créatif développé sur le long terme."
  },
  fnaf: {
    title:       'Three Nights at Chez Moi — IRL',
    studio:      'hwr',
    studioLabel: 'HwR Engine',
    image:       '/images/3IRL.png',
    iconClass:   '',
    type:        'Jeu web',
    url:         'https://fnaf3irl-102.netlify.app',
    desc:        "Un jeu d'horreur web inspiré de Five Nights at Freddy's. Survivez trois nuits à Chez Moi aux côtés de Brad Bitt, Frank Lebœuf et Mama Coco. Achievements, Jukebox, mini-jeu SYSTÈME-01 et Custom Night."
  },
  amiitoon: {
    title:       'AmiiToon Tracker',
    studio:      'hwr',
    studioLabel: 'HwR Engine',
    image:       '/images/amiitoon.png',
    iconClass:   '',
    type:        'Outil / App',
    url:         'https://amiitoon-tracker.netlify.app',
    desc:        "Un tracker web pour recenser et visualiser votre collection d'amiibo de la saga Splatoon. Interface épurée, mode clair/sombre, support PWA — 27 figurines référencées."
  }
};


/* ═══════════════════════════════════════════
   Modal
═══════════════════════════════════════════ */
const overlay      = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose   = document.getElementById('modalClose');

let lastFocused = null;

function openModal(id) {
  const p = PROJECTS[id];
  if (!p) return;

  lastFocused = document.activeElement;

  const tagClass = p.studio === 'imagine' ? 'imagine-tag' : 'hwr-tag';

  modalContent.innerHTML = `
    <div class="m-icon ${p.iconClass}">
      <img src="${p.image}" alt="" aria-hidden="true" />
    </div>
    <span class="card-tag ${tagClass}">${p.studioLabel}</span>
    <h2 class="m-title" id="modalTitle">${p.title}</h2>
    <p class="m-desc">${p.desc}</p>
    <span class="m-type">${p.type}</span>
    <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="m-cta">
      Lancer le projet&nbsp;↗
    </a>
  `;

  overlay.removeAttribute('aria-hidden');
  overlay.classList.add('open');
  requestAnimationFrame(() => modalClose.focus());
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  if (lastFocused) lastFocused.focus();
}

/* Clics sur les cartes (hors lien direct ↗) */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.id));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card.dataset.id);
    }
  });
});

/* Bouton fermer */
modalClose.addEventListener('click', closeModal);

/* Clic sur le fond de l'overlay */
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

/* Touche Échap */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});


/* ═══════════════════════════════════════════
   Scroll reveal (respecte prefers-reduced-motion)
═══════════════════════════════════════════ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealTargets = document.querySelectorAll('.project-card, .studio-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('revealed');

        /* Après l'animation, reset le délai pour des hovers réactifs */
        el.addEventListener('transitionend', () => {
          el.style.transitionDelay = '0ms';
        }, { once: true });

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08 });

  revealTargets.forEach(el => observer.observe(el));

} else {
  document.querySelectorAll('.project-card, .studio-card').forEach(el => {
    el.classList.add('revealed');
  });
}
