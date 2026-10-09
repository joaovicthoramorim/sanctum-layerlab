// SANCTUM concept site — static build (LAYER LAB). Run: node src/build.mjs  → writes into ../ (site root)
import { writeFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './data.mjs';
import * as PG from './pages.mjs';
import * as LG from './legal.mjs';

const SRC = dirname(fileURLToPath(import.meta.url));
const OUT = join(SRC, '..');
const { config: C } = D;
const css = readFileSync(join(SRC, 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').replace(/\s{2,}/g, ' ');
const appJs = readFileSync(join(SRC, 'app.js'), 'utf8');
writeFileSync(join(OUT, 'assets', 'app.js'), appJs);
writeFileSync(join(OUT, 'assets', 'arches.js'), readFileSync(join(SRC, 'arches.js'), 'utf8'));
writeFileSync(join(OUT, 'assets', 'wave.js'), readFileSync(join(SRC, 'wave.js'), 'utf8'));

const framesD = readdirSync(join(OUT, 'assets/seq/d')).filter((f) => f.endsWith('.webp')).length;
const framesM = readdirSync(join(OUT, 'assets/seq/m')).filter((f) => f.endsWith('.webp')).length;

const e = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => C.domain.replace(/\/$/, '') + p;
const today = new Date().toISOString().slice(0, 10);
const upcoming = (list) => list.filter((x) => !x.iso || x.iso.slice(0, 10) >= today);
const ext = 'target="_blank" rel="noopener"';
const arr = '<span class="arr" aria-hidden="true">→</span>';
const pages = [];

const NAV = [
  ['/classes/', 'Classes'], ['/memberships/', 'Membership'], ['/digital/', 'Digital'],
  ['/private-bookings/', 'Private'], ['/frequency-festival/', 'Festival'], ['/events-retreats/', 'Retreats'], ['/about/', 'About'],
];

const waveSvg = `<svg class="divider" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 C 120 30, 160 8, 240 30 S 360 52, 480 30 S 600 4, 720 30 S 840 56, 960 30 S 1080 10, 1200 30 S 1320 46, 1440 30" fill="none" stroke="#2b3ac8" stroke-width="1" opacity=".7"/></svg>`;

function layout({ path, title, desc, body, schema = [], image = '/assets/img/og.jpg', active = '' }) {
  const canon = abs(path);
  const robots = C.prototype ? 'noindex,nofollow' : 'index,follow';
  const nav = NAV.map(([h, l]) => `<a href="${h}"${active === h ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${e(title)}</title>
<meta name="description" content="${e(desc)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${canon}">
<meta name="theme-color" content="#070605">
<meta property="og:type" content="website"><meta property="og:site_name" content="SANCTUM">
<meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(desc)}">
<meta property="og:url" content="${canon}"><meta property="og:image" content="${abs(image)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23070605'/%3E%3Ctext x='16' y='23' font-family='Georgia' font-size='20' text-anchor='middle' fill='%23f3ece2'%3ES%3C/text%3E%3Ccircle cx='25' cy='8' r='3' fill='%233f7bff'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://cdn.prod.website-files.com" crossorigin><link rel="preload" as="font" type="font/otf" href="https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6924318a2ed5d4cd56895807_RoxboroughCF-Regular.otf" crossorigin><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
${path === '/' ? '<link rel="preload" as="image" href="/assets/seq/d/0001.webp" media="(min-width:769px)" fetchpriority="high"><link rel="preload" as="image" href="/assets/seq/m/0001.webp" media="(max-width:768px)" fetchpriority="high">' : ''}
<style>${css}</style>
<script>document.documentElement.classList.remove('no-js')</script>
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <a class="logo" href="/" aria-label="SANCTUM home"><img src="/assets/img/logo.svg" alt="SANCTUM" width="222" height="32"></a>
  <div class="hdr-right">
    <a class="btn btn-outline" href="/classes/">Book a class</a>
    <button class="wave-btn" type="button" data-menu aria-expanded="false" aria-controls="drawer" aria-label="Open menu"><svg viewBox="0 0 44 20" width="44" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 6c5-5 9 5 14 0s9-5 14 0 9 5 12 0"/><path d="M2 14c5-5 9 5 14 0s9-5 14 0 9 5 12 0"/></svg></button>
  </div>
</header>
<div class="drawer" id="drawer" hidden role="dialog" aria-modal="true" aria-label="Menu">
  <div class="drawer-top">
    <span class="kicker"><span class="dot"></span>Global mindful movement</span>
    <button class="close-btn" type="button" data-menu aria-label="Close menu"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
  </div>
  <div class="drawer-grid">
    <nav class="drawer-main" aria-label="Main">
      ${[['/', 'Home'], ...NAV, ['/faq/', 'FAQ']].map(([h, l], i) => `<a href="${h}" style="--i:${i}"${active === h ? ' aria-current="page"' : ''}><span class="n">0${i + 1}</span>${l}</a>`).join('')}
    </nav>
    <div class="drawer-side">
      <p class="kicker">Book a class</p>
      <ul>${D.cities.map((c) => `<li><a href="/classes/${c.slug}/">${c.name}</a></li>`).join('')}<li><a href="/events-retreats/">Global events</a></li></ul>
      <p class="kicker" style="margin-top:36px">Connect</p>
      <ul><li><a href="${C.social.instagram}" ${ext}>Instagram</a></li><li><a href="${C.social.spotify}" ${ext}>Spotify</a></li><li><a href="${C.social.linkedin}" ${ext}>LinkedIn</a></li></ul>
      <a class="btn btn-primary" style="margin-top:36px" href="/classes/">Book your first class ${arr}</a>
    </div>
  </div>
  <img class="drawer-logo" src="/assets/img/logo.svg" alt="" aria-hidden="true" width="222" height="32">
</div>
<main id="main">
${body}
</main>
${footer()}
<div class="mbar"><a class="btn btn-primary" href="/classes/">Book a class</a><a class="btn btn-ghost" href="/memberships/">Membership</a></div>
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/vendor/lenis.min.js" defer></script>
<script src="/assets/app.js" defer></script>
${path === '/' ? '<script src="/assets/wave.js" defer></script>' : ''}
</body>
</html>`;
}

function footer() {
  return `<footer class="ftr">
<div class="wrap">
  <div class="grid">
    <div>
      <img src="/assets/img/logo.svg" alt="SANCTUM" width="222" height="32" style="height:20px;width:auto" loading="lazy">
      <p class="tag">Move freely. <em style="color:var(--gold)">Vibrate higher.</em></p>
    </div>
    <div><h2>Classes</h2><ul>${D.cities.map((c) => `<li><a href="/classes/${c.slug}/">${c.name}</a></li>`).join('')}<li><a href="/events-retreats/">Global events</a></li></ul></div>
    <div><h2>Experience</h2><ul><li><a href="/memberships/">Membership</a></li><li><a href="/digital/">Sanctum Digital</a></li><li><a href="/private-bookings/">Private bookings</a></li><li><a href="/frequency-festival/">Frequency Festival</a></li><li><a href="/about/">About</a></li></ul></div>
    <div><h2>Sanctum</h2><ul><li><a href="/press/">Press</a></li><li><a href="/careers/">Careers</a></li><li><a href="/academy/">Academy</a></li><li><a href="/faq/">FAQs</a></li><li><a href="/terms/">T&amp;Cs</a></li><li><a href="/privacy/">Privacy policy</a></li></ul></div>
    <div><h2>Connect</h2><ul><li><a href="${C.social.instagram}" ${ext}>Instagram</a></li><li><a href="${C.social.spotify}" ${ext}>Spotify</a></li><li><a href="${C.social.linkedin}" ${ext}>LinkedIn</a></li><li><a href="${C.appStore}" ${ext}>App Store</a></li><li><a href="${C.playStore}" ${ext}>Google Play</a></li></ul></div>
  </div>
  <div class="base">
    <span>© SANCTUM. Brand assets © SANCTUM, used for presentation purposes only.</span>
    <span>Concept by <a href="${C.layerlab}" ${ext}>LAYER LAB</a> · Some scenes generated with AI.</span>
  </div>
</div>
</footer>`;
}

/* ---------------- schema ---------------- */
const org = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'SANCTUM', url: abs('/'), logo: abs('/assets/img/logo.svg'),
  description: D.about.lead, founder: { '@type': 'Person', name: 'Luuk Melisse' }, foundingLocation: 'Amsterdam',
  sameAs: Object.values(C.social),
};
const faqSchema = (list) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: list.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
const crumbs = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: abs(p) })) });
const eventSchema = (ev, city) => ev.iso ? ({
  '@context': 'https://schema.org', '@type': 'Event', name: `SANCTUM ${ev.name}`, startDate: ev.iso, eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled',
  location: { '@type': 'Place', name: ev.venue, address: { '@type': 'PostalAddress', addressLocality: city.name, addressCountry: city.country } },
  description: ev.text, organizer: { '@type': 'Organization', name: 'SANCTUM', url: abs('/') }, url: ev.url, image: abs('/assets/img/og.jpg'),
}) : null;

/* ---------------- shared blocks ---------------- */
const nextEvent = (c) => upcoming(c.events).sort((a, b) => (a.iso || '9').localeCompare(b.iso || '9'))[0] || c.events[0];
const TOUR = ['amsterdam', 'london', 'stockholm', 'dubai', 'new-york'];
const GEO = { amsterdam: [52.37, 4.9, 'Europe/Amsterdam'], london: [51.51, -0.13, 'Europe/London'], stockholm: [59.33, 18.07, 'Europe/Stockholm'], dubai: [25.2, 55.27, 'Asia/Dubai'], 'new-york': [40.71, -74.0, 'America/New_York'] };
const ARCHIMG = { amsterdam: 'church', london: 'studio', stockholm: 'chapel', dubai: 'dubai-film', 'new-york': 'nyc-film' };
const MIMG = { london: 'studio', amsterdam: 'church', dubai: 'dubai-film', stockholm: 'chapel' };
const memberCities = () => `<div class="mcities">${D.membership.cities.map((s) => { const c = D.cities.find((x) => x.slug === s); return `<a class="mcity reveal" href="${D.membership.url}" ${ext}><img src="/assets/img/${MIMG[s]}.webp" alt="" loading="lazy"><span class="mc-code">${c.code}</span><span class="mc-body"><span class="mc-name">${c.name}</span><span class="mc-sub">${e(c.venues.slice(0, 2).join(' · '))}</span></span><span class="mc-go">Become a member →</span></a>`; }).join('')}</div>`;
const cityCards = () => `<div class="cities">${D.cities.map((c) => {
  const n = nextEvent(c);
  return `<a class="city reveal" href="/classes/${c.slug}/"><img src="/assets/img/${c.img}.webp" alt="" loading="lazy"><span class="code">${c.code}</span><h3>${c.name}</h3><p class="next"><b>Next</b>${e(n.name)} · ${e(n.date)}</p><span class="go">View classes →</span></a>`;
}).join('')}</div>`;

const eventList = (list, cityName) => `<div class="events">${list.map((ev) => `<a class="event reveal" href="${ev.url}" ${ext}>
  <time${ev.iso ? ` datetime="${ev.iso}"` : ''}>${e(ev.date)}${ev.time ? ` · ${ev.time}` : ''}</time>
  <div><h3>${e(ev.name)}</h3><div class="venue">${e(ev.venue || ev.place)}${cityName ? '' : ''}</div><p>${e(ev.text)}</p></div>
  <span class="cta">Info &amp; tickets →</span></a>`).join('')}</div>`;

const faqBlock = (list) => `<div class="faq">${list.map((f) => `<details class="reveal"><summary>${e(f.q)}</summary><p>${e(f.a)}</p></details>`).join('')}</div>`;

const storeBadges = (cls = '') => `<div class="sbadges ${cls}"><a class="btn btn-primary sb-dl" href="${C.appStore}" data-play="${C.playStore}" ${ext}>Download the app ${arr}</a><a class="sbadge" href="${C.appStore}" ${ext} aria-label="Download on the App Store"><img src="/assets/img/badge-apple.png" alt="Download on the App Store" width="479" height="160"></a><a class="sbadge" href="${C.playStore}" ${ext} aria-label="Get it on Google Play"><img src="/assets/img/badge-play.png" alt="Get it on Google Play" width="564" height="168"></a></div>`;
const RITUALS = [
  ['01', 'Activation', 'Energy boosters', 'Morning energizers to wake the body up and set the tone for the day.', 'dc-activation'],
  ['02', 'Meditation', 'Screen-free grounding', 'Daily meditations led by voice and sound — close your eyes and drop in.', 'dc-meditation'],
  ['03', 'Nature walks', 'Mindful walks', 'Audio-led journeys to take outside. Put your headphones on and move.', 'dc-nature'],
  ['04', 'Signature Sequence', 'Transformative full-body reset', 'The Sanctum class, distilled — music, movement, breath and stillness.', 'dc-signature'],
];
const digitalStage = (wide = false) => `<div class="dphones${wide ? ' has-wide' : ''}" aria-hidden="true">
  <img class="dph dph1" src="/assets/img/app-1.webp" alt="" loading="lazy" width="395" height="832">
  <img class="dph dph3" src="/assets/img/app-2.webp" alt="" loading="lazy" width="395" height="832">
  <img class="dph dph2" src="/assets/img/app-3.webp" alt="" loading="lazy" width="297" height="624">
  ${wide ? '<img class="dph dphw" src="/assets/img/player-wide.webp" alt="" loading="lazy" width="640" height="360">' : ''}
  <span class="ds-live"><i></i>Now playing · Unbound Energy</span>
</div>`;
const digitalCopy = () => `<div class="dcopy">
  <p class="kicker reveal"><span class="dot"></span>Sanctum Digital</p>
  <h2 class="reveal">Anywhere.<br><em>Anytime.</em></h2>
  <p class="lead reveal">${e(D.digital.lead)} Morning energizers, daily meditations, nature walks and the Signature Sequence — new experiences every week.</p>
  <div class="reveal" style="margin-top:36px"><a class="btn btn-primary" href="/digital/">Discover Sanctum Digital ${arr}</a></div>
</div>`;
const COMM = [
  [D.cities[0].reviews[0], 'Class review', 'London'],
  ['Totally uplifting and fun, not to mention good for you.', 'Guy Heywood', 'Professional Luxury Hotelier'],
  [D.cities[2].reviews[0], 'Class review', 'Dubai'],
  ['Better than therapy.', 'The Times', ''],
  [D.cities[0].reviews[1], 'Class review', 'London'],
  ['This morning started at 7am with an unexpected CEO meeting coached by mindful wellness experts SANCTUM – I cried twice.', 'Ben Lephilibert', 'CEO, LightBlue'],
];
const finalCta = (h = 'Your first class<br><em>is waiting.</em>') => `<section class="final cobalt"><div class="wrap">${waveSvg}<h2 class="reveal">${h}</h2><p class="lead reveal" style="margin:28px auto 0;text-align:center">55 minutes. Music, movement, breath and stillness. Come for the movement — stay for the feeling.</p><div class="ctas reveal"><a class="btn btn-primary" href="/classes/">Book your first class ${arr}</a><a class="btn btn-ghost" href="/memberships/">Become a member</a></div></div></section>`;

/* ---------------- HOME ---------------- */
function home() {
  const W = {
    bounds: [0, 0.2067, 0.4, 0.5933, 0.7867],
    text: [[0, 0.13], [0.24, 0.355], [0.43, 0.56], [0.625, 0.75], [0.84, 0.97]],
    wave: [[0.25, 0.5], [1, 1.7], [0.45, 0.35], [0.1, 0.2], [0.85, 1.2]],
  };
  const posters = ['/assets/img/poster-3.webp', '/assets/img/poster-12.webp', '/assets/img/poster-19.webp', '/assets/img/poster-26.webp', '/assets/img/poster-36.webp'];
  const J = D.journey;
  const chap = (c, k) => {
    if (k === 0) return `<div class="chap" data-poster="${posters[k]}"><h1><span class="h1k">SANCTUM · Mindful movement classes in London, Amsterdam, Dubai, Stockholm &amp; New York</span><span class="display">${e(c.title)}</span></h1><p>${e(c.text)}</p><div class="ctas"><a class="btn btn-primary" href="/classes/">Book a class ${arr}</a><a class="btn btn-ghost" href="#film">Watch the film</a></div></div>`;
    if (k === J.length - 1) return `<div class="chap chap-final" data-poster="${posters[k]}"><h2 class="display">${e(c.title)}<br><em>Euphoria.</em></h2><p>${e(c.text)}</p><div class="ctas"><a class="btn btn-primary" href="/classes/">Book your first class ${arr}</a><a class="btn btn-ghost" href="#cities">Find your city</a></div></div>`;
    return `<div class="chap" data-poster="${posters[k]}"><h2 class="display">${e(c.title)}</h2><p>${e(c.text)}</p></div>`;
  };
  const body = `
<section class="journey" aria-label="The 55-minute Sanctum journey" data-frames-d="${framesD}" data-frames-m="${framesM}" data-windows='${JSON.stringify(W)}'>
  <div class="stage">
    <picture><source media="(max-width:768px)" srcset="/assets/seq/m/0001.webp"><img class="poster" src="/assets/seq/d/0001.webp" alt="" aria-hidden="true" fetchpriority="high" width="1600" height="900"></picture>
    <canvas class="seq" aria-hidden="true"></canvas>
    <div class="shade"></div>
    <canvas class="wave" aria-hidden="true"></canvas>
    <div class="breath" aria-hidden="true"><span class="in">Breathe in</span><span class="out">Breathe out</span></div>
    <div class="clock" aria-hidden="true"><span>Class time</span><span class="time">00:00</span><ol>${J.map((c) => `<li>${c.label}</li>`).join('')}</ol></div>
    ${J.map(chap).join('')}
    <a class="skipj" href="#film">Skip the journey ↓</a>
    <span class="loader" aria-hidden="true"></span>
  </div>
</section>

<section class="film" id="film" aria-labelledby="film-h">
  <div class="wrap film-head">
    <p class="kicker reveal"><span class="dot"></span>Global mindful movement</p>
    <h2 id="film-h" class="reveal">Feel it <em>before you live it.</em></h2>
    <p class="lead reveal">Press play and step inside a Sanctum day — the music, the sweat, the breath, the release. This is what you are about to feel.</p>
  </div>
  <div class="film-stage">
    <div class="film-frame">
      <video muted loop playsinline preload="none" data-lazy data-src="/assets/video/brandfilm.mp4" poster="/assets/img/brandfilm-poster.webp" aria-label="SANCTUM brand film"></video>
      <button class="sound" type="button" aria-pressed="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path class="w" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/><path class="x" d="M16 9l5 6M21 9l-5 6"/></svg><span class="lbl">Sound on</span></button>
    </div>
    <img class="film-logo" src="/assets/img/logo.svg" alt="" aria-hidden="true" width="222" height="32">
  </div>
  <p class="film-statement reveal">SANCTUM is an unmatched moving sequence to empower the body and expand the mind, designed to unlock human potential by guiding you to your physical edge and mindful euphoria — <em>within a single class.</em></p>
</section>

<section class="sec reset light" id="discover">
  <div class="wrap reset-grid">
    <div class="reset-copy">
      <p class="kicker reveal"><span class="dot"></span>Daily classes</p>
      <h2 class="reveal">Your weekly <em>reset.</em></h2>
      <p class="lead reveal">More than a workout. More than meditation. Your weekly fix to recharge your body, clear your mind and awaken your spirit.</p>
      <p class="lead reveal">Sanctum is a 55-minute, music-led immersive class fusing high-intensity movement, breathwork, meditation and storytelling.</p>
      <a class="btn btn-primary reveal" href="/classes/">Discover classes ${arr}</a>
    </div>
    <div class="reset-art">
      <span class="reset-word" aria-hidden="true">move · breathe · release ·</span>
      <figure class="ph ph-big"><div class="mask"><img src="/assets/img/luuk-open.webp" alt="Sanctum founder Luuk Melisse, arms open, leading a class by the sea" loading="lazy" width="1170" height="1170"></div></figure>
      <figure class="ph ph-small"><div class="ghost" aria-hidden="true"><img src="/assets/img/luuk-move.webp" alt="" loading="lazy"></div><div class="mask"><img src="/assets/img/luuk-move.webp" alt="Luuk guiding participants through a Sanctum class" loading="lazy" width="1170" height="1170"></div></figure>
    </div>
  </div>
  <div class="wrap">
    <div class="press">${D.press.map((p) => `<figure class="reveal"><blockquote>“${e(p.quote)}”</blockquote><figcaption>${e(p.source)}</figcaption></figure>`).join('')}</div>
  </div>
</section>

<section class="wave-sec" id="cities" aria-labelledby="cities-h">
  <div class="wave-stage">
    <div class="wave-head wrap"><p class="kicker"><span class="dot"></span>Find your Sanctum</p><h2 id="cities-h">Five cities. <em>One ritual.</em></h2><p class="lead">One frequency, playing around the world. Follow the wave.</p></div>
    <canvas class="wave-cv" aria-hidden="true"></canvas>
    <div class="wave-marks">${TOUR.map((s, k) => { const c = D.cities.find((x) => x.slug === s); const x = [0.12, 0.31, 0.5, 0.69, 0.88][k]; const n = nextEvent(c); return `<a class="wmark" href="/classes/${c.slug}/" data-x="${x}" style="--x:${x * 100}%"><span class="wthumb"><img src="/assets/img/${ARCHIMG[s]}.webp" alt="" loading="lazy"></span><span class="wcode">${c.code}</span><span class="wname">${c.name}</span><span class="wcard"><span class="wc-code">${c.code}</span><span class="wc-body"><span class="wc-name">${c.name}</span><span class="wc-next"><b>Next</b>${e(n.name)} · ${e(n.date)}</span><span class="wc-go">View classes →</span></span></span></a>`; }).join('')}</div>
    <div class="wave-portals" aria-hidden="true">${TOUR.map((s) => `<div class="wp"><img src="/assets/img/${ARCHIMG[s]}.webp" alt="" loading="lazy"></div>`).join('')}</div>
    <div class="wave-infos">${TOUR.map((s) => { const c = D.cities.find((x) => x.slug === s); const g = GEO[s]; const n = nextEvent(c); return `<div class="ainfo"><span class="code">${c.code} · <span data-tz="${g[2]}">--:--</span> local time</span><h3>${c.name}</h3><p class="where">${e(c.intro)}</p><p class="nx"><b>Next</b>${e(n.name)} · ${e(n.date)}</p><a class="btn btn-primary" href="/classes/${c.slug}/">View classes ${arr}</a></div>`; }).join('')}</div>
  </div>
</section>

<section class="sec msec light" id="membership">
  <div class="wrap">
    <div class="msec-head">
      <p class="kicker reveal"><span class="dot"></span>Membership</p>
      <h2 class="reveal">Make Sanctum <em>your ritual.</em></h2>
      <p class="lead reveal">Sanctum is meant to be a habit — something you return to day after day, week after week, to stay grounded, clear and connected. Our memberships are designed to support that commitment.</p>
    </div>
    <div class="mtrip" aria-label="Moments from Sanctum classes">
      <figure class="mph"><div class="mph-in"><img src="/assets/img/member-guide.webp" alt="A Sanctum guide laughing with a participant before class" loading="lazy" width="1100" height="1060"><figcaption>Come for the <em>movement.</em></figcaption></div></figure>
      <figure class="mph"><div class="mph-in"><img src="/assets/img/member-hug.webp" alt="Two participants hugging after a Sanctum class at sunset" loading="lazy" width="1100" height="1100"><figcaption>Because it feels better <em>together.</em></figcaption></div></figure>
      <figure class="mph"><div class="mph-in"><img src="/assets/img/member-feel.webp" alt="A participant moved to tears, hand on heart, during a Sanctum class" loading="lazy" width="1100" height="1100"><figcaption>Stay for the <em>feeling.</em></figcaption></div></figure>
    </div>
    <div class="msec-cta reveal"><a class="btn btn-primary" href="/memberships/">Discover memberships ${arr}</a></div>
  </div>
  </div>
</section>

<section class="sec dsec light" id="digital">
  <div class="wrap dgrid">
    ${digitalStage()}
    ${digitalCopy()}
  </div>
</section>

<section class="sec hpb" style="padding-top:0" aria-labelledby="hpb-h">
  <div class="hpb-frame">
    <img src="/assets/img/private-glacier.webp" alt="A Sanctum private group moving together on a glacier" loading="lazy" width="1600" height="1067">
    <div class="wrap hpb-copy">
      <p class="kicker reveal"><span class="dot"></span>Private bookings</p>
      <h2 class="reveal" id="hpb-h">Curated <em>exclusive</em> experiences.</h2>
      <p class="lead reveal">For teams, groups and communities seeking a deeper, more visceral form of connection — from corporate activations and conferences to private celebrations, anywhere in the world.</p>
      <div class="reveal" style="margin-top:34px"><a class="btn btn-primary" href="/private-bookings/">Discover private bookings ${arr}</a></div>
    </div>
  </div>
</section>

<section class="sec light hfest" aria-labelledby="fest-h">
  <div class="wrap hfest-in">
    <div class="hfest-copy">
      <p class="kicker reveal"><span class="dot"></span>Communal wellness</p>
      <h2 class="reveal" id="fest-h"><span>Frequency</span> <em>Festival.</em></h2>
      <p class="lead reveal">${e(D.festival.lead)}</p>
      <div class="reveal" style="margin-top:34px"><a class="btn btn-primary" href="/frequency-festival/">Discover the festival ${arr}</a></div>
    </div>
    <div class="hfest-art reveal">
      <div class="hf-arch"><img src="https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693800f7a2875f59ce28a671_image00003%202.jpg" alt="Thousands moving together at Sanctum Frequency Festival" loading="lazy"></div>
      <div class="hf-inset"><img src="/assets/img/festival-arena.webp" alt="" loading="lazy"></div>
      <svg class="hf-badge" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="hfc" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><circle cx="100" cy="100" r="99" /><text><textPath href="#hfc" textLength="486" lengthAdjust="spacing">Move · Breathe · Release · Connect ·</textPath></text><path class="hf-wave" d="M70 100 q7.5 -14 15 0 t15 0 t15 0 t15 0"/></svg>
    </div>
  </div>
</section>

<section class="sec hpb" style="padding-top:0" aria-labelledby="hev-h">
  <div class="hpb-frame">
    <img src="${D.retreatsPage.hero}" alt="Sanctum retreat participants moving together outdoors" loading="lazy">
    <div class="wrap hpb-copy">
      <p class="kicker reveal"><span class="dot"></span>Global residencies</p>
      <h2 class="reveal" id="hev-h">Events <em>&amp; retreats.</em></h2>
      <p class="lead reveal">Explore the world with us through transformative retreats and special events — immersive journeys where movement, community, nature and ritual realign body, mind and spirit.</p>
      <div class="reveal" style="margin-top:34px"><a class="btn btn-primary" href="/events-retreats/">Discover events &amp; retreats ${arr}</a></div>
    </div>
  </div>
</section>

<section class="comm" aria-labelledby="comm-h">
  <div class="wrap comm-head"><p class="kicker reveal"><span class="dot"></span>From our community</p><h2 class="reveal" id="comm-h" style="margin-top:22px">Felt by <em>thousands.</em></h2></div>
  <div class="comm-stage">
    <div class="comm-rows" aria-hidden="true">${[[1, 2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15, 16]].map((row, r) => `<div class="comm-row${r ? ' rev' : ''}"><div class="comm-track">${[...row, ...row].map((n) => `<img src="/assets/img/comm-${String(n).padStart(2, '0')}.webp" alt="" loading="lazy" width="480" height="640">`).join('')}</div></div>`).join('')}</div>
    <div class="comm-notes">${COMM.map(([q, who, role], i) => `<figure class="cnote cn${i + 1}"><div class="cnote-in"><blockquote>“${e(q)}”</blockquote><figcaption><b>${e(who)}</b>${role ? `<span>${e(role)}</span>` : ''}</figcaption></div></figure>`).join('')}</div>
  </div>
</section>

<section class="sec light" id="faq">
  <div class="wrap two">
    <div><p class="kicker reveal"><span class="dot"></span>FAQ</p><h2 class="reveal" style="margin-top:24px">Before your<br><em>first class.</em></h2></div>
    ${faqBlock(D.faqs.slice(0, 6))}
  </div>
</section>
${finalCta()}`;
  const site = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'SANCTUM', url: abs('/') };
  pages.push({ path: '/', html: layout({ path: '/', title: 'SANCTUM — Mindful Movement Classes | London, Amsterdam, Dubai', desc: 'A 55-minute, music-led ritual of movement, breathwork, meditation and storytelling. Book a Sanctum class in London, Amsterdam, Dubai, Stockholm or New York.', body, schema: [org, site, faqSchema(D.faqs.slice(0, 6))] }) });
}

/* ---------------- CLASSES ---------------- */
function classesIndex() {
  const body = `<section class="phero"><img src="/assets/img/church.webp" alt="" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Classes</p><h1>Daily <em>classes.</em></h1><p class="lead">55 minutes of movement, music, breathwork and stillness. Choose your city — the agenda is open to everyone, no login needed.</p></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap">${cityCards()}</div></section>${finalCta()}`;
  pages.push({ path: '/classes/', html: layout({ path: '/classes/', active: '/classes/', title: 'Sanctum Classes | London, Amsterdam, Dubai, Stockholm, NYC', desc: 'Find a Sanctum class near you. Mindful movement classes in churches, saunas and studios across London, Amsterdam, Dubai, Stockholm and New York.', body, schema: [org, crumbs([['Home', '/'], ['Classes', '/classes/']])] }) });
}

function cityPage(c) {
  const evs = upcoming(c.events);
  const body = `<section class="phero"><img src="/assets/img/${c.img}.webp" alt="" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / <a href="/classes/">Classes</a> / ${c.name}</p><h1>Sanctum <em>${c.name}.</em></h1><p class="lead">${e(c.intro)}</p><div class="ctas"><a class="btn btn-primary" href="#agenda">See this month ${arr}</a><a class="btn btn-ghost" href="/memberships/">Membership</a></div></div></section>
<section class="sec" id="agenda" style="padding-top:40px"><div class="wrap"><div class="sec-head"><p class="kicker reveal"><span class="dot"></span>Upcoming in ${c.name}</p><h2 class="reveal">This month in <em>${c.name}.</em></h2></div>${eventList(evs.length ? evs : c.events)}<p class="src" style="margin-top:18px">Bookings open on the Sanctum platform. Cancel up to 12 hours before class.</p></div></section>
<section class="sec" style="padding-top:0"><div class="wrap two"><div><p class="kicker reveal"><span class="dot"></span>Venues</p><ul class="venues" style="margin-top:28px">${c.venues.map((v) => `<li class="reveal">${e(v)}</li>`).join('')}</ul></div>${c.guides.length ? `<div><p class="kicker reveal"><span class="dot"></span>${c.name} guides</p><div class="guides reveal" style="margin-top:28px">${c.guides.map((g) => `<span>${e(g)}</span>`).join('')}</div></div>` : ''}</div></section>
${c.reviews.length ? `<section class="sec" style="padding-top:0"><div class="wrap"><p class="kicker reveal"><span class="dot"></span>From our community</p><div class="reviews" style="margin-top:36px">${c.reviews.map((r) => `<figure class="reveal"><blockquote>“${e(r)}”</blockquote><figcaption>Class review · ${c.name}</figcaption></figure>`).join('')}</div></div></section>` : ''}
<section class="sec" style="padding-top:0"><div class="wrap two"><div><p class="kicker reveal"><span class="dot"></span>FAQ</p><h2 class="reveal" style="margin-top:24px">Good to <em>know.</em></h2></div>${faqBlock(D.faqs.slice(1, 6))}</div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><p class="kicker reveal"><span class="dot"></span>Other cities</p><div class="guides reveal" style="margin-top:24px">${D.cities.filter((x) => x.slug !== c.slug).map((x) => `<a class="link" style="margin-right:22px;font-family:var(--serif);font-size:1.6rem" href="/classes/${x.slug}/">${x.name}</a>`).join('')}</div></div></section>
${finalCta(`Your first class in<br><em>${c.name}.</em>`)}`;
  const local = { '@context': 'https://schema.org', '@type': 'SportsActivityLocation', name: `SANCTUM ${c.name}`, url: abs(`/classes/${c.slug}/`), parentOrganization: { '@type': 'Organization', name: 'SANCTUM' }, address: { '@type': 'PostalAddress', addressLocality: c.name, addressCountry: c.country }, image: abs(`/assets/img/${c.img}.webp`) };
  const evSchema = evs.map((ev) => eventSchema(ev, c)).filter(Boolean);
  pages.push({ path: `/classes/${c.slug}/`, html: layout({ path: `/classes/${c.slug}/`, active: '/classes/', title: `Sanctum ${c.name} — Mindful Movement Classes & Events`, desc: `Mindful movement classes in ${c.name}: ${c.venues.slice(0, 2).join(', ')}. 55 minutes of movement, breathwork and stillness. See the agenda and book.`.slice(0, 158), body, schema: [local, crumbs([['Home', '/'], ['Classes', '/classes/'], [c.name, `/classes/${c.slug}/`]]), faqSchema(D.faqs.slice(1, 6)), ...evSchema] }) });
}

/* ---------------- MEMBERSHIP / DIGITAL ---------------- */
function memberships() {
  const M = D.membership;
  const body = `<section class="phero"><img src="/assets/img/studio.webp" alt="" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Membership</p><span class="badge" style="margin-top:18px">${M.badge}</span><h1>Make Sanctum <em>your ritual.</em></h1><p class="lead">${M.lead} Sanctum is meant to be a habit — something you return to week after week, to stay grounded, clear and connected.</p><div class="ctas"><a class="btn btn-primary" href="${M.url}" ${ext}>Become a member ${arr}</a></div></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap"><div class="sec-head"><p class="kicker reveal"><span class="dot"></span>Everything Sanctum</p><h2 class="reveal">Come for the movement.<br><em>Stay for the feeling.</em></h2></div><div class="incl reveal" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">${M.items.map((i) => `<div><b>${i.k}</b><h3>${e(i.t)}</h3><p>${e(i.d)}</p></div>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><p class="kicker reveal"><span class="dot"></span>Choose your membership city</p><div style="margin-top:28px">${memberCities()}</div><p class="src" style="margin-top:18px">Pricing per city: [A CONFIRMAR]</p></div></section>${finalCta()}`;
  pages.push({ path: '/memberships/', html: layout({ path: '/memberships/', active: '/memberships/', title: 'Sanctum Membership — 4 Experiences a Month + Digital', desc: 'Make Sanctum your ritual: 4 experiences per month, unlimited digital access, 2 guest passes and priority booking. Save 50% on your membership.', body, schema: [org, crumbs([['Home', '/'], ['Membership', '/memberships/']])] }) });
}
function digitalPage() {
  const G = D.digital;
  const body = `<section class="phero dhero"><img src="/assets/img/digital-hand.webp" alt="The Sanctum app open on a phone, held in one hand" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Sanctum Digital</p><h1>Anywhere. <em>Anytime.</em></h1><p class="lead">${e(G.lead)}</p>${storeBadges()}</div></section>
<section class="sec"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Daily practices</p><h2 class="reveal" style="margin-top:24px">Small rituals. <em>Big shifts.</em></h2></div><p class="lead reveal">${e(G.title)} Founder-led and master-guide experiences, filmed in iconic locations with cinematic soundscapes — new every week.</p></div>
<div class="dcards">${RITUALS.map(([n, t, s, d, img]) => `<article class="dcard reveal"><img class="dc-img" src="/assets/img/${img}.webp" alt="" loading="lazy"><b>${n}</b><h3>${t}</h3><span class="dc-s">${s}</span><p>${d}</p></article>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap dgrid">${digitalStage()}<div class="dcopy"><p class="kicker reveal"><span class="dot"></span>Inside the app</p><h2 class="reveal">Press play. <em>Close your eyes.</em></h2><p class="lead reveal">Audio-led journeys — no screen needed. Put your headphones on and let the music, the voice of the guide and your breath take you there.</p><ul class="ticks reveal">${G.features.map((f) => `<li>${e(f)}</li>`).join('')}<li>Track rituals, progress and breakthroughs</li></ul>${storeBadges('reveal')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="dben reveal">${[['Guided classes', 'for every mood and moment.'], ['Science-backed programs', 'to restore balance.'], ['Your progress', 'rituals, streaks and breakthroughs.'], ['New every week', 'fresh experiences, always.'], ['Beyond fitness', 'movement as a way to feel.']].map(([t, d]) => `<div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap dwide"><div class="dw-copy"><p class="kicker reveal"><span class="dot"></span>Take Sanctum with you</p><h2 class="reveal">From the studio <em>to anywhere.</em></h2><p class="lead reveal">Then come and feel it live. Find a class near you:</p><div class="dcities reveal">${D.cities.map((c) => `<a href="/classes/${c.slug}/"><b>${c.code}</b>${c.name}</a>`).join('')}</div>${storeBadges('reveal')}</div><div class="dw-img reveal"><img src="/assets/img/player-wide.webp" alt="" loading="lazy" width="640" height="360"></div></div></section>${finalCta()}`;
  const app = { '@context': 'https://schema.org', '@type': 'MobileApplication', name: 'Sanctum Digital', operatingSystem: 'iOS, Android', applicationCategory: 'HealthApplication', publisher: { '@type': 'Organization', name: 'SANCTUM' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: '[A CONFIRMAR]' } };
  pages.push({ path: '/digital/', html: layout({ path: '/digital/', active: '/digital/', title: 'Sanctum Digital — Immersive Movement App', desc: 'Take a Sanctum class anytime, anywhere. Morning energizers, meditations, nature walks and the Signature Sequence. Download on iOS and Android.', body, schema: [app, crumbs([['Home', '/'], ['Sanctum Digital', '/digital/']])] }) });
}

/* ---------------- PRIVATE ---------------- */
function privatePage() {
  const P = D.privateBookings;
  const opt = (l) => l.map((x) => `<option>${e(x)}</option>`).join('');
  const body = `<section class="phero"><img src="/assets/img/private-glacier.webp" alt="A Sanctum private group moving together on a glacier" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Private bookings</p><h1>Curated <em>exclusive</em> experiences.</h1><p class="lead">Our private experiences are designed for groups, teams and communities seeking a deeper, more visceral form of connection. Through music-driven movement, breath and shared energy, Sanctum creates powerful moments of trust, unity and transformation.</p><div class="ctas"><a class="btn btn-primary" href="#inquire">Inquire now ${arr}</a></div></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Experiences</p><h2 class="reveal" style="margin-top:24px">Four ways to <em>move together.</em></h2></div><p class="lead reveal">Each experience is tailored — from corporate activations and conferences to private celebrations — helping teams and friends bond, release and reset together.</p></div>
<div class="pexp">${P.offers.map((o, i) => `<article class="pex reveal"><img class="pex-img" src="${o.img}" alt="" loading="lazy"><div class="pex-top"><span class="pex-n">0${i + 1}</span><span class="dur">${o.dur}</span></div><div class="pex-body"><h3>${o.name}</h3><p class="pex-tag">${e(o.tag)}</p>${o.body.map((x) => `<p>${e(x)}</p>`).join('')}<a class="pex-go" href="#inquire">Inquire about ${o.name} ${arr}</a></div></article>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap preel"><div class="preel-v reveal"><video muted loop playsinline preload="none" data-lazy data-src="/assets/video/private-reel.mp4" poster="/assets/img/private-reel-poster.webp" aria-label="A Sanctum mindful nature walk on the coast"></video><button class="sound" type="button" aria-pressed="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path class="w" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/><path class="x" d="M16 9l5 6M21 9l-5 6"/></svg><span class="lbl">Sound on</span></button></div><div><p class="kicker reveal"><span class="dot"></span>In the field</p><h2 class="reveal" style="margin-top:24px">Out of the office. <em>Into the body.</em></h2><p class="lead reveal" style="margin-top:22px">Headphones on, phones away. A curated walk along the coast, with movement and reflection at every station — and a Grande Finale by the sea.</p><figure class="pquote reveal"><blockquote>“${e(P.testimonials[0].quote)}”</blockquote><figcaption><b>${e(P.testimonials[0].name)}</b>${e(P.testimonials[0].role)}</figcaption></figure><div class="reveal" style="margin-top:30px"><a class="btn btn-primary" href="#inquire">Plan your experience ${arr}</a></div></div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><p class="kicker reveal"><span class="dot"></span>Impact</p><div class="stats">${P.stats.map((s) => `<div class="stat reveal"><b data-count="${s.v}">${s.v}<small>%</small></b><span>${e(s.t)}</span></div>`).join('')}</div><p class="src">Source: ${P.statsSource}</p></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Benefits</p><h2 class="reveal" style="margin-top:24px">What your team <em>takes home.</em></h2></div></div><div class="pben">${P.benefits.map(([t, img], i) => `<figure class="pb reveal${i % 2 ? ' pb-low' : ''}"><div class="pb-img"><img src="${img}" alt="" loading="lazy"></div><figcaption><span>0${i + 1}</span>${e(t)}</figcaption></figure>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="quotes">${P.testimonials.slice(1).map((t) => `<figure class="reveal"><blockquote>“${e(t.quote)}”</blockquote><figcaption><b>${e(t.name)}</b>${e(t.role)}</figcaption></figure>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><p class="kicker reveal"><span class="dot"></span>Featured in</p><div class="pfeat">${P.featured.map((f) => `<article class="pf reveal"><div class="pf-media"><img src="${f.img}" alt="" loading="lazy"></div><div class="pf-body">${f.logo ? `<img class="pf-logo" src="${f.logo}" alt="World Economic Forum" loading="lazy">` : ''}<span class="pf-k">${e(f.kicker)}</span><p class="pf-q">${e(f.text)}</p><a class="pf-go" href="${f.url}" ${ext}>Read article ${arr}</a></div></article>`).join('')}</div></div></section>
<section class="sec ppart" style="padding-top:0"><div class="wrap ppart-in"><div><p class="kicker reveal"><span class="dot"></span>Our partners</p><h2 class="reveal" style="margin-top:24px">Trusted by <em>the best.</em></h2><p class="lead reveal" style="margin-top:22px">Hotels, publications, brands and organisations that have moved with Sanctum.</p><div class="ppart-tabs reveal" role="tablist">${P.partners.map(([l], i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-i="${i}">${e(l)}</button>`).join('')}</div></div><div class="ppart-stage reveal">${P.partners.map(([l, img], i) => `<img class="${i === 0 ? 'on' : ''}" src="${img}" alt="${e(l)} partners of Sanctum" loading="lazy">`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap pmore"><div><p class="kicker reveal"><span class="dot"></span>More info</p><h2 class="reveal" style="margin-top:24px">Prefer to talk it <em>through?</em></h2><p class="lead reveal" style="margin-top:22px">Take the full programme with you, or book a short call with the team to shape your experience.</p></div><div class="pmore-grid"><a class="pm reveal" href="https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/6943fa4787d2cbfb02f4ed04_SANCTUM%20Corporate%20%26%20Private%20Experience%20Brochure%202026.pdf" ${ext}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 19h16"/></svg><span class="pm-k">PDF · 2026</span><h3>Download brochure</h3><p>Corporate &amp; private experiences — formats, durations and how it works.</p><span class="pm-go">Download ${arr}</span></a><a class="pm reveal" href="https://calendar.app.google/fie9JNMyuDLrBA9e7" ${ext}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg><span class="pm-k">Google Calendar</span><h3>Book a discovery call</h3><p>Pick a time that suits you and talk to the Sanctum team directly.</p><span class="pm-go">Book a call ${arr}</span></a></div></div></section>
<section class="sec" id="inquire" style="padding-top:0"><div class="wrap two"><div><p class="kicker reveal"><span class="dot"></span>Inquire</p><h2 class="reveal" style="margin-top:24px">Tell us your <em>intention.</em></h2><p class="lead reveal" style="margin-top:22px">Corporate activations, conferences, leadership offsites and private celebrations. We reply with a tailored proposal.</p><p class="src" style="margin-top:22px">Reply time: [A CONFIRMAR]</p></div>
<form class="form reveal" name="private-inquiry" method="POST" action="/private-bookings/thank-you/" data-netlify="true" netlify-honeypot="company_url">
  <input type="hidden" name="form-name" value="private-inquiry"><label class="hp">Leave empty <input name="company_url" tabindex="-1" autocomplete="off"></label>
  <label>Name<input name="name" autocomplete="name" required></label>
  <label>Email<input name="email" type="email" autocomplete="email" required></label>
  <label>Company<input name="organisation" autocomplete="organization"></label>
  <label>Group size<input name="group_size" type="number" min="1" inputmode="numeric"></label>
  <label>Experience<select name="experience">${opt(P.offers.map((o) => o.name))}</select></label>
  <label>Intention<select name="intention">${opt(P.intentions)}</select></label>
  <label>Location<select name="location">${opt(P.locations)}</select></label>
  <label>Preferred date<input name="date" type="date"></label>
  <label class="full">Message<textarea name="message" rows="4"></textarea></label>
  <label class="consent full"><input type="checkbox" name="consent" required> I agree to be contacted by Sanctum about my request.</label>
  <div class="full"><button class="btn btn-primary" type="submit">Send inquiry ${arr}</button></div>
</form></div></section>${finalCta()}`;
  const svc = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Corporate & private wellbeing experiences', provider: { '@type': 'Organization', name: 'SANCTUM' }, areaServed: ['Netherlands', 'United Kingdom', 'United Arab Emirates', 'Sweden', 'United States'], hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Private experiences', itemListElement: P.offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.name, description: o.text } })) } };
  pages.push({ path: '/private-bookings/', html: layout({ path: '/private-bookings/', active: '/private-bookings/', title: 'Sanctum Private & Corporate Experiences', desc: 'Private Sanctum sessions for teams, conferences and celebrations: Signature Sequence, Focus Energiser, Mindful Nature Walk or a bespoke experience.', body, schema: [svc, crumbs([['Home', '/'], ['Private bookings', '/private-bookings/']])] }) });
  pages.push({ path: '/private-bookings/thank-you/', html: layout({ path: '/private-bookings/thank-you/', title: 'Thank you — Sanctum', desc: 'Your inquiry has been received.', body: `<section class="phero" style="min-height:90vh"><div class="wrap"><p class="kicker"><span class="dot"></span>Inquiry received</p><h1>Thank <em>you.</em></h1><p class="lead">The Sanctum team will come back to you with a tailored proposal. [A CONFIRMAR] reply time.</p><div class="ctas"><a class="btn btn-primary" href="/">Back home</a></div></div></section>` }) });
}

/* ---------------- FESTIVAL / EVENTS / ABOUT / FAQ ---------------- */
function festivalPage() {
  const F = D.festival;
  const body = `<section class="phero" style="min-height:92vh"><picture><source media="(max-width:760px)" srcset="https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/694961e2afd9ff81d09e2afc_FF-hero-MOBILE.jpg"><img src="https://cdn.prod.website-files.com/6924318a2ed5d4cd56895681/693800f7a2875f59ce28a671_image00003%202.jpg" alt="Thousands moving together at Sanctum Frequency Festival" fetchpriority="high"></picture><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Frequency Festival</p><h1>Frequency <em>Festival.</em></h1><p class="lead">${e(F.tag)} ${e(F.lead)}</p><div class="facts">${F.facts.map((f) => `<div><b>${f.v}</b><span>${e(f.t)}</span></div>`).join('')}</div><div class="ctas"><a class="btn btn-primary" href="#events">Get your tickets ${arr}</a></div></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap freels-wrap"><div><p class="kicker reveal"><span class="dot"></span>The experience</p><h2 class="reveal" style="margin-top:24px">1,000+ people. <em>One frequency.</em></h2><ul class="flines reveal"><li>3 hours designed to change how you feel.</li><li>Move. Breathe. Release. Connect.</li><li>Leave changed.</li></ul><div class="prose reveal"><p>The Sanctum Frequency Festival is where movement, music and mindfulness converge at scale. Thousands gather to move, breathe and rise together — transforming iconic spaces into living sanctuaries of collective consciousness.</p><p>Each edition blends our Signature Sequence with live music, partnering wellbeing experts and sensory design — communal ritual, nourishing food and restorative wellness. A natural high through mindful movement, electrifying music and emotional expression.</p></div></div><div class="freels">${F.reels.map((v, i) => `<div class="freel reveal${i ? ' freel-low' : ''}"><video muted loop playsinline preload="none" data-lazy data-src="${v}" aria-label="Frequency Festival reel ${i + 1}"></video></div>`).join('')}</div></div></section>
<section class="sec" id="events" style="padding-top:0"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Upcoming events</p><h2 class="reveal" style="margin-top:24px">2026 dates <em>on sale now.</em></h2></div><p class="lead reveal">Get your early-bird ticket for Amsterdam and London this September.</p></div><div class="fevents">${F.events.map((x) => `<a class="fev reveal" href="${x.url}" ${ext}><img src="${x.img}" alt="" loading="lazy"><div class="fev-body"><span class="fev-date">${x.date}</span><h3>${x.city}</h3><span class="fev-venue">${x.venue}</span><p>Thousands of souls. One movement. One breath. One moment. A new kind of festival experience, where music, movement and breathwork collide to create something beyond the ordinary.</p><span class="btn btn-primary">Info &amp; tickets ${arr}</span></div></a>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><p class="kicker reveal"><span class="dot"></span>As seen in</p><div class="fpress">${F.press.map((p) => `<a class="fpr reveal" href="${p.url}" ${ext}><div class="fpr-img"><img src="${p.img}" alt="" loading="lazy"></div><div class="fpr-body"><span class="pf-k">${e(p.source)}</span><blockquote>“${e(p.quote)}”</blockquote><span class="pf-go">Read article ${arr}</span></div></a>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Benefits</p><h2 class="reveal" style="margin-top:24px">Why thousands <em>come back.</em></h2></div></div><div class="pben">${F.benefits.map(([t, img], i) => `<figure class="pb reveal${i % 2 ? ' pb-low' : ''}"><div class="pb-img"><img src="${img}" alt="" loading="lazy"></div><figcaption><span>0${i + 1}</span>${e(t)}</figcaption></figure>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Past festivals</p><h2 class="reveal" style="margin-top:24px">Moments we <em>moved through.</em></h2></div><div class="reveal"><a class="btn btn-ghost" href="${F.reel}" ${ext}>View Instagram reel ${arr}</a></div></div><div class="fpast">${F.past.map((img) => `<figure class="reveal"><img src="${img}" alt="Frequency Festival, past edition" loading="lazy"></figure>`).join('')}</div></div></section>
${finalCta('Move with<br><em>thousands.</em>')}`;
  pages.push({ path: '/frequency-festival/', html: layout({ path: '/frequency-festival/', active: '/frequency-festival/', title: 'Frequency Festival by Sanctum — A Collective Ritual', desc: 'Sanctum amplified: thousands move, breathe and release together inside iconic spaces. 3 hours of movement, live music and breathwork. Alcohol-free.', body, schema: [org, crumbs([['Home', '/'], ['Frequency Festival', '/frequency-festival/']])] }) });
}
function eventsPage() {
  const R = D.retreatsPage;
  const ev = upcoming(D.retreats).sort((a, b) => a.iso.localeCompare(b.iso));
  const body = `<section class="phero" style="min-height:92vh"><img src="${R.hero}" alt="Sanctum retreat participants moving together outdoors" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Events &amp; retreats</p><p class="kicker" style="margin-top:18px"><span class="dot"></span>International residencies &amp; retreats</p><h1>Dive deeper. <em>Explore the world</em> with us.</h1><p class="lead">Beyond our classes and festivals, Sanctum retreats and special events invite you to slow down, expand and reconnect — from sunrise sessions in Ibiza to alpine immersions in the Swiss Alps.</p><div class="ctas"><a class="btn btn-primary" href="#events">See upcoming events ${arr}</a></div></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap freels-wrap"><div><p class="kicker reveal"><span class="dot"></span>The retreats</p><h2 class="reveal" style="margin-top:24px">A deep-dive into <em>presence.</em></h2><ul class="flines reveal"><li>Movement. Community. Nature.</li><li>Communal ritual, nourishing food, restorative wellness.</li></ul><div class="prose reveal"><p>Each retreat is a deep-dive into presence — combining movement, community and nature.</p><p>Expect full-spectrum experiences and journeys designed to align body, mind and spirit through communal ritual, nourishing food and restorative wellness.</p></div></div><div class="freels">${R.videos.map((v, i) => `<div class="freel reveal${i ? ' freel-low' : ''}"><video muted loop playsinline preload="none" data-lazy data-src="${v}" aria-label="Sanctum retreat film ${i + 1}"></video></div>`).join('')}</div></div></section>
<section class="sec" id="events" style="padding-top:0"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Upcoming events</p><h2 class="reveal" style="margin-top:24px">Where we go <em>next.</em></h2></div><p class="lead reveal">Limited places. Each journey is designed to reset the nervous system and open space for creativity.</p></div><div class="fevents fevents-3">${ev.map((x) => `<a class="fev reveal" href="${x.url}" ${ext}><img src="${x.img}" alt="" loading="lazy"><div class="fev-body"><span class="fev-date">${e(x.date)}</span><h3>${e(x.name)}</h3><span class="fev-venue">${e(x.place)}</span><p>${e(x.long || x.text)}</p><span class="btn btn-primary">Info &amp; tickets ${arr}</span></div></a>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Benefits</p><h2 class="reveal" style="margin-top:24px">Travel that <em>changes you.</em></h2></div></div><div class="pben">${R.benefits.map(([t, img], i) => `<figure class="pb reveal${i % 2 ? ' pb-low' : ''}"><div class="pb-img"><img src="${img}" alt="" loading="lazy"></div><figcaption><span>0${i + 1}</span>${e(t)}</figcaption></figure>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><figure class="times reveal"><img class="times-bg" src="${R.times.img}" alt="" loading="lazy"><figcaption><blockquote>“Better than therapy.”</blockquote><img class="times-logo" src="${R.times.logo}" alt="The Times"></figcaption></figure></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>From our community</p><h2 class="reveal" style="margin-top:24px">Moments, <em>shared.</em></h2></div><div class="reveal"><a class="btn btn-ghost" href="https://www.instagram.com/wearesanctum/" ${ext}>Follow @wearesanctum ${arr}</a></div></div><div class="insta">${R.insta.map(([u, img]) => `<a class="ig reveal" href="${u}" ${ext} aria-label="View this post on Instagram"><img src="${img}" alt="" loading="lazy"><span>View on Instagram ${arr}</span></a>`).join('')}</div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head"><p class="kicker reveal"><span class="dot"></span>In the cities</p><h2 class="reveal">Moon specials <em>&amp;</em> rituals.</h2></div>${eventList(D.cities.flatMap((c) => upcoming(c.events).map((ev) => ({ ...ev, venue: `${ev.venue} — ${c.name}` }))).sort((a, b) => (a.iso || '9').localeCompare(b.iso || '9')))}</div></section>${finalCta()}`;
  pages.push({ path: '/events-retreats/', html: layout({ path: '/events-retreats/', active: '/events-retreats/', title: 'Sanctum Events & Retreats — Global Residencies', desc: 'Transformative Sanctum retreats and special events: wellness cruises, Marbella Club, moon specials in churches across London, Amsterdam and Dubai.', body, schema: [org, crumbs([['Home', '/'], ['Events & retreats', '/events-retreats/']])] }) });
}
function aboutPage() {
  const A = D.about;
  const body = `<section class="phero"><img src="/assets/img/poster-26.webp" alt="" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / About</p><h1>A global mindful <em>movement.</em></h1><p class="lead">${e(A.lead)}</p></div></section>
<section class="sec" style="padding-top:40px"><div class="wrap two"><div><p class="kicker reveal"><span class="dot"></span>Our story</p><h2 class="reveal" style="margin-top:24px">The body is the <em>route to the mind.</em></h2></div><div class="prose reveal"><p>${e(A.story)}</p><p><strong>Our purpose:</strong> ${e(A.purpose)}</p><p>From ${A.reach.join(', ')} — Sanctum moves wherever people are ready to feel more.</p></div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="press">${D.press.map((p) => `<figure class="reveal"><blockquote>“${e(p.quote)}”</blockquote><figcaption>${e(p.source)}</figcaption></figure>`).join('')}</div></div></section>${finalCta()}`;
  pages.push({ path: '/about/', html: layout({ path: '/about/', active: '/about/', title: 'About Sanctum — A Global Mindful Movement', desc: 'Founded in Amsterdam by Luuk Melisse, Sanctum fuses kundalini, HIIT, breathwork and meditation into one moving ritual. “Better than therapy” — The Times.', body, schema: [org, crumbs([['Home', '/'], ['About', '/about/']])] }) });
}
function faqPage() {
  const body = `<section class="phero" style="min-height:56vh"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / FAQ</p><h1>Questions <em>&amp; answers.</em></h1></div></section><section class="sec" style="padding-top:20px"><div class="wrap">${faqBlock(D.faqs)}</div></section>${finalCta()}`;
  pages.push({ path: '/faq/', html: layout({ path: '/faq/', title: 'Sanctum FAQ — Booking, Cancellation & Classes', desc: 'How to book a Sanctum class, cancellation policy (12 hours), waitlists, gift cards, pregnancy and minimum age. Everything before your first class.', body, schema: [faqSchema(D.faqs), crumbs([['Home', '/'], ['FAQ', '/faq/']])] }) });
}

function pressPage() {
  const items = PG.press;
  const body = `<section class="phero" style="min-height:70vh"><img src="${PG.press[1].img}" alt="" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Press</p><h1>In the <em>press.</em></h1><p class="lead">From British Vogue to The Sunday Times — how the world’s press has described the Sanctum experience.</p></div></section>
<section class="sec light" style="padding-top:40px"><div class="wrap"><div class="pquotes reveal"><figure><blockquote>“I’ve seen the future of wellness.”</blockquote><figcaption>British Vogue</figcaption></figure><figure><blockquote>“Better than therapy.”</blockquote><figcaption>The Times</figcaption></figure><figure><blockquote>“Best for: something a little different.”</blockquote><figcaption>National Geographic</figcaption></figure></div>
<div class="presslist">${items.map((p) => { const tag = p.url ? 'a' : 'div'; return `<${tag} class="prs reveal"${p.url ? ` href="${p.url}" ${ext}` : ''}><div class="prs-img"><img src="${p.img}" alt="" loading="lazy"></div><div class="prs-body"><span class="prs-pub">${e(p.pub)}</span><h3>${e(p.title)}</h3><span class="prs-meta">${p.date ? e(p.date) : ''}${p.url ? `<span class="prs-go">Read more ${arr}</span>` : ''}</span></div></${tag}>`; }).join('')}</div>
<p class="src" style="margin-top:28px">Press enquiries: <a href="mailto:hello@wearesanctum.com">hello@wearesanctum.com</a></p></div></section>${finalCta()}`;
  pages.push({ path: '/press/', html: layout({ path: '/press/', title: 'Press — Sanctum in Vogue, The Times, BBC & more', desc: 'Sanctum in the press: British Vogue, The Sunday Times, American Vogue, BBC, Goop, Grazia, Harper’s Bazaar Arabia, TimeOut and more.', body, schema: [org, crumbs([['Home', '/'], ['Press', '/press/']])] }) });
}
function careersPage() {
  const I = PG.careersImg;
  const body = `<section class="phero" style="min-height:76vh"><img src="${I.hero}" alt="" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Careers</p><h1>Join the <em>movement.</em></h1><p class="lead">Join our community and unlock your greatest potential with a career that nurtures your personal wellbeing and enhances the wellbeing of others.</p><div class="ctas"><a class="btn btn-primary" href="#roles">See open roles ${arr}</a><a class="btn btn-ghost" href="/academy/">Become a guide</a></div></div></section>
<section class="sec light" id="roles" style="padding-top:40px"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>We are currently hiring</p><h2 class="reveal" style="margin-top:24px">Open <em>roles.</em></h2></div><p class="lead reveal">${PG.roles.length} open positions across London, Amsterdam and Dubai.</p></div>
<div class="roles">${PG.roles.map((r, i) => `<details class="role reveal"${i === 0 ? ' open' : ''}><summary><span class="role-n">0${i + 1}</span><span class="role-t">${e(r.title)}</span><span class="role-loc">${e(r.facts[0][1])}</span><span class="role-x" aria-hidden="true"></span></summary><div class="role-body"><dl class="role-facts">${r.facts.map(([k, v]) => `<div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('')}</dl><div class="role-text"><h4>Role overview</h4>${r.body.map((p) => `<p>${e(p)}</p>`).join('')}${r.focus ? `<h4>Strategic focus</h4><p>${e(r.focus.intro)}</p><ul class="ticks">${r.focus.list.map((x) => `<li>${e(x)}</li>`).join('')}</ul><p>${e(r.focus.outro)}</p>` : ''}<p class="role-mail">To apply please email your CV to <b>${e(r.email)}</b></p><div class="ctas"><a class="btn btn-primary" href="${r.apply}">Apply here ${arr}</a>${r.jd ? `<a class="btn btn-ghost" href="${r.jd}" ${ext}>Full job description</a>` : ''}</div></div></div></details>`).join('')}</div></div></section>
<section class="sec light" style="padding-top:0"><div class="wrap cguide"><div class="cg-imgs reveal"><img src="${I.a}" alt="" loading="lazy"><img src="${I.c}" alt="" loading="lazy"></div><div><p class="kicker reveal"><span class="dot"></span>Sanctum Academy</p><h2 class="reveal" style="margin-top:24px">Become a <em>guide.</em></h2><p class="lead reveal" style="margin-top:22px">${e(PG.academy.guide)}</p><div class="ctas reveal" style="margin-top:30px"><a class="btn btn-primary" href="/academy/">Discover the Academy ${arr}</a><a class="btn btn-ghost" href="mailto:academy@wearesanctum.com?subject=Academy%20application">academy@wearesanctum.com</a></div></div></div></section>${finalCta()}`;
  const jobs = PG.roles.map((r) => ({ '@context': 'https://schema.org', '@type': 'JobPosting', title: r.title, description: r.body.join(' '), hiringOrganization: { '@type': 'Organization', name: 'SANCTUM', sameAs: abs('/') }, employmentType: /Freelance/.test(r.facts.map((f) => f[1]).join(' ')) ? 'PART_TIME' : 'FULL_TIME', jobLocation: r.facts[0][1].split(' / ').map((l) => ({ '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: l.split(',')[0], addressCountry: l.split(', ')[1] } })), datePosted: today }));
  pages.push({ path: '/careers/', html: layout({ path: '/careers/', title: 'Careers at Sanctum — Open Roles in London, Amsterdam & Dubai', desc: 'Join the Sanctum team: European Operations Manager, Digital Product & Growth Manager and Sanctum Experience Host. Or become a Sanctum guide.', body, schema: [org, ...jobs, crumbs([['Home', '/'], ['Careers', '/careers/']])] }) });
}
function academyPage() {
  const A = PG.academy;
  const body = `<section class="phero" style="min-height:88vh"><img src="${A.hero}" alt="" fetchpriority="high"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Academy</p><p class="kicker" style="margin-top:18px"><span class="dot"></span>Sanctum Academy</p><h1>Become <em>a guide.</em></h1><p class="lead">${e(A.intro)}</p><div class="ctas"><a class="btn btn-primary" href="${A.apply}" ${ext}>Apply now ${arr}</a><a class="btn btn-ghost" href="${A.login}" ${ext}>Academy login</a></div></div></section>
<section class="sec light" style="padding-top:40px"><div class="wrap acab"><div><p class="kicker reveal"><span class="dot"></span>About the Academy</p><h2 class="reveal" style="margin-top:24px">Led by founder <em>Luuk Melisse.</em></h2><p class="lead reveal" style="margin-top:22px">${e(A.about)}</p><ul class="flines reveal"><li>Practical workshops</li><li>The Sanctum Bible</li><li>The Sanctum Platform</li></ul></div><div class="aca-imgs reveal">${A.imgs.slice(0, 3).map((s) => `<img src="${s}" alt="" loading="lazy">`).join('')}</div></div></section>
<section class="sec light" style="padding-top:0"><div class="wrap"><div class="aca-band reveal"><img src="${A.imgs[3]}" alt="" loading="lazy"><div><p class="kicker"><span class="dot"></span>The guide</p><p class="aca-q">${e(A.guide)}</p><div class="ctas" style="margin-top:28px"><a class="btn btn-primary" href="${A.apply}" ${ext}>Apply now ${arr}</a></div></div></div></div></section>
<section class="sec light" style="padding-top:0"><div class="wrap"><div class="sec-head split"><div><p class="kicker reveal"><span class="dot"></span>Meet the guides</p><h2 class="reveal" style="margin-top:24px">The voices <em>in your ears.</em></h2></div><p class="lead reveal">Every Sanctum guide came through the Academy.</p></div>
<div class="guides-grid">${A.guides.map((g) => `<article class="gcard2 reveal"><div class="gc-img"><img src="${g.img}" alt="${g.name}, Sanctum guide" loading="lazy"><img class="gc-alt" src="${g.img2}" alt="" loading="lazy"></div><div class="gc-body"><div class="gc-top"><h3>${g.name}</h3><span>Est. ${g.est}</span></div><p class="gc-q">“${e(g.quote)}”</p><dl>${g.facts.map(([k, v]) => `<div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('')}</dl>${g.ig ? `<a class="pf-go" href="${g.ig}" ${ext}>Instagram ${arr}</a>` : ''}</div></article>`).join('')}</div></div></section>
<section class="sec light" style="padding-top:0"><div class="wrap"><div class="fpast">${A.gallery.map((s) => `<figure class="reveal"><img src="${s}" alt="Sanctum Academy" loading="lazy"></figure>`).join('')}</div><div class="ctas reveal" style="margin-top:36px"><a class="btn btn-primary" href="${A.apply}" ${ext}>Apply to the Academy ${arr}</a><a class="btn btn-ghost" href="mailto:academy@wearesanctum.com">academy@wearesanctum.com</a></div></div></section>${finalCta()}`;
  pages.push({ path: '/academy/', html: layout({ path: '/academy/', title: 'Sanctum Academy — Become a Sanctum Guide', desc: 'The Sanctum Academy recruits talent globally and trains those who want to become a Sanctum guide. Led by founder Luuk Melisse.', body, schema: [org, crumbs([['Home', '/'], ['Academy', '/academy/']])] }) });
}
function legalPage(path, title, kicker, text, desc) {
  const blocks = text.split(/\n\n+/);
  const toc = blocks.filter((x) => x.startsWith('## ')).map((x) => x.slice(3));
  let n = 0;
  const html = blocks.map((x) => {
    if (x.startsWith('## ')) { n++; return `<h2 id="s${n}">${e(x.slice(3))}</h2>`; }
    if (x.startsWith('- ')) return `<ul>${x.split('\n').map((l) => `<li>${e(l.replace(/^- /, ''))}</li>`).join('')}</ul>`;
    return `<p>${e(x).replace(/HELLO@WEARESANCTUM\.COM/g, '<a href="mailto:hello@wearesanctum.com">HELLO@WEARESANCTUM.COM</a>')}</p>`;
  }).join('');
  const body = `<section class="phero light" style="min-height:52vh"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / ${kicker}</p><h1>${title}</h1><p class="lead">Sanctum B.V. · Singel 174A, 1016 AJ Amsterdam, The Netherlands</p></div></section>
<section class="sec light" style="padding-top:20px"><div class="wrap legal"><nav class="legal-toc" aria-label="Contents"><p class="kicker"><span class="dot"></span>Contents</p><ol>${toc.map((t, i) => `<li><a href="#s${i + 1}">${e(t)}</a></li>`).join('')}</ol></nav><article class="legal-body">${html}</article></div></section>`;
  pages.push({ path, html: layout({ path, title: `${kicker} — Sanctum`, desc, body, schema: [org, crumbs([['Home', '/'], [kicker, path]])] }) });
}
function notFound() {
  const body = `<section class="phero" style="min-height:90vh"><img src="/assets/img/poster-26.webp" alt=""><div class="wrap"><p class="kicker"><span class="dot"></span>404</p><h1>Lost in <em>stillness.</em></h1><p class="lead">This page doesn’t exist. Breathe in — and find your way back.</p><div class="ctas"><a class="btn btn-primary" href="/">Home</a><a class="btn btn-ghost" href="/classes/">Find a class</a></div></div></section>`;
  writeFileSync(join(OUT, '404.html'), layout({ path: '/404.html', title: 'Page not found — Sanctum', desc: 'Page not found.', body }));
}

home(); classesIndex(); D.cities.forEach(cityPage); memberships(); digitalPage(); privatePage(); festivalPage(); eventsPage(); aboutPage(); faqPage(); pressPage(); careersPage(); academyPage(); legalPage('/terms/', 'Terms <em>&amp; conditions.</em>', 'Terms & conditions', LG.terms, 'Sanctum terms of service: in-person and digital services, memberships, subscriptions, liability and governing law.'); legalPage('/privacy/', 'Privacy <em>policy.</em>', 'Privacy policy', LG.privacy, 'How Sanctum B.V. collects, uses, stores and discloses personal data across its website, app and services.'); notFound();

// sand (light) sections per inner page — index of <section> inside <main> (0 = cover)
const SAND = {
  '/classes/': [1],
  '/memberships/': [1],
  '/digital/': [2, 3],
  '/private-bookings/': [3, 4, 8, 9],
  '/frequency-festival/': [3, 4],
  '/events-retreats/': [1, 3, 6],
  '/about/': [1],
  '/faq/': [1],
  '/press/': [1],
  '/careers/': [1],
  '/academy/': [1, 3],
};
D.cities.forEach((c) => { SAND[`/classes/${c.slug}/`] = [1, 4]; });
const sandify = (p) => {
  const want = SAND[p.path]; if (!want) return p.html;
  const a = p.html.indexOf('<main'); const z = p.html.indexOf('</main>');
  let k = -1;
  const main = p.html.slice(a, z).replace(/<section([^>]*)>/g, (m, attrs) => {
    k++;
    if (/class="[^"]*final/.test(attrs)) return m;
    let at = attrs.replace(/(class="[^"]*?)\s*\blight\b/, '$1');
    if (want.includes(k)) at = /class="/.test(at) ? at.replace(/class="/, 'class="light ') : ` class="light"${at}`;
    return `<section${at}>`;
  });
  return p.html.slice(0, a) + main + p.html.slice(z);
};
for (const p of pages) { const dir = join(OUT, p.path); mkdirSync(dir, { recursive: true }); writeFileSync(join(dir, 'index.html'), sandify(p)); }

const indexable = pages.filter((p) => !p.path.includes('thank-you'));
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
const aiBots = ['Googlebot', 'Google-Extended', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Applebot', 'Applebot-Extended'];
writeFileSync(join(OUT, 'robots.txt'), C.prototype
  ? `# PROTOTYPE — private concept by LAYER LAB. Do not index.\nUser-agent: *\nDisallow: /\n\n# Production version (switch config.prototype=false):\n# User-agent: *\n# Allow: /\n${aiBots.map((b) => `# User-agent: ${b}`).join('\n')}\n# Allow: /\n# Sitemap: ${abs('/sitemap.xml')}\n`
  : `User-agent: *\nAllow: /\n\n# Search engines and AI assistants\n${aiBots.map((b) => `User-agent: ${b}`).join('\n')}\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
writeFileSync(join(OUT, 'llms.txt'), `# SANCTUM\n> ${D.about.lead}\n\n## Classes\n${D.cities.map((c) => `- [${c.name}](${abs(`/classes/${c.slug}/`)}): ${c.intro}`).join('\n')}\n\n## Experiences\n- [Membership](${abs('/memberships/')}): 4 experiences per month, unlimited digital access, 2 guest passes, priority booking.\n- [Sanctum Digital](${abs('/digital/')}): ${D.digital.lead}\n- [Private bookings](${abs('/private-bookings/')}): ${D.privateBookings.offers.map((o) => o.name).join(', ')}.\n- [Frequency Festival](${abs('/frequency-festival/')}): ${D.festival.lead}\n- [Events & retreats](${abs('/events-retreats/')})\n\n## Cities\n- ${D.cities.map((c) => c.name).join(', ')}\n\n## Contact\n- Instagram: ${C.social.instagram}\n- Email: ${C.email}\n\n## Main pages\n- [Home](${abs('/')})\n- [FAQ](${abs('/faq/')})\n- [About](${abs('/about/')})\n`);
console.log(`Built ${pages.length} pages · frames d=${framesD} m=${framesM}`);
