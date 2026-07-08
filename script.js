// ── GALLERY DATA & RENDERING (3 categories × 50 designs each) ──
// To add your own photos: save them as images/handmade/handmade-01.jpg ... handmade-50.jpg
// (and the same pattern for images/cnc/cnc-01.jpg...50 and images/kada/kada-01.jpg...50).
// Any slot without a matching file automatically shows a placeholder instead — nothing breaks.

const galleryCategories = {
  handmade: { label: "Hand Made Bangle Design", icon: "✋" },
  cnc:      { label: "CNC Bangle Design",        icon: "⚙" },
  kada:     { label: "Kada Design",               icon: "◎" }
};

const galleryHeights = [200, 280, 220, 260, 180, 240, 200, 270];

function buildGalleryItem(catKey, index){
  const cat = galleryCategories[catKey];
  const num = String(index).padStart(2, '0');
  const name = cat.label + " " + num;

  const item = document.createElement('div');
  item.className = 'gallery-item real-img';

  const img = document.createElement('img');
  img.src = 'images/' + catKey + '/' + catKey + '-' + num + '.jpg';
  img.alt = name;
  img.loading = 'lazy';
  img.style.cssText = 'width:100%;display:block;object-fit:cover;';

  const overlay = document.createElement('div');
  overlay.className = 'gallery-overlay';
  overlay.innerHTML = '<div style="text-align:center;"><div class="gallery-zoom">⊕</div>' +
    '<div style="font-family:var(--font-tamil);font-size:0.7rem;color:var(--gold-pale);margin-top:0.3rem;">' + name + '</div></div>';

  // If the photo file doesn't exist yet, swap this slot for a placeholder box
  img.onerror = function(){
    item.classList.remove('real-img');
    item.innerHTML = '';
    const ph = document.createElement('div');
    ph.className = 'gallery-placeholder';
    ph.style.minHeight = galleryHeights[index % galleryHeights.length] + 'px';
    ph.innerHTML = '<span class="gallery-icon-large">' + cat.icon + '</span>' +
      '<span class="gallery-number">' + num + '</span>' +
      '<span class="gallery-label">' + name + '</span>';
    item.appendChild(ph);

    const ov = document.createElement('div');
    ov.className = 'gallery-overlay';
    ov.innerHTML = '<span class="gallery-zoom">⊕</span>';
    item.appendChild(ov);
  };

  item.appendChild(img);
  item.appendChild(overlay);
  return item;
}

function renderGallery(catKey){
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= 50; i++) {
    frag.appendChild(buildGalleryItem(catKey, i));
  }
  grid.appendChild(frag);
  document.getElementById('galleryMetaText').textContent =
    galleryCategories[catKey].label + " — 50 Designs (01–50)";
}

function switchGallery(catKey, btn){
  document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderGallery(catKey);
}

// Lightbox works for all gallery items via event delegation (handles tab switches too)
document.getElementById('galleryGrid').addEventListener('click', function(e){
  const item = e.target.closest('.real-img');
  if (!item) return;
  const img = item.querySelector('img');
  const cap = item.querySelector('[style*="color:var(--gold-pale)"]');
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-caption').textContent = cap ? cap.textContent : img.alt;
  document.getElementById('lightbox').classList.add('open');
});

// Initial render
renderGallery('handmade');

// ── PARTICLES
(function(){
  const container = document.getElementById('particles');
  const count = 30;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random()*100}%;
      width: ${Math.random()*3+1}px;
      height: ${Math.random()*3+1}px;
      animation-duration: ${Math.random()*15+8}s;
      animation-delay: ${Math.random()*10}s;
      opacity: ${Math.random()*0.5+0.1};
    `;
    container.appendChild(p);
  }
})();

// ── NAVBAR SCROLL
window.addEventListener('scroll', function(){
  const nb = document.getElementById('navbar');
  if(window.scrollY > 50) nb.classList.add('scrolled');
  else nb.classList.remove('scrolled');
});

// ── MOBILE NAV
function toggleNav(){
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ── SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── LIGHTBOX (real-img click handling is done via delegation in the gallery script above)
document.getElementById('lightbox').addEventListener('click', function(e){
  if(e.target === this) closeLightbox();
});
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeLightbox(); });

// ── CONTACT FORM
function handleSubmit(){
  const btn = event.target;
  btn.textContent = '✓ ஆர்டர் அனுப்பப்பட்டது!';
  btn.style.background = 'linear-gradient(135deg,#2ed573,#1a9e4a)';
  setTimeout(()=>{
    btn.textContent = 'ஆர்டர் அனுப்புங்கள்';
    btn.style.background = '';
  }, 3000);
}
