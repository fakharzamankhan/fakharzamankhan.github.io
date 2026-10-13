const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');
const progress = document.querySelector('.scroll-progress');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal-card h2');
const modalDescription = document.querySelector('.modal-description');
const modalStack = document.querySelector('.modal-stack');
const modalClose = document.querySelector('.modal-close');
const projectCards = [...document.querySelectorAll('.project-card')];
const filterButtons = [...document.querySelectorAll('.project-filters button')];
const navLinks = [...document.querySelectorAll('.nav a')];

const projectData = {
  tomato: {
    title: 'AI-Driven Tomato Care',
    description: 'A full-stack AI assistant for tomato leaf disease detection that combines CNN-based classification, secure authentication, email OTP verification, and a dashboard for scan history and feedback. Built to move from prediction to practical next steps with recommendations and reporting.',
    stack: ['Python', 'TensorFlow / Keras', 'OpenCV', 'Flask', 'PostgreSQL']
  },
  sentiment: {
    title: 'Twitter Sentiment Analysis System',
    description: 'An NLP web app that preprocesses tweet-style text, vectorizes features, and classifies sentiment with confidence scores. The system was designed to be easy to evaluate, refine, and extend with future feedback loops.',
    stack: ['Python', 'NLTK', 'Scikit-learn', 'Flask', 'TF-IDF']
  },
  market: {
    title: 'Mini Market Management System',
    description: 'A desktop business management system for inventory, sales, customer management, invoice generation, and role-based access. It organizes daily operations into a simple and reliable Windows Forms experience.',
    stack: ['C#', '.NET Framework', 'SQL Server', 'Windows Forms']
  }
};

menu.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;
  navLinks.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const top = target.getBoundingClientRect().top;
    link.classList.toggle('active', top <= 140 && top >= -target.offsetHeight + 140);
  });
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', e => {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

themeToggle.addEventListener('click', () => document.body.classList.toggle('dark'));

function openProject(key) {
  const project = projectData[key];
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalStack.innerHTML = project.stack.map(item => `<span>${item}</span>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

projectCards.forEach(card => card.addEventListener('click', () => {
  const key = card.dataset.project;
  if (key && projectData[key]) openProject(key);
}));

filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
  projectCards.forEach(card => {
    const visible = filter === 'all' || card.dataset.category.includes(filter);
    card.classList.toggle('is-hidden', !visible);
  });
}));

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
