/* ==========================================================================
   BAGIAN YANG BISA KAMU GANTI
   title, artist : nama lagu dan penyanyi
   tint          : warna label kalau sampul gagal dimuat
   cover         : link atau path gambar, misalnya "covers/lagu1.jpg"
   audio         : nama file lagu di folder ini (durasinya otomatis ikut file)
   ========================================================================== */
const COLLECTION = { title: 'To\'s Song List', subtitle: 'asikk tempelan kulkas lusyu' };

const SONGS = [
  {
    title: 'Minggu', artist: 'White Chorus, Dzulfahmi', tint: '#e9e9e6',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6b/1b/ac/6b1bacba-8aea-d246-0926-a19b4048d544/cover.jpg/300x300bb.jpg',
    audio: 'White Chorus   Minggu ft  Dzulfahmi Official Lyric.m4a',
  },
  {
    title: 'Gravits', artist: 'Crayon Case', tint: '#7f9bc6',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b5/0b/83/b50b83b1-33ab-4b07-808a-ce122021a5e4/5063501027384_cover.jpg/300x300bb.jpg',
    audio: 'Crayon Case, Aiden Hunter, Aiden Hunter - Gravits.m4a',
  },
  {
    title: 'Surabaya', artist: 'Crayon Case', tint: '#7f9a76',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/bd/36/e6/bd36e66e-a2d6-6e81-ba61-e0c31358d8a5/199199977931.jpg/300x300bb.jpg',
    audio: 'Crayon Case  Surabaya Lyrics Video.m4a',
  },
  {
    title: 'Tapi Diterima', artist: 'Nadin Amizah', tint: '#8b8478',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/d5/3c/16/d53c1625-bdbc-b463-c309-5b0de8fde1f6/cover.jpg/300x300bb.jpg',
    audio: 'Nadin Amizah  Tapi Diterima Official Lyric Video.m4a',
  },
  {
    title: 'Membasuh', artist: 'Hindia, Rara Sekar', tint: '#5a4630',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/2a/da/57/2ada5765-472f-3193-11a3-861db06da99d/cover.jpg/300x300bb.jpg',
    audio: 'Hindia ft Rara Sekar  Membasuh Official Lyric  Com.m4a',
  },
  {
    title: 'Puja Puji Puspa Hati', artist: 'Irama Pantai Selatan', tint: '#7aa36e',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/fa/85/dd/fa85dd40-3f3c-0814-969f-d125feb52a98/cover.jpg/300x300bb.jpg',
    audio: 'Irama Pantai Selatan - Puja Puji Puspa Hati.mp3',
  },
  {
    title: '晴る', artist: 'Yorushika', tint: '#e6dfd2',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/2e/8b/c3/2e8bc3b7-6f8e-f722-5fdb-b69a7c8c6ac4/26UMGIM18610.rgb.jpg/300x300bb.jpg',
    audio: 'Yorushika - Sunny.mp3',
  },
  {
    title: '心予報', artist: 'Eve', tint: '#d8dbd8',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/ae/1d/db/ae1ddb7e-8148-3c47-5090-118825882513/TFCC-86703WW.jpg/300x300bb.jpg',
    audio: 'Eve   Heart Forecast Lyrics KanRomEng.m4a',
  },
  {
    title: 'in another lifetime', artist: 'Evelyn Kirana', tint: '#e8a27a',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fe/1e/4e/fe1e4ed2-f2b7-82d2-2e32-f408621af301/823000580354.png/300x300bb.jpg',
    audio: 'Evelyn Kirana  in another lifetime Official Music.m4a',
  },
];

/* ========================================================================== */

const $ = id => document.getElementById(id);
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');
const clock = s => pad(Math.floor(s / 60)) + ':' + pad(Math.floor(s % 60));

/* Tekstur baja brushed */
function paintSteel() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  for (let x = 0; x < 512; x++) {
    const v = Math.random();
    g.fillStyle = v > .5 ? `rgba(255,255,255,${(v - .5) * .17})` : `rgba(0,0,0,${(.5 - v) * .15})`;
    g.fillRect(x, 0, 1, 256);
  }
  for (let i = 0; i < 700; i++) {
    g.fillStyle = `rgba(${Math.random() > .5 ? '255,255,255' : '0,0,0'},.05)`;
    g.fillRect(Math.random() * 512, Math.random() * 256, 1, 10 + Math.random() * 60);
  }
  document.documentElement.style.setProperty('--steel-tex', `url(${c.toDataURL('image/png')})`);
}

/* Suara: bunyi klik magnet dan pemutar file lagu */
const Sound = {
  ctx: null, master: null, noise: null, el: null, offset: 0,

  wake() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const c = this.ctx = new AC();
      this.master = c.createGain(); this.master.gain.value = .8;
      this.master.connect(c.destination);
      const n = c.createBuffer(1, c.sampleRate * .2, c.sampleRate), data = n.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      this.noise = n;
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  },

  clack() {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    const s = c.createBufferSource(), f = c.createBiquadFilter(), a = c.createGain();
    s.buffer = this.noise; f.type = 'highpass'; f.frequency.value = 1500;
    a.gain.setValueAtTime(.3, t); a.gain.exponentialRampToValueAtTime(.001, t + .05);
    s.connect(f); f.connect(a); a.connect(this.master);
    s.start(t); s.stop(t + .07);
  },

  pos() { return this.el ? this.el.currentTime : this.offset; },

  start(song, at, onFail) {
    this.halt();
    this.offset = at;
    if (!song.audio) return onFail();
    const el = this.el = new Audio(song.audio);
    const live = () => this.el === el;
    el.addEventListener('loadedmetadata', () => {
      if (!live()) return;
      if (isFinite(el.duration)) song.duration = el.duration;
      render();
    });
    el.addEventListener('ended', () => { if (live()) ended(); });
    el.addEventListener('error', () => { if (live()) onFail(); });
    if (at) el.currentTime = at;
    el.play().catch(e => { if (live() && e.name !== 'AbortError') onFail(); });
  },

  halt() {
    if (!this.el) return;
    const e = this.el;
    this.el = null;
    e.pause(); e.removeAttribute('src'); e.load();
  },

  pause() {
    this.offset = this.pos();
    this.halt();
  },
};

/* Keadaan pemutar */
const state = { seated: null, last: 0, pos: 0, playing: false, shuffle: false, repeat: 'off', seeking: false, failed: false };
const REPEAT_LABEL = { off: 'mati', all: 'semua lagu', one: 'satu lagu' };
let discs = [], cells = [], seatTimer = 0;

const dur = () => state.seated === null ? 0 : SONGS[state.seated].duration || 0;

function slotTransform(i) {
  const a = cells[i].getBoundingClientRect(), b = $('slot').getBoundingClientRect();
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  return { dx, dy, s: b.width / a.width };
}
function homeDisc(i) {
  const d = discs[i];
  d.style.transform = '';
  d.classList.remove('is-seated', 'is-spinning');
  d.classList.add('is-flying');
  d.setAttribute('aria-label', `Tempel ${SONGS[i].title}`);
  setTimeout(() => d.classList.remove('is-flying'), 520);
}
function flyToSlot(i) {
  const { dx, dy, s } = slotTransform(i), d = discs[i];
  d.classList.add('is-seated');
  d.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
  d.setAttribute('aria-label', `Lepas ${SONGS[i].title}`);
}
function setLit(on) { $('panel').classList.toggle('is-lit', on); }
function setPlaying(on) {
  state.playing = on;
  if (state.seated !== null) discs[state.seated].classList.toggle('is-spinning', on);
  render();
}

function seat(i) {
  Sound.wake();
  clearTimeout(seatTimer);
  if (state.seated === i) {
    flyToSlot(i); setLit(true);
    if (!state.playing) startPlaying();
    return;
  }
  Sound.pause();
  if (state.seated !== null) homeDisc(state.seated);
  setLit(false);
  state.seated = state.last = i;
  state.pos = 0;
  state.failed = false;
  setPlaying(false);
  flyToSlot(i);
  const inView = $('slot').getBoundingClientRect();
  if (inView.top < 0 || inView.bottom > innerHeight) window.scrollTo({ top: scrollY + inView.top - 90, behavior: REDUCED ? 'auto' : 'smooth' });
  seatTimer = setTimeout(() => {
    Sound.clack();
    setLit(true);
    startPlaying();
  }, REDUCED ? 0 : 430);
}
function eject() {
  if (state.seated === null) return;
  clearTimeout(seatTimer);
  Sound.pause();
  const i = state.seated;
  setPlaying(false);
  state.seated = null;
  state.pos = 0;
  homeDisc(i);
  setLit(false);
  render();
}
function startPlaying() {
  if (state.seated === null) return;
  Sound.wake();
  state.failed = false;
  setPlaying(true);
  Sound.start(SONGS[state.seated], state.pos, () => {
    state.failed = true;
    setPlaying(false);
  });
}
function pausePlaying() {
  state.pos = Sound.pos();
  Sound.pause();
  setPlaying(false);
}
function togglePlay() {
  if (state.seated === null) return seat(state.last);
  state.playing ? pausePlaying() : startPlaying();
}
function step(delta) {
  const n = SONGS.length;
  const from = state.seated === null ? state.last - (delta > 0 ? 1 : 0) : state.seated;
  if (state.shuffle && n > 1) {
    let r = from;
    while (r === from) r = Math.floor(Math.random() * n);
    return seat(r);
  }
  seat((from + delta + n) % n);
}
function previous() {
  if (state.seated !== null && Sound.pos() > 3) { restart(); return; }
  step(-1);
}
function restart() {
  state.pos = 0;
  if (state.playing) startPlaying(); else render();
}
function ended() {
  if (state.repeat === 'one') return restart();
  const atEnd = state.seated === SONGS.length - 1;
  if (state.repeat === 'all' || state.shuffle || !atEnd) return step(1);
  Sound.pause();
  state.pos = 0;
  setPlaying(false);
}

function render() {
  const s = state.seated === null ? null : SONGS[state.seated];
  $('now').classList.toggle('is-empty', !s);
  $('now-title').textContent = s ? s.title : 'Belum ada piringan yang menempel';
  $('now-sub').textContent = !s ? '' : s.artist + (state.failed ? ' \u00b7 file lagu tidak bisa diputar' : '');
  const seek = $('seek'), d = dur();
  seek.disabled = !s;
  seek.max = d || 100;
  if (!state.seeking) seek.value = state.pos;
  seek.style.setProperty('--p', d ? (seek.value / d * 100) + '%' : '0%');
  $('cur').textContent = clock(state.seeking ? +seek.value : state.pos);
  $('dur').textContent = clock(d);
  $('play').setAttribute('aria-label', state.playing ? 'Jeda' : 'Putar');
  $('play-icon').setAttribute('d', state.playing ? 'M6.500 4.500h3.800v15H6.500zM13.700 4.500h3.800v15h-3.800z' : 'M7 4.500v15l12.500-7.500z');
}

/* Tarik dan tempel piringan */
function bindDrag(d, i) {
  let start = null, moved = false, near = false;
  const place = (x, y, s) => { d.style.transform = `translate(${x}px, ${y}px) scale(${s})`; };

  d.addEventListener('pointerdown', e => {
    if (e.button) return;
    d.setPointerCapture(e.pointerId);
    const slot = slotTransform(i), wasSeated = state.seated === i;
    start = { x: e.clientX, y: e.clientY, base: wasSeated ? { x: slot.dx, y: slot.dy, s: slot.s } : { x: 0, y: 0, s: 1 }, slot, wasSeated };
    moved = false;
  });

  d.addEventListener('pointermove', e => {
    if (!start) return;
    let x = e.clientX - start.x, y = e.clientY - start.y;
    if (!moved) {
      if (Math.hypot(x, y) < 7) return;
      moved = true;
      d.classList.add('is-dragging');
      if (start.wasSeated) {
        clearTimeout(seatTimer);
        if (state.playing) pausePlaying();
        setLit(false);
      }
    }
    x += start.base.x; y += start.base.y;
    const { slot } = start, gap = Math.hypot(x - slot.dx, y - slot.dy);
    const reach = $('slot').offsetWidth * .85;
    near = gap < reach;
    $('slot').classList.toggle('is-near', near);
    if (near) {
      const pull = 1 - gap / reach;
      x += (slot.dx - x) * pull * .75;
      y += (slot.dy - y) * pull * .75;
    }
    place(x, y, (near ? slot.s : Math.max(1, start.base.s * .96)) * 1.04);
  });

  const finish = e => {
    if (!start) return;
    const { wasSeated } = start;
    start = null;
    d.classList.remove('is-dragging');
    $('slot').classList.remove('is-near');
    if (e.type === 'pointercancel' && !moved) return;
    if (!moved) { wasSeated ? eject() : seat(i); return; }
    if (near) { seat(i); return; }
    if (wasSeated) eject(); else d.style.transform = '';
  };
  d.addEventListener('pointerup', finish);
  d.addEventListener('pointercancel', finish);
  d.addEventListener('click', e => {
    if (e.detail === 0) state.seated === i ? eject() : seat(i);
  });
}

/* Susun halaman */
function build() {
  $('brand-title').textContent = COLLECTION.title;
  $('brand-sub').textContent = COLLECTION.subtitle;

  const hint = 'Tarik piringan ke tengah panel, atau ketuk saja. Tarik keluar untuk melepasnya.';
  $('hint').textContent = hint;
  const image = s => `url("${s.cover}"), linear-gradient(${s.tint}, ${s.tint})`;

  SONGS.forEach((s, i) => {
    const cover = document.createElement('button');
    cover.type = 'button';
    cover.style.backgroundImage = image(s);
    cover.setAttribute('aria-label', `Putar ${s.title}`);
    cover.addEventListener('click', () => seat(i));
    $('covers').append(cover);
  });

  SONGS.forEach((s, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const disc = document.createElement('button');
    disc.type = 'button';
    disc.className = 'disc';
    disc.setAttribute('aria-label', `Tempel ${s.title}`);
    disc.innerHTML = '<span class="vinyl"></span><span class="tilt"><span class="label"></span></span><span class="sheen"></span><span class="hole"></span>';
    disc.style.setProperty('--tilt', `${(i * 47) % 40 - 20}deg`);
    disc.querySelector('.label').style.backgroundImage = image(s);
    const show = () => { $('hint').textContent = `${s.title} \u00b7 ${s.artist}`; };
    const clear = () => { $('hint').textContent = hint; };
    disc.addEventListener('pointerenter', show);
    disc.addEventListener('pointerleave', clear);
    disc.addEventListener('focus', show);
    disc.addEventListener('blur', clear);
    cell.append(disc);
    $('discs').append(cell);
    cells.push(cell); discs.push(disc);
    bindDrag(disc, i);
  });

  $('play').addEventListener('click', togglePlay);
  $('next').addEventListener('click', () => step(1));
  $('prev').addEventListener('click', previous);
  $('shuffle').addEventListener('click', e => {
    state.shuffle = !state.shuffle;
    e.currentTarget.classList.toggle('is-on', state.shuffle);
    e.currentTarget.setAttribute('aria-pressed', state.shuffle);
  });
  $('repeat').addEventListener('click', e => {
    const order = ['off', 'all', 'one'];
    state.repeat = order[(order.indexOf(state.repeat) + 1) % 3];
    e.currentTarget.classList.toggle('is-on', state.repeat !== 'off');
    e.currentTarget.setAttribute('aria-label', `Ulangi: ${REPEAT_LABEL[state.repeat]}`);
    $('repeat-one').hidden = state.repeat !== 'one';
  });

  const seek = $('seek');
  seek.addEventListener('input', () => { state.seeking = true; render(); });
  seek.addEventListener('change', () => {
    state.seeking = false;
    state.pos = +seek.value;
    if (state.playing) startPlaying(); else render();
  });

  document.addEventListener('keydown', e => {
    const tag = e.target.tagName;
    if (e.code === 'Space' && tag !== 'BUTTON' && tag !== 'INPUT') { e.preventDefault(); togglePlay(); }
    if (tag === 'INPUT') return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') previous();
  });

  new ResizeObserver(() => {
    if (state.seated === null) return;
    const d = discs[state.seated];
    d.style.transition = 'none';
    flyToSlot(state.seated);
    requestAnimationFrame(() => { d.style.transition = ''; });
  }).observe($('slot'));

  setInterval(() => {
    if (!state.playing) return;
    state.pos = Sound.pos();
    render();
  }, 200);

  render();
}

paintSteel();
build();
