/* SANCTUM concept — LAYER LAB. Scroll journey + interactions. */
(() => {
  const html = document.documentElement;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (RM) html.classList.add('rm');

  /* ---------- header, drawer, mobile bar ---------- */
  const hdr = document.querySelector('.hdr');
  const mbar = document.querySelector('.mbar');
  const onScrollUI = (y) => {
    if (hdr) hdr.classList.toggle('solid', y > 40);
    if (mbar) { const j = document.querySelector('.journey'); const lim = j ? j.offsetTop + j.offsetHeight - window.innerHeight * 0.5 : window.innerHeight * 0.8; mbar.classList.toggle('show', y > lim); }
  };
  const drawer = document.getElementById('drawer');
  const toggler = document.querySelector('.wave-btn');
  const setMenu = (open) => {
    if (open) { drawer.hidden = false; requestAnimationFrame(() => drawer.classList.add('open')); }
    else { drawer.classList.remove('open'); setTimeout(() => { drawer.hidden = true; }, 450); }
    toggler.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
    if (open) setTimeout(() => drawer.querySelector('.close-btn').focus(), 60); else toggler.focus();
  };
  document.querySelectorAll('[data-menu]').forEach((b) => b.addEventListener('click', () => setMenu(drawer.hidden || !drawer.classList.contains('open'))));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer && !drawer.hidden) setMenu(false); });

  /* ---------- lazy "inside a class" video ---------- */
  const vids = document.querySelectorAll('video[data-lazy]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        if (!RM) v.play().catch(() => {});
      } else v.pause();
    }), { rootMargin: '200px' });
    vids.forEach((v) => io.observe(v));
  }

  /* ---------- smooth scroll + reveals ---------- */
  const hasGsap = window.gsap && window.ScrollTrigger;
  let lenis = null;
  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (!RM && window.Lenis) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 }); window.__lenis = lenis;
      lenis.on('scroll', (e) => { ScrollTrigger.update(); onScrollUI(e.scroll); });
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1 && document.querySelector(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -10 }); }
      }));
    }
    if (!RM) {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', overwrite: true, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      if (window.innerWidth > 900) gsap.utils.toArray('.phones img').forEach((el, i) => {
        gsap.fromTo(el, { y: 60 + i * 30 }, { y: -40 - i * 20, ease: 'none', scrollTrigger: { trigger: '.phones', start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const end = +el.dataset.count; const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.firstChild.nodeValue = Math.round(o.v); } });
      });
    }
  }
  if (!lenis) window.addEventListener('scroll', () => onScrollUI(window.scrollY), { passive: true });
  onScrollUI(window.scrollY);


  /* ---------- brand film: sound + scroll scale ---------- */
  const film = document.querySelector('.film');
  if (film) {
    const v = film.querySelector('video'); const btn = film.querySelector('.sound');
    btn.addEventListener('click', () => {
      if (!v.src) v.src = v.dataset.src;
      const on = v.muted; v.muted = !on;
      btn.setAttribute('aria-pressed', String(on));
      btn.querySelector('.lbl').textContent = on ? 'Sound off' : 'Sound on';
      if (on) v.play().catch(() => {});
    });
    if (window.gsap && window.ScrollTrigger && !RM) {
      gsap.fromTo(film.querySelector('.film-frame'), { scale: 0.8 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: film.querySelector('.film-stage'), start: 'top bottom', end: 'center center', scrub: true } });
      gsap.fromTo(film.querySelector('.film-logo'), { xPercent: -50, yPercent: -50, scale: 1.12, opacity: 0.3 }, { xPercent: -50, yPercent: -50, scale: 0.96, opacity: 1, ease: 'none', scrollTrigger: { trigger: film.querySelector('.film-stage'), start: 'top bottom', end: 'center center', scrub: true } });
    }
  }


  /* ---------- weekly reset: motion collage ---------- */
  const art = document.querySelector('.reset-art');
  if (art && window.gsap && window.ScrollTrigger && !RM) {
    const masks = art.querySelectorAll('.mask'), imgs = art.querySelectorAll('.mask img');
    const big = art.querySelector('.ph-big'), small = art.querySelector('.ph-small'), ghost = art.querySelector('.ghost'), word = art.querySelector('.reset-word');
    gsap.set(masks, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(imgs, { scale: 1.22 });
    gsap.to(masks, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.out', stagger: 0.2, scrollTrigger: { trigger: art, start: 'top 78%', once: true } });
    const st = { trigger: art, start: 'top bottom', end: 'bottom top', scrub: true };
    gsap.to(imgs, { scale: 1, ease: 'none', scrollTrigger: st });
    gsap.fromTo(big, { y: 60 }, { y: -60, ease: 'none', scrollTrigger: st });
    gsap.fromTo(small, { y: 140, x: -10 }, { y: -160, x: 20, ease: 'none', scrollTrigger: st });
    gsap.fromTo(word, { xPercent: 10 }, { xPercent: -35, ease: 'none', scrollTrigger: st });
    let settle;
    ScrollTrigger.create({ trigger: art, start: 'top bottom', end: 'bottom top', onUpdate: (s) => {
      const v = gsap.utils.clamp(-14, 14, s.getVelocity() / 220);
      gsap.to([big, small], { skewY: v * 0.5, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(ghost, { y: v * 7, x: -Math.abs(v) * 2.5, opacity: Math.min(0.55, Math.abs(v) / 10), duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      clearTimeout(settle);
      settle = setTimeout(() => {
        gsap.to([big, small], { skewY: 0, duration: 0.9, ease: 'elastic.out(1,0.6)', overwrite: 'auto' });
        gsap.to(ghost, { y: 0, x: 0, opacity: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
      }, 140);
    } });
  }




  /* download CTA: send Android users to Google Play */
  if (/android/i.test(navigator.userAgent)) document.querySelectorAll('.sb-dl[data-play]').forEach((l) => { l.href = l.dataset.play; });






  /* ---------- home festival: arch parallax ---------- */
  const hf = document.querySelector('.hfest-art');
  if (hf && window.gsap && window.ScrollTrigger && !RM) {
    const st = { trigger: hf, start: 'top bottom', end: 'bottom top', scrub: true };
    gsap.fromTo(hf.querySelector('.hf-arch img'), { yPercent: -8, scale: 1.08 }, { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: st });
    gsap.fromTo(hf.querySelector('.hf-inset'), { y: 80, rotation: -6 }, { y: -40, rotation: -2, ease: 'none', scrollTrigger: { ...st } });
  }


  /* ---------- mobile city carousel dots ---------- */
  const wcar = document.querySelector('.wcar-track');
  if (wcar) {
    const dots = [...document.querySelectorAll('.wcar-dots i')];
    const sync = () => { const cards = [...wcar.children]; const c = wcar.scrollLeft + wcar.clientWidth / 2; let best = 0, d = 1e9; cards.forEach((el, k) => { const m = el.offsetLeft + el.offsetWidth / 2; if (Math.abs(m - c) < d) { d = Math.abs(m - c); best = k; } }); dots.forEach((x, k) => x.classList.toggle('on', k === best)); };
    wcar.addEventListener('scroll', sync, { passive: true }); sync();
  }

  /* ---------- carousel dots: follow the swipe, tap to jump ---------- */
  const bindDots = (track, dots) => {
    if (!track || !dots.length) return;
    const sync = () => { const c = track.scrollLeft + track.clientWidth / 2; let best = 0, d = 1e9; [...track.children].forEach((el, k) => { const m = el.offsetLeft + el.offsetWidth / 2; if (Math.abs(m - c) < d) { d = Math.abs(m - c); best = k; } }); dots.forEach((x, k) => x.classList.toggle('on', k === best)); };
    dots.forEach((x, k) => x.addEventListener('click', () => { const el = track.children[k]; if (el) track.scrollTo({ left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' }); }));
    track.addEventListener('scroll', sync, { passive: true }); sync();
  };
  bindDots(document.querySelector('.mtrip'), [...document.querySelectorAll('.mdots button')]);
  bindDots(wcar, [...document.querySelectorAll('.wcar-dots i')]);

  /* ---------- mobile cities: one scroll in — cards fly from the depth and settle into the gallery ---------- */
  if (wcar && window.gsap && window.ScrollTrigger && !RM && innerWidth <= 900) {
    const sec = wcar.closest('.wcar');
    const cards = [...wcar.children];
    const dx = (el) => wcar.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2);
    sec.classList.add('wcar-lock');
    gsap.set(sec.querySelector('.wcar-head'), { opacity: 0, y: 30 });
    gsap.set(cards, { x: (i, el) => dx(el), y: (i) => 50 + i * 14, scale: (i) => 0.3 + i * 0.03, opacity: 0 });
    gsap.set(sec.querySelector('.wcar-dots'), { opacity: 0 });
    ScrollTrigger.create({ trigger: sec, start: 'top 70%', once: true, onEnter: () => {
      gsap.timeline({ onComplete: () => { sec.classList.remove('wcar-lock'); gsap.set(cards, { clearProps: 'transform,opacity' }); } })
        .to(sec.querySelector('.wcar-head'), { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0)
        .to(cards, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.1, stagger: 0.09, ease: 'expo.out' }, 0.15)
        .to(sec.querySelector('.wcar-dots'), { opacity: 1, duration: 0.4 }, '-=0.5');
    } });
  }

  /* ---------- sand curtain: rounded sand sections rise over the dark ---------- */
  if (window.gsap && window.ScrollTrigger && !RM) {
    document.querySelectorAll('.light').forEach((el) => {
      if (el.previousElementSibling && el.previousElementSibling.classList.contains('light')) return;
      gsap.fromTo(el, { clipPath: 'inset(0% 4% 0% 4% round 48px 48px 0 0)' }, { clipPath: 'inset(0% 0% 0% 0% round 32px 32px 0 0)', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: 0.5 } });
    });
  }

  /* ---------- community: gallery speeds up with scroll, notes drift ---------- */
  const comm = document.querySelector('.comm');
  if (comm && !RM) {
    const anims = () => [...comm.querySelectorAll('.comm-track')].flatMap((t) => t.getAnimations());
    let boost = 1;
    (function spin() { const v = window.__lenis ? Math.abs(window.__lenis.velocity || 0) : 0; boost += (1 + Math.min(v, 60) * 0.12 - boost) * 0.08; anims().forEach((an) => { an.playbackRate = boost; }); requestAnimationFrame(spin); })();
    if (window.gsap && window.ScrollTrigger && window.innerWidth > 900) {
      comm.querySelectorAll('.cnote').forEach((n, k) => gsap.fromTo(n, { y: 60 + (k % 3) * 40 }, { y: -(40 + (k % 3) * 50), ease: 'none', scrollTrigger: { trigger: comm, start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.fromTo(comm.querySelector('.comm-rows'), { rotation: -7 }, { rotation: -3, ease: 'none', scrollTrigger: { trigger: comm, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  }

  /* ---------- home private bookings: frame opens, photo settles ---------- */
  if (window.gsap && window.ScrollTrigger && !RM) document.querySelectorAll('.hpb-frame').forEach((hpb) => {
    gsap.fromTo(hpb, { clipPath: 'inset(0% 12% round 28px)' }, { clipPath: 'inset(0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: hpb, start: 'top 95%', end: 'top 15%', scrub: 0.6 } });
    gsap.fromTo(hpb.querySelector('img'), { scale: 1.25 }, { scale: 1.02, ease: 'none', scrollTrigger: { trigger: hpb, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- private: reel sound, partners rotator, benefits drift ---------- */
  const reel = document.querySelector('.preel-v');
  if (reel) {
    const v = reel.querySelector('video'); const btn = reel.querySelector('.sound');
    btn.addEventListener('click', () => {
      if (!v.src) v.src = v.dataset.src;
      const on = v.muted; v.muted = !on;
      btn.setAttribute('aria-pressed', String(on));
      btn.querySelector('.lbl').textContent = on ? 'Sound off' : 'Sound on';
      if (on) v.play().catch(() => {});
    });
  }
  const part = document.querySelector('.ppart');
  if (part) {
    const tabs = [...part.querySelectorAll('.ppart-tabs button')]; const imgs = [...part.querySelectorAll('.ppart-stage img')];
    let cur = 0, hold = false;
    const show = (i) => { cur = i; imgs.forEach((im, k) => im.classList.toggle('on', k === i)); tabs.forEach((t, k) => t.setAttribute('aria-selected', String(k === i))); };
    tabs.forEach((t, k) => t.addEventListener('click', () => show(k)));
    part.addEventListener('mouseenter', () => { hold = true; }); part.addEventListener('mouseleave', () => { hold = false; });
    if (!RM) setInterval(() => { if (!hold && !document.hidden) show((cur + 1) % imgs.length); }, 3800);
  }
  if (window.gsap && window.ScrollTrigger && !RM && window.innerWidth > 900) {
    document.querySelectorAll('.pb-img img').forEach((im, k) => gsap.fromTo(im, { yPercent: k % 2 ? -12 : 0 }, { yPercent: k % 2 ? 0 : -12, ease: 'none', scrollTrigger: { trigger: im.closest('.pb'), start: 'top bottom', end: 'bottom top', scrub: true } }));
  }

  /* ---------- sanctum digital: three phones fan open ---------- */
  if (window.gsap && window.ScrollTrigger && !RM) {
    document.querySelectorAll('.dphones').forEach((st) => {
      const m = window.innerWidth < 900 ? 0.6 : 1;
      const tl = () => ({ trigger: st, start: 'top 90%', end: 'center 45%', scrub: 0.8 });
      const W = () => st.clientWidth;
      gsap.fromTo(st.querySelector('.dph1'), { x: () => W() * 0.3, rotationY: 35, rotation: -4, scale: 0.86, opacity: 0.4 }, { x: 0, rotationY: 14, rotation: -3, scale: 1, opacity: 1, ease: 'none', scrollTrigger: tl() });
      gsap.fromTo(st.querySelector('.dph3'), { x: () => -W() * 0.3, rotationY: -35, rotation: 4, scale: 0.86, opacity: 0.4 }, { x: 0, rotationY: -14, rotation: 3, scale: 1, opacity: 1, ease: 'none', scrollTrigger: tl() });
      gsap.fromTo(st.querySelector('.dph2'), { y: 110 * m, scale: 0.92 }, { y: -10 * m, scale: 1, ease: 'none', scrollTrigger: tl() });
      const w = st.querySelector('.dphw');
      if (w) gsap.fromTo(w, { y: 160 * m, rotationX: 55, opacity: 0 }, { y: 0, rotationX: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: st, start: 'top 60%', end: 'bottom 70%', scrub: 0.8 } });
    });
  }

  /* ---------- membership triptych: stacked photos fan out ---------- */
  const trip = document.querySelector('.mtrip');
  if (trip && window.gsap && window.ScrollTrigger && !RM && window.innerWidth > 900) {
    const ph = [...trip.querySelectorAll('.mph')];
    const spread = () => trip.clientWidth * (window.innerWidth > 900 ? 0.34 : 0.33);
    const rot = [-6, 3, 7], stackRot = [-8, 2, 9];
    ph.forEach((el, k) => {
      const dir = k === 0 ? -1 : k === 2 ? 1 : 0;
      gsap.fromTo(el,
        { xPercent: -50, x: () => dir * 18, y: () => (k === 1 ? 0 : 40), rotation: stackRot[k], scale: k === 1 ? 1 : 0.92 },
        { xPercent: -50, x: () => dir * spread(), y: () => (k === 1 ? -10 : 34), rotation: dir * 5, scale: 1, ease: 'none',
          scrollTrigger: { trigger: trip, start: 'top 85%', end: 'center 45%', scrub: 0.8, invalidateOnRefresh: true } });
    });
  }

  /* ---------- the 55-minute journey ---------- */
  const journey = document.querySelector('.journey');
  if (!journey) return;
  const chaps = [...journey.querySelectorAll('.chap')];
  if (RM) {
    chaps.forEach((c) => { if (c.dataset.poster) c.style.backgroundImage = `url(${c.dataset.poster})`; });
    return;
  }

  const canvas = journey.querySelector('canvas.seq');
  const ctx = canvas.getContext('2d', { alpha: false });
  const mobile = window.innerWidth <= 768 || (window.innerHeight > window.innerWidth && window.innerWidth < 1024);
  const N = +(mobile ? journey.dataset.framesM : journey.dataset.framesD);
  const conn = navigator.connection || {};
  const slow = conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || '');
  const REAL = !/[?&]hero=ai\b/.test(location.search);
  const dir = mobile ? 'm' : (!REAL && !slow && window.innerWidth * Math.min(window.devicePixelRatio || 1, 2) > 1700 ? 'hd' : 'd');
  const seqBase = REAL ? 'seq-real' : 'seq';
  const src = (i) => `/assets/${seqBase}/${dir}/${String(i + 1).padStart(4, '0')}.webp`;
  if (REAL) { const pic = journey.querySelector('picture'); if (pic) { pic.querySelector('source').srcset = src(0).replace('/d/', '/m/'); pic.querySelector('img').src = src(0).replace('/m/', '/d/'); } journey.querySelectorAll('.chap[data-poster]').forEach((c) => { c.dataset.poster = ''; }); }
  const frames = new Array(N);
  const loaded = new Uint8Array(N);
  let current = 0, progress = 0, needsDraw = true, loadedCount = 0;
  const loaderEl = journey.querySelector('.loader');

  // chapter windows (fractions of the master sequence; boundaries come from the clip timings)
  const W = JSON.parse(journey.dataset.windows);
  const clockEl = journey.querySelector('.clock .time');
  const clockItems = [...journey.querySelectorAll('.clock li')];
  const breath = journey.querySelector('.breath');

  function load(i) {
    if (frames[i]) return;
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => { loaded[i] = 1; loadedCount++; if (Math.abs(i - current) < 3 || loadedCount === 1) needsDraw = true; if (loaderEl) loaderEl.textContent = loadedCount < N ? `Loading the ritual · ${Math.round(loadedCount / N * 100)}%` : ''; };
    img.src = src(i);
    frames[i] = img;
  }
  // progressive order: coarse to fine, so any scroll position has a near frame quickly
  const order = [];
  [32, 16, 8, 4, 2, 1].forEach((s) => { for (let i = 0; i < N; i += s) if (!order.includes(i)) order.push(i); });
  load(0);
  let qi = 0;
  const pump = () => { let k = 0; while (qi < order.length && k < 6) { load(order[qi++]); k++; } if (qi < order.length) setTimeout(pump, 60); };
  const start = () => setTimeout(pump, 50);
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 800 }); else start();

  function nearest(i) {
    if (loaded[i]) return i;
    for (let d = 1; d < N; d++) { if (i - d >= 0 && loaded[i - d]) return i - d; if (i + d < N && loaded[i + d]) return i + d; }
    return -1;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    needsDraw = true;
  }
  window.addEventListener('resize', resize);
  resize();

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (t) => t * t * (3 - 2 * t);
  function zoomAt(p) {
    // slow push-in during ARRIVAL (camera is static in that clip), released during the BREATHE cross-fade
    const a = W.bounds[1];
    if (p <= a) return 1 + 0.14 * smooth(p / a);
    if (p < W.bounds[2]) return 1.14;
    if (p < W.bounds[2] + 0.02) return 1.14 - 0.14 * smooth((p - W.bounds[2]) / 0.02);
    if (p > W.bounds[4] + 0.02) return 1 + 0.06 * smooth(clamp((p - W.bounds[4] - 0.02) / (1 - W.bounds[4] - 0.02), 0, 1));
    return 1;
  }
  function draw() {
    const i = nearest(current);
    if (i < 0) return;
    const img = frames[i];
    const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(cw / iw, ch / ih) * zoomAt(progress);
    const w = iw * s, h = ih * s;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2.15, w, h);
    if (!canvas.classList.contains('ready')) canvas.classList.add('ready');
  }

  const fade = (p, a, b, r = 0.022) => {
    if (p < a - r || p > b + r) return 0;
    if (p < a) return (p - (a - r)) / r;
    if (p > b) return 1 - (p - b) / r;
    return 1;
  };
  function ui(p) {
    chaps.forEach((c, k) => {
      const [a, b] = W.text[k];
      let o = fade(p, a, b);
      if (k === 0 && p < a) o = 1; // hero copy visible immediately
      if (k === chaps.length - 1 && p > b) o = 1; // final CTA stays
      const y = (1 - o) * 26;
      c.style.opacity = o.toFixed(3);
      c.style.transform = c.classList.contains('chap-final') ? `translateY(calc(-50% + ${y}px))` : `translateY(${y}px)`;
      c.classList.toggle('on', o > 0.5);
    });
    // class clock 00:00 → 55:00
    const mins = p * 55; const mm = Math.floor(mins); const ss = Math.floor((mins - mm) * 60);
    if (clockEl) clockEl.textContent = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    let active = 0; W.bounds.forEach((b, k) => { if (p >= b) active = k; });
    clockItems.forEach((li, k) => li.classList.toggle('on', k === Math.min(active, clockItems.length - 1)));
    if (breath) breath.style.opacity = fade(p, W.text[2][0], W.text[2][1]).toFixed(3);
    waveTarget = W.wave[Math.min(active, W.wave.length - 1)];
  }

  // waveform — "what plays in the headphones"
  const wave = journey.querySelector('.wave');
  const wctx = wave.getContext('2d');
  let waveAmp = 0.3, waveSpd = 0.6, waveTarget = W.wave[0], t0 = 0;
  function sizeWave() { wave.width = wave.clientWidth * dpr; wave.height = wave.clientHeight * dpr; }
  window.addEventListener('resize', sizeWave); sizeWave();
  function drawWave(t) {
    waveAmp += (waveTarget[0] - waveAmp) * 0.04; waveSpd += (waveTarget[1] - waveSpd) * 0.04;
    t0 += 0.016 * waveSpd;
    const w = wave.width, h = wave.height, mid = h * 0.55;
    wctx.clearRect(0, 0, w, h);
    for (let L = 0; L < 3; L++) {
      wctx.beginPath();
      for (let x = 0; x <= w; x += 4 * dpr) {
        const u = x / w;
        const env = Math.sin(Math.PI * u);
        const y = mid + Math.sin(u * (10 + L * 4) + t0 * (2 + L)) * Math.sin(u * 3 - t0) * h * 0.38 * waveAmp * env;
        x ? wctx.lineTo(x, y) : wctx.moveTo(x, y);
      }
      wctx.strokeStyle = L === 0 ? 'rgba(139,150,255,.95)' : `rgba(43,58,200,${0.35 - L * 0.1})`;
      wctx.lineWidth = (L === 0 ? 1.4 : 1) * dpr;
      wctx.shadowColor = 'rgba(43,58,200,.95)'; wctx.shadowBlur = L === 0 ? 12 * dpr : 0;
      wctx.stroke();
    }
  }

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(journey);
  const setProgress = (p) => {
    progress = p;
    const f = Math.round(p * (N - 1));
    if (f !== current) { current = f; needsDraw = true; }
    else needsDraw = true;
    ui(p);
  };
  if (hasGsap) {
    ScrollTrigger.create({ trigger: journey, start: 'top top', end: 'bottom bottom', onUpdate: (s) => setProgress(s.progress) });
  } else {
    const calc = () => { const r = journey.getBoundingClientRect(); setProgress(clamp(-r.top / (r.height - window.innerHeight), 0, 1)); };
    window.addEventListener('scroll', calc, { passive: true }); calc();
  }
  ui(0);
  (function loop(t) {
    if (visible) { if (needsDraw) { draw(); needsDraw = false; } drawWave(t); }
    requestAnimationFrame(loop);
  })(0);
})();

/* ---------- cookie consent + app pop-up ---------- */
(() => {
  const get = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const ck = document.querySelector('.ck'), pop = document.querySelector('.apop');
  window.sanctumConsent = get('sanctum-consent');
  const showPop = (delay) => {
    if (!pop || /thank-you/.test(location.pathname)) return;
    const seen = get('sanctum-apop');
    if (seen && Date.now() - seen < 7 * 864e5) return;
    setTimeout(() => {
      pop.hidden = false; requestAnimationFrame(() => pop.classList.add('on'));
      document.documentElement.classList.add('apop-open'); if (window.__lenis) window.__lenis.stop();
      put('sanctum-apop', Date.now());
    }, delay);
  };
  const closePop = () => { pop.classList.remove('on'); document.documentElement.classList.remove('apop-open'); if (window.__lenis) window.__lenis.start(); setTimeout(() => { pop.hidden = true; }, 500); };
  if (pop) { pop.querySelectorAll('[data-apop-close]').forEach((b) => b.addEventListener('click', closePop)); addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && !pop.hidden) closePop(); }); }
  if (ck && !window.sanctumConsent) {
    setTimeout(() => { ck.hidden = false; requestAnimationFrame(() => ck.classList.add('on')); document.documentElement.classList.add('ck-open'); }, 900);
    ck.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-ck]'); if (!b) return;
      const a = ck.querySelector('[name=analytics]'), m = ck.querySelector('[name=marketing]');
      const v = b.dataset.ck === 'all' ? [true, true] : b.dataset.ck === 'reject' ? [false, false] : [a.checked, m.checked];
      window.sanctumConsent = { functional: true, analytics: v[0], marketing: v[1], ts: Date.now() };
      put('sanctum-consent', window.sanctumConsent);
      document.dispatchEvent(new CustomEvent('sanctum:consent', { detail: window.sanctumConsent }));
      ck.classList.remove('on'); document.documentElement.classList.remove('ck-open'); setTimeout(() => { ck.hidden = true; }, 500);
      showPop(2200);
    });
  } else showPop(5000);
})();
