// coco.js - all interactive behaviors (photo + video carousels, modals, hearts, confetti, music, theme, typewriter)

AOS.init({ duration: 700, once: false, anchorPlacement: 'top-bottom' });

/* ---------------- typewriter header ---------------- */
const titleEl = document.getElementById('mainTitle');
const fullText = " Happy Birthday cocoooo!  ";
let tIdx = 0;
titleEl.classList.add('typewriter');
(function typeWriter(){
  if (tIdx <= fullText.length) {
    titleEl.textContent = fullText.slice(0, tIdx);
    tIdx++;
    setTimeout(typeWriter, 60);
  } else {
    titleEl.classList.remove('typewriter');
  }
})();

/* ---------- nostalgic messages for each photo card ---------- */
const photoMessages = [
  `Best day 8 october 25 jb tune sb unplanned rehkr bhi mera day best bna dia...... Hum cutieesss toh hai... This selfie will remind you of our one of the memories.`, // 1
  `Yaad hai iss din mai Chhota devansh bni thi....... Hum ghr gye..ghr pr sb the toh humne jayendra ki bike li aur lake view chle gye..
Bhhhutttaaa bhi khayaaa tha..hlki hlki baarish mai....
Aur ek didi bhaiya khhade the unse inspire hokr....
Ye photo nikalwae thi...
But vo didi ko photo lena aata hi nhi thaa...
Koi na fir bhi memory ke liye toh kaafi hi hai na.`, //2
  `Gaytri mandir .... abhigyan ka janamdin ye kese bhool skte hum .... Iss din humne healthy cowssss ko green greennn ghhaas khhilae thi..... Aur tumne kaha tha tum achhi lg rhi ho,🫠🫠
Fir hum pura din ghr mai saath the....`, //3
  `Yeeeeeee momenttttt jb aapke dost goa gye the..hum apke ghr ruke the mittr..... 
Kya crazy din the vo
Unn pal ko mai aur aap dono bhool hi nhi skte...... Jyada likhne ki jrurat hi nhi ....ap aise hi yaad kr lenge.`, //4
  `Coco jii ka cookieee jii ke liye pehla gulaab..... Cookieee jii ke janamdin prrrrrr isko toh yaad krna bnta hai.... 
Aur ye gulaab itna sundrrrr tha ek dum meri tarah......`, //5
  `Arey sheetal das ki bagiyaaaa...
Bike hi toooooee ho gyi..... Kya hi adventurous day tha.... Mst maja aa rha ghum rhe.....maze kr rhe photo pe rhe evennn reel bhi bnaeee ..
Bahar toh loooo bike toh jaa rhi...
Uss din do dimaag sdhaa....
Thik hai yaadgar palo mai se hi hai...
Fir aap hume minal le gye mood light krne ke liyeee
Kitna sochte hai aap humare baare mai.`, //6
  `Yeeeeeee tekriiii.... Jb mai apki shirt pehnkr gyi thi...mst
Aap keh rhe the bike chalao humne nhi chalae toh aap thoda naraz huye
... But fir maan bhi gye the....
Uss din maine apko apna sexy avtaar se milwaya tha....
Toh kesi lgi thi mai apko....umm..hmmmmm.....`, //7
  `Laaaa pinooooozzzz
Jb apun ghr ja rhi the uske pehle ki 
Iss din humne 1st time saath mai pizza khaya tha.....
Aur tumne meri photos li thi jo post bhi ki thi...
Aur sbne wahi mere bday pr story lgae thi mostly.`, //8
  `Heart-to-heart moments = Ye heart humari friendship....humari saari ldhae......jhagde sb mita dena hai....
Iss din sad thi apun shaurya smarak gye the...pehli baar tumne mujhe godiiiii mai uthaya tha...... 
Aur humne km photos liye the...but jitne liye the usmai se ye bahut cutee thiiii .` //9
];

/* ---------- PHOTO MODAL ---------- */
const photoModal = document.getElementById('photoModal');
const photoModalImg = document.getElementById('photoModalImg');
const photoModalTitle = document.getElementById('photoModalTitle');
const photoModalText = document.getElementById('photoModalText');
const photoModalClose = document.getElementById('photoModalClose');

const photoCards = Array.from(document.querySelectorAll('#photoTrack .memory-card-card'));

function openPhotoModal(index){
  const card = photoCards[index];
  if (!card) return;
  const imgSrc = card.querySelector('img').getAttribute('src');
  const caption = card.querySelector('p').textContent || 'Memory';
  photoModalImg.src = imgSrc;
  photoModalTitle.textContent = caption;
  photoModalText.textContent = photoMessages[index] || '';
  photoModal.classList.remove('hidden');
  photoModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}
photoModalClose.addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', (e)=> { if (e.target === photoModal) closePhotoModal(); });
function closePhotoModal(){ photoModal.classList.add('hidden'); photoModal.classList.remove('flex'); document.body.style.overflow = ''; }

/* attach click to each photo card */
photoCards.forEach((wrapper, idx) => wrapper.addEventListener('click', ()=> openPhotoModal(idx)));

/* ---------- VIDEO MODAL (play with sound) ---------- */
const videoModal = document.getElementById('videoModal');
const videoModalPlayer = document.getElementById('videoModalPlayer');
const videoModalSource = document.getElementById('videoModalSource');
const videoModalClose = document.getElementById('videoModalClose');

const videoCards = Array.from(document.querySelectorAll('#videoTrack .video-card-card'));

function openVideoModal(index){
  const block = videoCards[index];
  if (!block) return;
  const vidEl = block.querySelector('video');
  const src = vidEl.querySelector('source').getAttribute('src');
  videoModalSource.src = src;
  videoModalPlayer.load();
  videoModal.classList.remove('hidden');
  videoModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  // try to play with sound (user gesture from click should allow)
  videoModalPlayer.muted = false;
  videoModalPlayer.play().catch(()=>{ /* playback prevented */ });
}
videoModalClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e)=> { if (e.target === videoModal) closeVideoModal(); });
function closeVideoModal(){
  videoModalPlayer.pause();
  videoModalPlayer.currentTime = 0;
  videoModal.classList.add('hidden');
  videoModal.classList.remove('flex');
  document.body.style.overflow = '';
}

/* attach click to each video card to open modal */
videoCards.forEach((wrap, idx) => {
  wrap.addEventListener('click', (e) => {
    // if click hits native controls area, ignore
    openVideoModal(idx);
  });
});

/* ---------- tilt hover effect (images & videos) ---------- */
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 6;
    const rotateX = -((y - midY) / midY) * 6;
    const media = card.querySelector('img, video');
    if (media) media.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    const media = card.querySelector('img, video');
    if (media) media.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  });
});

/* ---------- confetti canvas ---------- */
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
let cw, ch, confettiParticles = [];
function resizeCanvas(){ cw = confettiCanvas.width = window.innerWidth; ch = confettiCanvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas); resizeCanvas();

function ConfettiParticle(x,y){
  this.x = x; this.y = y; this.size = 6 + Math.random()*8;
  this.color = `hsl(${Math.random()*60 + 320}, 85%, ${55 + Math.random()*10}%)`;
  this.gravity = 0.05 + Math.random()*0.25; this.velX = -4 + Math.random()*8; this.velY = -6 + Math.random()*2;
  this.rotation = Math.random()*360; this.rotateSpeed = (Math.random()-0.5)*10; this.opacity = 1;
}
ConfettiParticle.prototype.update = function(){
  this.velY += this.gravity; this.x += this.velX; this.y += this.velY; this.rotation += this.rotateSpeed; this.opacity -= 0.01;
};
ConfettiParticle.prototype.draw = function(){
  ctx.save(); ctx.globalAlpha = Math.max(this.opacity,0); ctx.translate(this.x,this.y); ctx.rotate(this.rotation*Math.PI/180);
  ctx.fillStyle = this.color; ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size*0.6); ctx.restore();
};

function spawnConfettiBurst(x,y,count=40){ for (let i=0;i<count;i++) confettiParticles.push(new ConfettiParticle(x + Math.random()*40 - 20, y + Math.random()*40 - 20)); }

function confettiLoop(){
  ctx.clearRect(0,0,cw,ch);
  for (let i=confettiParticles.length-1;i>=0;i--){
    const p = confettiParticles[i]; p.update(); p.draw();
    if (p.y > ch + 20 || p.opacity <= 0) confettiParticles.splice(i,1);
  }
  requestAnimationFrame(confettiLoop);
}
confettiLoop();

// small bursts on load
window.addEventListener('load', () => {
  const x = window.innerWidth/2; const y = 160; spawnConfettiBurst(x,y,70);
  let bursts = 0; const int = setInterval(()=>{ spawnConfettiBurst(80 + Math.random()*(window.innerWidth-160), 120 + Math.random()*80, 30); bursts++; if (bursts>3) clearInterval(int); }, 700);
});

/* ---------- floating hearts ---------- */
function spawnHeart(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7.333-4.667-9.333-7.333C-0.333 8.667 5.333 4 8 6.667 9.333 8 12 10 12 10s2.667-2 4-3.333C18.667 4 24.333 8.667 21.333 13.667 19.333 16.333 12 21 12 21z" fill="#ff6fa3"/></svg>`;
  heart.style.left = x + 'px'; heart.style.top = y + 'px';
  document.body.appendChild(heart); setTimeout(()=> heart.remove(), 3000);
}
setInterval(()=>{ const count = 1 + Math.floor(Math.random()*2); for(let j=0;j<count;j++){ const x = 80 + Math.random()*(window.innerWidth - 160); const y = 120 + Math.random()*120; spawnHeart(x,y); } }, 1200);
document.addEventListener('click', (e)=> { if (e.target.closest('#musicBtn') || e.target.closest('#themeToggle') || e.target.closest('#photoPrev') || e.target.closest('#photoNext') || e.target.closest('#videoPrev') || e.target.closest('#videoNext')) return; spawnHeart(e.clientX, e.clientY); });

/* ---------- music button ---------- */
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');
let fadeInterval;
musicBtn.addEventListener('click', async () => {
  try {
    if (bgMusic.paused) {
      bgMusic.volume = 0; await bgMusic.play(); musicBtn.classList.add('playing'); musicIcon.textContent = '⏸';
      let vol = 0; clearInterval(fadeInterval); fadeInterval = setInterval(()=>{ vol = Math.min(1, vol + 0.05); bgMusic.volume = vol; if (vol >= 1) clearInterval(fadeInterval); }, 120);
    } else {
      clearInterval(fadeInterval); let vol = bgMusic.volume; fadeInterval = setInterval(()=>{ vol = Math.max(0, vol - 0.08); bgMusic.volume = vol; if (vol <= 0.02) { clearInterval(fadeInterval); bgMusic.pause(); musicBtn.classList.remove('playing'); musicIcon.textContent = '🎵'; } }, 80);
    }
  } catch(err) { console.warn('Playback prevented:', err); }
});

/* keyboard */
document.addEventListener('keydown', (e)=>{ if (e.key.toLowerCase()==='m') musicBtn.click(); if (e.key.toLowerCase()==='t') themeToggle.click(); });

/* ---------- theme toggle (dark) ---------- */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', ()=> {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

/* small surprise banner */
function showSurpriseBanner(){ const banner = document.createElement('div'); banner.innerHTML = `<div class="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"><div class="px-6 py-4 rounded-2xl text-center text-white" style="background:linear-gradient(90deg,#ff7ab6,#ffb6d5);box-shadow:0 8px 30px rgba(0,0,0,0.2);transform:translateY(-10px);"><div style="font-size:34px;font-weight:800;">“दीर्घायुष्मान् भव, सौख्यं आरोग्यं च ते भवेत्।
सदा स्मितमुखो भूत्वा, सर्वत्र विजयः भवेत्॥”</div><div style="margin-top:6px;opacity:0.95;">तुम्हारा जीवन दीर्घ हो, तुम्हें सदा सुख और अच्छा स्वास्थ्य प्राप्त हो।
तुम्हारे चेहरे पर हमेशा मुस्कान बनी रहे और हर क्षेत्र में तुम्हें सफलता मिले। 🌸💕</div></div></div>`; document.body.appendChild(banner); setTimeout(()=>{ banner.style.transition='opacity 900ms ease, transform 900ms ease'; banner.style.opacity='0'; banner.style.transform='translateY(-30px)'; setTimeout(()=>banner.remove(),1000); }, 2800); }
window.addEventListener('load', ()=> setTimeout(showSurpriseBanner, 420));

/* ---------- HELPER: Carousel core (photo + video share same behavior) ---------- */
function createCarousel(trackId, prevBtnId, nextBtnId, visibleDefault=3, autoplayDelay=2800) {
  const track = document.getElementById(trackId);
  const items = Array.from(track.children);
  let visibleCount = visibleDefault;
  function updateVisible(){
    if (window.innerWidth <= 768) visibleCount = 1;
    else if (window.innerWidth <= 1024) visibleCount = 2;
    else visibleCount = visibleDefault;
  }
  updateVisible();
  window.addEventListener('resize', updateVisible);

  // cloning for looping
  function setupLoop(){
    const clones = track.querySelectorAll('.clone');
    clones.forEach(c => c.remove());
    for (let i=0;i<visibleCount;i++){
      const node = items[i].cloneNode(true);
      node.classList.add('clone');
      track.appendChild(node);
    }
  }
  setupLoop();

  function slideWidth(){
    const first = track.querySelector(':scope > *');
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 0;
    return first ? (first.getBoundingClientRect().width + gap) : 0;
  }

  let currentIndex = 0, isHover=false, autoInt=null;
  function moveTo(index, animate=true){
    const w = slideWidth();
    if (!animate) track.style.transition = 'none'; else track.style.transition = 'transform 700ms cubic-bezier(.2,.8,.2,1)';
    track.style.transform = `translateX(${-(w * index)}px)`;
    if (!animate) requestAnimationFrame(()=> track.style.transition = 'transform 700ms cubic-bezier(.2,.8,.2,1)');
  }

  function startAuto(){
    clearInterval(autoInt);
    autoInt = setInterval(()=>{
      if (isHover) return;
      currentIndex++;
      moveTo(currentIndex,true);
      const total = items.length;
      if (currentIndex > total) {
        setTimeout(()=>{ track.style.transition='none'; currentIndex = 0; moveTo(currentIndex,false); }, 720);
      }
    }, autoplayDelay);
  }
  startAuto();

  track.addEventListener('mouseenter', ()=> isHover=true);
  track.addEventListener('mouseleave', ()=> isHover=false);

  // buttons
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  if (nextBtn) nextBtn.addEventListener('click', ()=>{ currentIndex++; moveTo(currentIndex,true); const total = items.length; if (currentIndex > total){ setTimeout(()=>{ track.style.transition='none'; currentIndex = 0; moveTo(currentIndex,false); },720); } });
  if (prevBtn) prevBtn.addEventListener('click', ()=> {
    if (currentIndex === 0) {
      const total = items.length;
      track.style.transition = 'none';
      currentIndex = total;
      moveTo(currentIndex,false);
      requestAnimationFrame(()=>{ currentIndex = total - 1; moveTo(currentIndex,true); });
    } else { currentIndex--; moveTo(currentIndex,true); }
  });

  // pointer drag
  let isDown=false, startX=0;
  track.addEventListener('pointerdown', (e)=>{ isDown=true; startX = e.clientX; track.style.cursor = 'grabbing'; });
  window.addEventListener('pointerup', ()=>{ isDown=false; track.style.cursor=''; });
  window.addEventListener('pointermove', (e)=>{ if (!isDown) return; const dx = e.clientX - startX; track.style.transition = 'none'; track.style.transform = `translateX(${-(currentIndex * slideWidth()) + dx}px)`; });

  // re-setup on resize (clones & reset)
  window.addEventListener('resize', ()=>{ updateVisible(); setupLoop(); currentIndex = 0; moveTo(currentIndex,false); });

  return { track, items };
}

/* initialize photo carousel */
const photoCarousel = createCarousel('photoTrack', 'photoPrev', 'photoNext', 3, 2800);
/* initialize video carousel */
const videoCarousel = createCarousel('videoTrack', 'videoPrev', 'videoNext', 3, 3200);

/* ensure carousel videos keep playing muted while in carousel */
const carouselVideos = document.querySelectorAll('.carousel-video');
carouselVideos.forEach(v => {
  // double ensure autoplay muted
  v.muted = true; v.loop = true; v.playsInline = true;
  // some browsers require play to be called after user interaction
  v.play().catch(()=>{ /* ignored */ });
});

/* ---------- accessibility small bits ---------- */
document.querySelectorAll('button').forEach(b => b.addEventListener('focus', ()=> b.classList.add('ring-2')));

// 🌸 Smart Lazy Autoplay + Cinematic Fade-in for Videos
const videos = document.querySelectorAll(".carousel-video");

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;

    if (entry.isIntersecting) {
      // Fade in and play smoothly
      video.classList.add("video-visible");
      video.play().catch(() => {});
    } else {
      // Pause and reset style
      video.pause();
      video.classList.remove("video-visible");
    }
  });
}, { threshold: 0.5 }); // 50% visible triggers play

videos.forEach((video) => {
  // Ensure preload metadata only
  video.setAttribute("preload", "metadata");
  videoObserver.observe(video);
});
// 🎁 Surprise video reveal logic
document.getElementById('revealBtn').addEventListener('click', () => {
  const videoContainer = document.getElementById('surpriseVideoContainer');
  const video = document.getElementById('surpriseVideo');
  
  videoContainer.classList.remove('hidden');
  video.scrollIntoView({ behavior: "smooth" });
  video.play();
});
