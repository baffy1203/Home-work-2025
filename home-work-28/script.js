const track = document.querySelector('.flash-track');
const cards = document.querySelectorAll('.product-card');
const prevBtn = document.querySelector('.flash-prev');
const nextBtn = document.querySelector('.flash-next');
const toggleBtn = document.querySelector('.flash-toggle');
const dotsContainer = document.querySelector('.flash-dots');

let index = 0;
let autoplay = true;
let intervalId;
let TimeOutSec = 4;

/* ===== CARDS PER VIEW ===== */
function cardsPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 4;
}

/* ===== UPDATE ===== */
function updateSlider() {
  const cardWidth = cards[0].offsetWidth;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
  updateDots();
}

/* ===== NAVIGATION ===== */
function next() {
  index++;
  if (index > cards.length - cardsPerView()) index = 0;
  updateSlider();
}

function prev() {
  index--;
  if (index < 0) index = cards.length - cardsPerView();
  updateSlider();
}

/* ===== DOTS ===== */
function createDots() {
  dotsContainer.innerHTML = '';
  const count = cards.length - cardsPerView() + 1;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    if (i === index) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  dotsContainer.querySelectorAll('button').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

/* ===== AUTOPLAY ===== */
function startAuto() {
  intervalId = setInterval(next, TimeOutSec * 4);
}

function stopAuto() {
  clearInterval(intervalId);
}

/* ===== TOGGLE ===== */
toggleBtn.addEventListener('click', () => {
  autoplay = !autoplay;
  toggleBtn.textContent = autoplay ? '⏸' : '▶';
  autoplay ? startAuto() : stopAuto();
});

/* ===== EVENTS ===== */
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

/* ===== SWIPE ===== */
let startX = 0;

track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (diff > 50) next();
  if (diff < -50) prev();
});

/* ===== RESIZE ===== */
window.addEventListener('resize', () => {
  index = 0;
  createDots();
  updateSlider();
});

/* ===== INIT ===== */
createDots();
updateSlider();
startAuto();
