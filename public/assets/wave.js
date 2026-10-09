/* SANCTUM — "Frequency": one sound wave that opens into each city (LAYER LAB concept). */
(() => {
  const sec = document.querySelector('.wave-sec');
  if (!sec) return;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = sec.querySelector('.wave-stage');
  const cv = sec.querySelector('canvas.wave-cv');
  const ctx = cv.getContext('2d');
  const head = sec.querySelector('.wave-head');
  const marks = [...sec.querySelectorAll('.wmark')];
  const portals = [...sec.querySelectorAll('.wp')];
  const infos = [...sec.querySelectorAll('.wave-infos .ainfo')];
  const N = marks.length;
  const XS = marks.map((m) => +m.dataset.x);
  const ENERGY = [1, 0.85, 0.55, 0.9, 1];
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const clocks = [...sec.querySelectorAll('[data-tz]')].map((el) => ({ el, f: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz }) }));
  const tick = () => clocks.forEach((c) => { c.el.textContent = c.f.format(new Date()); });
  tick(); setInterval(tick, 15000);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;

  let W = 0, H = 0, LY = 0;
  function size() {
    const r = stage.getBoundingClientRect(); W = r.width; H = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    LY = H * (W > 900 ? 0.7 : 0.6);
    stage.style.setProperty('--ly', LY + 'px');
  }

  if (RM) { sec.classList.add('wave-static'); size(); drawWave(1, 0.5, 0, -1, 0); return; }
  sec.classList.add('wave-on');
  size();
  window.addEventListener('resize', size);

  const P_IN = 0.07, P_END = 0.97, SEG = (P_END - P_IN) / N;
  let progress = 0;
  const update = () => { const r = sec.getBoundingClientRect(); progress = clamp(-r.top / (r.height - window.innerHeight), 0, 1); };

  function drawWave(draw, cursor, t, active, beat) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const sigma = W * (W > 900 ? 0.035 : 0.05);
    const cx = cursor * W;
    const yAt = (x) => {
      let y = Math.sin(x * 0.018 + t * 1.6) * 3 + Math.sin(x * 0.041 - t * 2.3) * 2;
      for (let k = 0; k < N; k++) {
        const mx = XS[k] * W;
        const played = cx >= mx - sigma * 0.5 ? 1 : 0.18;
        const boost = k === active ? 1 + beat * 1.6 : 1;
        const g = Math.exp(-((x - mx) ** 2) / (2 * sigma * sigma));
        y += g * ENERGY[k] * played * boost * H * 0.07 * Math.sin((x - mx) * 0.22 + t * 7 + k);
      }
      // live wobble around the playhead
      y += Math.exp(-((x - cx) ** 2) / (2 * (sigma * 1.6) ** 2)) * H * 0.025 * Math.sin(x * 0.12 - t * 9);
      return LY + y;
    };
    const xmax = W * draw;
    const pass = (from, to, style, width, blur) => {
      if (to <= from) return;
      ctx.beginPath();
      for (let x = from; x <= to; x += 3) { const y = yAt(x); x === from ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.strokeStyle = style; ctx.lineWidth = width; ctx.shadowColor = 'rgba(84,101,255,.9)'; ctx.shadowBlur = blur; ctx.stroke();
    };
    // echoes
    ctx.save(); ctx.translate(0, 10); pass(0, xmax, 'rgba(43,58,200,.25)', 1, 0); ctx.restore();
    ctx.save(); ctx.translate(0, -10); pass(0, xmax, 'rgba(43,58,200,.18)', 1, 0); ctx.restore();
    // unplayed + played
    pass(Math.min(cx, xmax), xmax, 'rgba(111,125,255,.35)', 1.2, 0);
    pass(0, Math.min(cx, xmax), 'rgba(160,170,255,.95)', 1.8, 14);
    ctx.shadowBlur = 0;
    // playhead
    if (cursor > 0 && cursor < 1 && draw >= 1) {
      const y = yAt(cx);
      const gl = ctx.createRadialGradient(cx, y, 0, cx, y, 26);
      gl.addColorStop(0, 'rgba(255,255,255,.95)'); gl.addColorStop(0.25, 'rgba(111,125,255,.7)'); gl.addColorStop(1, 'rgba(43,58,200,0)');
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(cx, y, 26, 0, Math.PI * 2); ctx.fill();
    }
  }

  function render(now) {
    const p = progress, t = now / 1000;
    const draw = ease(clamp(p / P_IN, 0, 1));
    let idx = -1, open = 0, dock = 0, cursor = 0, beat = 0, local = 0;
    if (p <= P_IN) cursor = 0;
    else if (p >= P_END) cursor = 1;
    else {
      idx = Math.min(N - 1, Math.floor((p - P_IN) / SEG));
      local = (p - P_IN - idx * SEG) / SEG;
      const from = idx === 0 ? 0.02 : XS[idx - 1], to = XS[idx];
      if (local < 0.26) cursor = lerp(from, to, ease(local / 0.26));
      else if (local < 0.86) cursor = to;
      else cursor = lerp(to, idx === N - 1 ? 0.99 : (to + XS[idx + 1]) / 2, ease((local - 0.86) / 0.14));
      beat = local > 0.18 && local < 0.4 ? Math.sin(((local - 0.18) / 0.22) * Math.PI) : 0;
      if (local >= 0.3 && local < 0.48) open = ease((local - 0.3) / 0.18);
      else if (local >= 0.48) open = 1;
      if (local >= 0.72) dock = ease(clamp((local - 0.72) / 0.18, 0, 1));
    }
    drawWave(draw, cursor, t, idx, beat);

    // banner geometry (where each city docks on the wave)
    const wide = W > 900;
    const bw = wide ? Math.min(W * 0.168, 320) : W * 0.17, bh = wide ? Math.min(H * 0.52, bw * 1.95) : H * 0.3;
    stage.style.setProperty('--bw', bw + 'px'); stage.style.setProperty('--bh', bh + 'px');
    const fullness = open * (1 - dock);
    const ended = p >= P_END;

    portals.forEach((pw, k) => {
      const mx = XS[k] * W;
      const B = { x: mx - bw / 2, y: LY - bh / 2, w: bw, h: bh };
      let R = null, docked = false;
      if (ended || k < idx || (k === idx && dock >= 1)) { R = B; docked = true; }
      else if (k === idx && open > 0.001) {
        const v = ease(clamp(open / 0.45, 0, 1)), hp = ease(clamp((open - 0.35) / 0.65, 0, 1));
        const hh = lerp(H * 0.16, H, v), cyy = lerp(LY, H / 2, v);
        const S = { x: lerp(mx - 1.5, 0, hp), y: cyy - hh / 2, w: lerp(3, W, hp), h: hh };
        R = dock > 0 ? { x: lerp(S.x, B.x, dock), y: lerp(S.y, B.y, dock), w: lerp(S.w, B.w, dock), h: lerp(S.h, B.h, dock) } : S;
      }
      if (!R) { pw.style.visibility = 'hidden'; pw.classList.remove('docked'); return; }
      pw.style.visibility = 'visible';
      pw.style.left = R.x + 'px'; pw.style.top = R.y + 'px'; pw.style.width = R.w + 'px'; pw.style.height = R.h + 'px';
      const sh = docked ? 0 : (k === idx ? fullness : 0);
      pw.style.setProperty('--shade', sh.toFixed(3));
      pw.style.setProperty('--zoom', (docked ? 1 : 1.18 - 0.18 * open).toFixed(3));
      pw.style.borderRadius = (docked ? 10 : 10 * dock) + 'px';
      pw.classList.toggle('docked', docked);
      pw.classList.toggle('active', k === idx && !docked);
    });
    infos.forEach((el, k) => {
      const o = k === idx ? clamp((fullness - 0.85) / 0.15, 0, 1) : 0;
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translateY(${(1 - o) * 28}px)`;
      el.classList.toggle('on', o > 0.5);
    });
    marks.forEach((m, k) => {
      m.classList.toggle('played', cursor >= XS[k] - 0.01);
      m.classList.toggle('active', k === idx && local > 0.2);
      m.classList.toggle('docked', ended || k < idx || (k === idx && dock >= 1));
    });
    head.style.opacity = (1 - fullness).toFixed(3);
    sec.classList.toggle('wave-end', p >= P_END - 0.005);
  }

  let visible = false;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) size(); }).observe(sec);
  window.addEventListener('scroll', update, { passive: true });
  update();
  (function loop(now) { if (visible) { if (Math.abs(stage.clientWidth - W) > 1 || Math.abs(stage.clientHeight - H) > 1) size(); update(); render(now); } requestAnimationFrame(loop); })(performance.now());
})();
