/* SANCTUM — "Global Frequency" city globe (LAYER LAB concept). Canvas 2D, no dependencies. */
(() => {
  const sec = document.querySelector('.globe-sec');
  if (!sec) return;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = sec.querySelector('canvas.globe');
  const ctx = canvas.getContext('2d');
  const stage = sec.querySelector('.globe-stage');
  const cityEls = [...sec.querySelectorAll('.gcity')];
  const cards = [...sec.querySelectorAll('.gcard')];
  const head = sec.querySelector('.globe-head');
  const CITIES = cityEls.map((el) => ({ lat: +el.dataset.lat, lon: +el.dataset.lon, el }));
  const rad = Math.PI / 180;
  let dots = [];
  let W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let progress = 0, t0 = performance.now();

  // live local time per city
  const clocks = [...sec.querySelectorAll('[data-tz]')].map((el) => ({ el, f: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz }) }));
  const tick = () => clocks.forEach((c) => { c.el.textContent = c.f.format(new Date()); });
  tick(); setInterval(tick, 15000);

  fetch('/assets/land.json').then((r) => r.json()).then((a) => {
    for (let i = 0; i < a.length; i += 2) dots.push([a[i] / 10 * rad, a[i + 1] / 10 * rad]);
  });

  function size() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    const wide = W > 900;
    R = wide ? Math.min(W * 0.3, H * 0.4) : Math.min(W * 0.46, H * 0.3);
    cx = wide ? W * 0.64 : W / 2; cy = wide ? H * 0.55 : H * 0.44;
  }
  window.addEventListener('resize', size); size();

  // rotation targets: bring each city to the front, slightly above centre
  const target = (c) => [-c.lon, c.lat * 0.75];
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const angLerp = (a, b, t) => { let d = ((b - a + 540) % 360) - 180; return a + d * t; };

  // timeline (fraction of the pinned scroll)
  const N = CITIES.length;
  const P0 = 0.06, P1 = 0.80; // city tour window
  const seg = (P1 - P0) / N;
  function state(p) {
    // returns rotation, active city index, travel progress between cities
    if (p <= P0) { const t = ease(p / P0); const [l, f] = target(CITIES[0]); return { lam: lerp(l + 70, l, t), phi: lerp(f - 10, f, t), idx: 0, hold: t, travel: -1 }; }
    if (p >= P1) { const [l, f] = target(CITIES[N - 1]); return { lam: l - (p - P1) * 120, phi: f, idx: N - 1, hold: 1, travel: -1, out: (p - P1) / (1 - P1) }; }
    const k = Math.min(N - 1, Math.floor((p - P0) / seg));
    const local = (p - P0 - k * seg) / seg; // 0..1 inside this city's segment
    if (k === 0 || local > 0.38) { const [l, f] = target(CITIES[k]); return { lam: l, phi: f, idx: k, hold: clamp((local - (k === 0 ? 0 : 0.38)) / 0.2, 0, 1), travel: -1 }; }
    const t = ease(local / 0.38);
    const [l0, f0] = target(CITIES[k - 1]); const [l1, f1] = target(CITIES[k]);
    return { lam: angLerp(l0, l1, t), phi: lerp(f0, f1, t), idx: k, hold: 0, travel: t, from: k - 1 };
  }

  function project(lat, lon, lam, phi) {
    const l = lon + lam * rad, p0 = phi * rad;
    const cosc = Math.sin(p0) * Math.sin(lat) + Math.cos(p0) * Math.cos(lat) * Math.cos(l);
    const x = Math.cos(lat) * Math.sin(l);
    const y = Math.cos(p0) * Math.sin(lat) - Math.sin(p0) * Math.cos(lat) * Math.cos(l);
    return [x, y, cosc];
  }
  // great-circle point between two cities, t 0..1
  function slerp(a, b, t) {
    const A = [Math.cos(a.lat * rad) * Math.cos(a.lon * rad), Math.cos(a.lat * rad) * Math.sin(a.lon * rad), Math.sin(a.lat * rad)];
    const B = [Math.cos(b.lat * rad) * Math.cos(b.lon * rad), Math.cos(b.lat * rad) * Math.sin(b.lon * rad), Math.sin(b.lat * rad)];
    const d = Math.acos(clamp(A[0] * B[0] + A[1] * B[1] + A[2] * B[2], -1, 1));
    const s = Math.sin(d) || 1e-6, wa = Math.sin((1 - t) * d) / s, wb = Math.sin(t * d) / s;
    const v = [A[0] * wa + B[0] * wb, A[1] * wa + B[1] * wb, A[2] * wa + B[2] * wb];
    return [Math.asin(v[2]), Math.atan2(v[1], v[0])];
  }

  function draw(now) {
    const s = state(progress);
    const out = s.out ? ease(clamp(s.out / 0.55, 0, 1)) : 0;
    const scale = 1 - out * 0.62;
    const r = R * scale, ox = cx + (W / 2 - cx) * out, oy = cy + (H * 0.12 - cy) * out;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 1 - out * 0.85;

    // atmosphere
    const g = ctx.createRadialGradient(ox, oy, r * 0.6, ox, oy, r * 1.35);
    g.addColorStop(0, 'rgba(43,58,200,0.10)'); g.addColorStop(0.75, 'rgba(43,58,200,0.16)'); g.addColorStop(1, 'rgba(43,58,200,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ox, oy, r * 1.35, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(111,125,255,0.22)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(ox, oy, r, 0, Math.PI * 2); ctx.stroke();

    // land dots (LED-like)
    const ds = Math.max(1.5, r / 170);
    for (let i = 0; i < dots.length; i++) {
      const [x, y, c] = project(dots[i][0], dots[i][1], s.lam, s.phi);
      if (c <= 0) continue;
      ctx.fillStyle = `rgba(${Math.round(90 + 140 * c)},${Math.round(105 + 130 * c)},255,${(0.25 + 0.75 * c).toFixed(3)})`;
      ctx.fillRect(ox + x * r - ds / 2, oy - y * r - ds / 2, ds, ds);
    }

    // arcs travelled so far
    const drawArc = (a, b, upto) => {
      ctx.beginPath(); let started = false;
      const steps = 48;
      for (let j = 0; j <= steps * upto; j++) {
        const t = j / steps; const [la, lo] = slerp(a, b, t);
        const alt = 1 + Math.sin(Math.PI * t) * 0.18;
        const [x, y, c] = project(la, lo, s.lam, s.phi);
        if (c < -0.05) { started = false; continue; }
        const X = ox + x * r * alt, Y = oy - y * r * alt;
        started ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); started = true;
      }
      ctx.stroke();
    };
    ctx.lineWidth = 1.4; ctx.shadowColor = 'rgba(84,101,255,0.9)'; ctx.shadowBlur = 10;
    ctx.strokeStyle = 'rgba(160,170,255,0.85)';
    for (let k = 1; k <= s.idx; k++) {
      const upto = k === s.idx && s.travel >= 0 ? s.travel : 1;
      drawArc(CITIES[k - 1], CITIES[k], upto);
    }
    ctx.shadowBlur = 0;

    // city markers + pulse
    const t = (now - t0) / 1000;
    CITIES.forEach((c, k) => {
      const [x, y, cz] = project(c.lat * rad, c.lon * rad, s.lam, s.phi);
      c.sx = ox + x * r; c.sy = oy - y * r; c.vis = cz;
      if (cz <= 0) return;
      const active = k === s.idx && s.travel < 0;
      const visited = k <= s.idx;
      ctx.fillStyle = visited ? '#fff' : 'rgba(255,255,255,0.45)';
      ctx.beginPath(); ctx.arc(c.sx, c.sy, active ? 4.5 : 2.6, 0, Math.PI * 2); ctx.fill();
      if (active) {
        for (let w = 0; w < 3; w++) {
          const ph = ((t * 0.7 + w / 3) % 1);
          ctx.strokeStyle = `rgba(111,125,255,${(1 - ph) * 0.9})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(c.sx, c.sy, 6 + ph * 46, 0, Math.PI * 2); ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;

    // overlays
    cityEls.forEach((el, k) => {
      const on = k === s.idx && s.travel < 0 && !s.out ? s.hold : 0;
      const o = s.out ? Math.max(0, 1 - s.out * 4) * (k === s.idx ? 1 : 0) : on;
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translateY(${(1 - o) * 24}px)`;
      el.classList.toggle('on', o > 0.5);
    });
    if (head) head.style.opacity = (1 - clamp((progress - 0.02) / 0.05, 0, 1) * 0.65 + (s.out ? clamp(s.out * 2, 0, 1) * 0.65 : 0)).toFixed(3);

    // cards fly out from the city points and assemble
    const cardT = s.out ? clamp((s.out - 0.25) / 0.6, 0, 1) : 0;
    stage.classList.toggle('cards-on', cardT > 0.98);
    cards.forEach((card, k) => {
      const ct = ease(clamp(cardT * 1.4 - k * 0.1, 0, 1));
      if (!card._rect || card._w !== W) { card.style.transform = ''; const rr = card.getBoundingClientRect(); const sr = canvas.getBoundingClientRect(); card._rect = { x: rr.left - sr.left + rr.width / 2, y: rr.top - sr.top + rr.height / 2 }; card._w = W; }
      const c = CITIES[k]; const fx = (c.sx ?? cx) - card._rect.x, fy = (c.sy ?? cy) - card._rect.y;
      card.style.opacity = ct.toFixed(3);
      card.style.transform = ct >= 1 ? '' : `translate(${fx * (1 - ct)}px, ${fy * (1 - ct)}px) scale(${0.15 + 0.85 * ct}) rotate(${(1 - ct) * (k % 2 ? 8 : -8)}deg)`;
      card.style.pointerEvents = ct > 0.9 ? 'auto' : 'none';
    });
  }

  if (RM) { // static: globe on first city, cards visible
    sec.classList.add('globe-static');
    const once = () => { progress = P0 + seg * 0.7; draw(performance.now()); };
    setTimeout(once, 300);
    return;
  }
  sec.classList.add('globe-on');
  size();
  window.addEventListener('resize', () => cards.forEach((c) => { c._rect = null; }));

  const update = () => {
    const r = sec.getBoundingClientRect();
    progress = clamp(-r.top / (r.height - window.innerHeight), 0, 1);
  };
  window.addEventListener('scroll', update, { passive: true }); update();
  let visible = false;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(sec);
  (function loop(now) { if (visible) { if (Math.abs(canvas.clientWidth - W) > 1 || Math.abs(canvas.clientHeight - H) > 1) { size(); cards.forEach((c) => { c._rect = null; }); } update(); draw(now); } requestAnimationFrame(loop); })(performance.now());
})();
