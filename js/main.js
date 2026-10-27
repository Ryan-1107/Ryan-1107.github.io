const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '選單 ☰';
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '關閉 ×' : '選單 ☰';
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
const lightbox = document.querySelector('.lightbox');
const preview = lightbox.querySelector('img');
const caption = document.querySelector('#lightbox-caption');
let imageTrigger;
document.querySelectorAll('[data-image]').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    imageTrigger = trigger;
    preview.src = trigger.dataset.image;
    preview.alt = trigger.dataset.caption;
    caption.textContent = trigger.dataset.caption;
    lightbox.showModal();
    document.body.classList.add('modal-open');
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  imageTrigger?.focus();
});

// Keep previous one-page bookmarks working after reorganizing the content.
const legacyPages = {"information-volunteer": "experience.html", "about": "index.html", "project": "projects.html", "ai-capstone": "projects.html", "pet-project": "projects.html", "study-buddy": "projects.html", "portfolio-work": "projects.html", "coursework": "projects.html", "coursework-title": "projects.html", "course-travel": "projects.html", "course-food-blog": "projects.html", "course-survey": "projects.html", "course-book-list": "projects.html", "course-drink-order": "projects.html", "course-flex-layout": "projects.html", "award": "experience.html", "president-cup": "experience.html", "freshman-cup": "experience.html", "experience": "experience.html", "rural-service": "experience.html", "japan-exchange": "experience.html", "company-visit": "experience.html", "association-experience": "experience.html", "photo": "experience.html", "resume": "resume.html", "education": "resume.html", "skill": "resume.html", "inventory": "resume.html", "growth": "resume.html", "home": "index.html", "main": "index.html", "hackathon": "experience.html"};
const pageName = location.pathname.split('/').pop() || 'index.html';
const legacyTarget = legacyPages[decodeURIComponent(location.hash.slice(1))];
const retiredWorkIds = ['course-book-list', 'course-drink-order', 'course-flex-layout'];
if (retiredWorkIds.includes(decodeURIComponent(location.hash.slice(1)))) {
  location.replace(new URL('projects.html?category=web#coursework', location.href).href);
} else if (pageName === 'index.html' && legacyTarget && legacyTarget !== pageName) {
  location.replace(new URL(legacyTarget + location.hash, location.href).href);
}

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const workCards = [...document.querySelectorAll('#work-list > [data-category]')];
function setFilter(category, updateURL = false) {
  if (category === 'learning' || category === 'practice') category = 'web';
  const allowed = ['systems', 'web', 'all'];
  if (!allowed.includes(category)) category = 'systems';
  let count = 0;
  workCards.forEach(card => {
    const visible = category === 'all' || card.dataset.category === category ||
      (category === 'learning' && card.dataset.category !== 'systems');
    card.hidden = !visible;
    if (visible) count++;
    else card.open = false;
  });
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  const status = document.querySelector('#filter-status');
  if (status) status.textContent = (category === 'learning' ? '網頁與程式練習 · ' : '') + '顯示 ' + count + ' / ' + workCards.length + ' 項';
  if (updateURL) {
    const url = new URL(location.href);
    url.searchParams.set('category', category);
    url.hash = '';
    history.replaceState(null, '', url);
  }
}
if (workCards.length) {
  setFilter(new URLSearchParams(location.search).get('category') || 'systems');
  filterButtons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter, true)));
}

// Reveal the relevant card even when a link points into collapsed or filtered content.
function revealHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  if (id === 'coursework' && workCards.length) setFilter('web');
  const card = target.closest('[data-category]');
  if (card && card.hidden) setFilter(card.dataset.category);
  let ancestor = target.parentElement;
  while (ancestor) {
    if (ancestor.tagName === 'DETAILS') ancestor.open = true;
    ancestor = ancestor.parentElement;
  }
  requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }));
}
window.addEventListener('hashchange', revealHash);
document.querySelectorAll('a[href*="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const url = new URL(link.href, location.href);
    if (url.pathname === location.pathname && url.hash === location.hash) revealHash();
  });
});
if (location.hash) revealHash();

// Print the content of the currently selected page, including closed disclosures.
let printState = [];
window.addEventListener('beforeprint', () => {
  if (printState.length) return;
  printState = [...document.querySelectorAll('details')].map(el => ({ el, open: el.open }));
  printState.forEach(({ el }) => { el.open = true; });
});
window.addEventListener('afterprint', () => {
  printState.forEach(({ el, open }) => { el.open = open; });
  printState = [];
});
