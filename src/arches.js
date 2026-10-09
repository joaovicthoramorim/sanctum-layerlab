/* SANCTUM — "Sacred Spaces": gothic arches that open into each city (LAYER LAB concept). */
(() => {
  const sec = document.querySelector('.arch-sec');
  if (!sec) return;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = sec.querySelector('.arch-stage');
  const head = sec.querySelector('.arch-head');
  const row = sec.querySelector('.arch-row');
  const arches = [...sec.querySelectorAll('.arch')];
  const wins = arches.map((a) => a.querySelector('.arch-win'));
  const portals = [...sec.querySelectorAll('.pw')];
  const infos = [...sec.querySelectorAll('.ainfo')];
  const dots = [...sec.querySelectorAll('.arch-progress i')];
  const N = arches.length;

  // live local time
  const clocks = [...sec.querySelectorAll('[data-tz]')].map((el) => ({ el, f: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz }) }));
  const tick = () => clocks.forEach((c) => { c.el.textContent = c.f.format(new Date()); });
  tick(); setInterval(tick, 15000);

  if (RM) { sec.classList.add('arch-static'); return; }
  sec.classList.add('arch-on');

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;

  const P_IN = 0.09, P_END = 0.93, SEG = (P_END - P_IN) / N;
  let slots = [], SW = 0, SH = 0;
  function measure() {
    const s = stage.getBoundingClientRect(); SW = s.width; SH = s.height;
    slots = wins.map((w) => { const r = w.getBoundingClientRect(); return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height }; });
  }
  // "inside the window": the arch grows past the viewport so only the top of the pointed arch frames the view
  const full = () => ({ x: -SW * 0.14, y: -SH * 0.4, w: SW * 1.28, h: SH * 1.42 });

  let progress = 0;
  function update() {
    const r = sec.getBoundingClientRect();
    progress = clamp(-r.top / (r.height - window.innerHeight), 0, 1);
  }

  function render() {
    const p = progress;
    // arches rise in
    const rise = clamp(p / P_IN, 0, 1);
    arches.forEach((a, k) => {
      const t = ease(clamp(rise * 1.6 - k * 0.12, 0, 1));
      a.style.setProperty('--rise', t.toFixed(3));
    });

    // which city is open
    let idx = -1, e = 0, local = 0;
    if (p > P_IN && p < P_END) {
      idx = Math.min(N - 1, Math.floor((p - P_IN) / SEG));
      local = (p - P_IN - idx * SEG) / SEG;
      if (local < 0.3) e = ease(local / 0.3);
      else if (local < 0.74) e = 1;
      else e = 1 - ease((local - 0.74) / 0.26);
    }
    measure();
    const F = full();
    portals.forEach((pw, k) => {
      if (k !== idx || e <= 0.001) { pw.style.visibility = 'hidden'; wins[k].style.opacity = ''; return; }
      const s = slots[k]; if (!s) return;
      pw.style.visibility = 'visible';
      pw.style.left = lerp(s.x, F.x, e) + 'px'; pw.style.top = lerp(s.y, F.y, e) + 'px';
      pw.style.width = lerp(s.w, F.w, e) + 'px'; pw.style.height = lerp(s.h, F.h, e) + 'px';
      pw.style.setProperty('--zoom', (1.14 - 0.14 * clamp((local - 0.3) / 0.44, 0, 1)).toFixed(3));
      pw.style.setProperty('--shade', e.toFixed(3));
      wins[k].style.opacity = '0';
    });
    infos.forEach((el, k) => {
      const o = k === idx ? clamp((e - 0.82) / 0.18, 0, 1) : 0;
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translateY(${(1 - o) * 28}px)`;
      el.classList.toggle('on', o > 0.5);
    });
    const open = idx >= 0 ? e : 0;
    row.style.opacity = (1 - open * 0.85).toFixed(3);
    head.style.opacity = (1 - open).toFixed(3);
    dots.forEach((d, k) => d.classList.toggle('on', k === idx && e > 0.5));
    sec.classList.toggle('is-open', open > 0.5);
  }

  window.addEventListener('resize', () => { measure(); render(); });
  window.addEventListener('scroll', update, { passive: true });
  let visible = false;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) measure(); }).observe(sec);
  measure(); update(); render();
  (function loop() { if (visible) { update(); render(); } requestAnimationFrame(loop); })();
})();
