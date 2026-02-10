const timeline = document.getElementById('timeline');
const cards = Array.from(document.querySelectorAll('.card'));
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const progressFill = document.getElementById('progress');

// Create progress fill bar element
const fill = document.createElement('i');
document.getElementById('progress').appendChild(fill);

function updateProgress() {
  const scrollWidth = timeline.scrollWidth - timeline.clientWidth;
  const pct = scrollWidth ? (timeline.scrollLeft / scrollWidth) * 100 : 0;
  fill.style.width = pct + '%';
}

// Intersection observer to mark center card as active
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const card = e.target;
    if (e.isIntersecting && e.intersectionRatio > 0.5) {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    }
  });
}, { root: timeline, threshold: [0.5] });

cards.forEach(c => io.observe(c));

timeline.addEventListener('scroll', () => {
  updateProgress();
});

prev.addEventListener('click', () => {
  // find current active index
  const idx = cards.findIndex(c => c.classList.contains('active'));
  const nextIdx = Math.max(0, idx - 1);
  cards[nextIdx].scrollIntoView({behavior:'smooth', inline:'center'});
});

next.addEventListener('click', () => {
  const idx = cards.findIndex(c => c.classList.contains('active'));
  const nextIdx = Math.min(cards.length - 1, (idx === -1 ? 0 : idx + 1));
  cards[nextIdx].scrollIntoView({behavior:'smooth', inline:'center'});
});

// keyboard support
timeline.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next.click();
  if (e.key === 'ArrowLeft') prev.click();
});

// initial centering: ensure first card is active
setTimeout(()=>{ cards[0].scrollIntoView({behavior:'smooth', inline:'center'}); updateProgress(); }, 120);
