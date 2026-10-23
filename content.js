// Booking Test Data Ninja: a sleepy chibi ninja that throws shurikens at the form fields of
// /ny-booking/pa-vegne-av and fills them with random test data (see data.js).
(() => {
  if (window.__bookingNinja) return;
  window.__bookingNinja = true;

  const TARGET_PATH = '/ny-booking/pa-vegne-av';
  const D = window.NinjaData;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ms = (t) => (reducedMotion ? 0 : t);
  const sleep = (t) => new Promise((resolve) => setTimeout(resolve, ms(t)));
  const anim = (el, frames, duration, extra = {}) =>
    el.animate(frames, { duration: ms(duration), easing: 'ease-out', fill: 'forwards', ...extra });

  // ---------- markup ----------

  const NINJA_SVG = `
<svg viewBox="0 0 120 140" aria-hidden="true">
  <ellipse cx="60" cy="132" rx="34" ry="6" fill="#000" opacity=".18"/>
  <g class="body">
    <rect x="42" y="112" width="14" height="18" rx="7" fill="#1b1f2b"/>
    <rect x="64" y="112" width="14" height="18" rx="7" fill="#1b1f2b"/>
    <path d="M34 122 Q31 88 60 86 Q89 88 86 122 Z" fill="#262b3a"/>
    <rect x="36" y="106" width="48" height="7" rx="3" fill="#e63946"/>
    <rect x="26" y="92" width="12" height="24" rx="6" fill="#262b3a"/>
    <circle cx="32" cy="116" r="6" fill="#f6d3b3"/>
    <g class="arm">
      <rect x="82" y="92" width="12" height="24" rx="6" fill="#262b3a"/>
      <circle cx="88" cy="116" r="6" fill="#f6d3b3"/>
    </g>
    <g class="head">
      <g class="tails">
        <path d="M92 36 q16 -8 26 2 q-13 -1 -24 6z" fill="#e63946"/>
        <path d="M92 40 q15 3 21 15 q-10 -7 -23 -9z" fill="#c1121f"/>
      </g>
      <circle cx="60" cy="52" r="40" fill="#262b3a"/>
      <rect x="24" y="44" width="72" height="26" rx="13" fill="#f6d3b3"/>
      <rect x="23" y="30" width="74" height="9" rx="4.5" fill="#e63946"/>
      <circle cx="93" cy="35" r="5" fill="#c1121f"/>
      <g class="eyes-sleep" stroke="#1b1f2b" stroke-width="3" stroke-linecap="round" fill="none">
        <path d="M38 56 q7 6 14 0"/><path d="M68 56 q7 6 14 0"/>
      </g>
      <g class="eyes-awake">
        <ellipse cx="45" cy="57" rx="6" ry="7" fill="#1b1f2b"/>
        <ellipse cx="75" cy="57" rx="6" ry="7" fill="#1b1f2b"/>
        <circle cx="47" cy="54" r="2.2" fill="#fff"/>
        <circle cx="77" cy="54" r="2.2" fill="#fff"/>
        <path d="M36 46 l15 4 M84 46 l-15 4" stroke="#1b1f2b" stroke-width="3" stroke-linecap="round"/>
      </g>
      <ellipse cx="33" cy="65" rx="5" ry="3" fill="#ff8fa3" opacity=".6"/>
      <ellipse cx="87" cy="65" rx="5" ry="3" fill="#ff8fa3" opacity=".6"/>
      <g class="bubble">
        <circle cx="68" cy="70" r="8" fill="#bde0fe" fill-opacity=".75" stroke="#8ecae6" stroke-width="1.5"/>
        <circle cx="65" cy="67" r="2" fill="#fff"/>
      </g>
    </g>
  </g>
</svg>`;

  const SHURIKEN_SVG = `
<svg viewBox="-12 -12 24 24" width="100%" height="100%" aria-hidden="true">
  <path d="M0 -11.5 L3 -3 L11.5 0 L3 3 L0 11.5 L-3 3 L-11.5 0 L-3 -3 Z" fill="#c9d1d9" stroke="#57606a" stroke-width="1"/>
  <circle r="2.6" fill="#24292f"/>
</svg>`;

  const CSS = `
:host { all: initial; }
.stage { position: fixed; inset: 0; pointer-events: none; z-index: 2147483647; font-family: system-ui, sans-serif; }
.ninja { position: fixed; left: 20px; bottom: 6px; width: 96px; pointer-events: auto; cursor: pointer;
  user-select: none; -webkit-tap-highlight-color: transparent; outline: none; }
.ninja:focus-visible svg { filter: drop-shadow(0 0 4px #2a7ae2); }
.ninja svg { display: block; width: 100%; height: auto; overflow: visible; transform-origin: 50% 100%; }
.asleep:hover svg { animation: wiggle .6s ease-in-out; }
.body { transform-box: fill-box; transform-origin: 50% 100%; }
.asleep .body { animation: breathe 3s ease-in-out infinite; }
.arm { transform-box: fill-box; transform-origin: 50% 10%; }
.tails { transform-box: fill-box; transform-origin: 0% 50%; animation: flutter 1.8s ease-in-out infinite; }
.awake .tails { animation-duration: .35s; }
.bubble { transform-box: fill-box; transform-origin: 20% 20%; animation: bubble 3s ease-in-out infinite; }
.asleep .eyes-awake, .awake .eyes-sleep, .awake .bubble, .awake .zzz { display: none; }
.zzz { position: absolute; left: 70%; top: 0; }
.zzz span { position: absolute; font-weight: 800; font-size: 13px; color: #5b6b8c; opacity: 0; animation: zzz 3s ease-in infinite; }
.zzz span:nth-child(2) { font-size: 16px; animation-delay: 1s; }
.zzz span:nth-child(3) { font-size: 20px; animation-delay: 2s; }
.speech { position: absolute; bottom: calc(100% + 8px); left: 30%; white-space: nowrap; background: #fff; color: #1b1f2b;
  border: 2px solid #1b1f2b; border-radius: 14px; padding: 6px 10px; font: 700 13px/1.2 system-ui, sans-serif;
  box-shadow: 3px 3px 0 #1b1f2b; transform-origin: 10% 100%; }
.speech::after { content: ''; position: absolute; left: 14px; top: 100%; border: 7px solid transparent; border-top-color: #1b1f2b; }
.exclaim { position: absolute; left: 42%; top: -34px; font: 900 32px/1 system-ui, sans-serif; color: #e63946;
  -webkit-text-stroke: 1px #1b1f2b; opacity: 0; }
.star { position: fixed; left: 0; top: 0; width: 28px; height: 28px; margin: -14px 0 0 -14px;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,.35)); }
.trail { position: fixed; left: 0; top: 0; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 50%;
  background: rgba(190, 200, 215, .85); }
.spark { position: fixed; width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px; border-radius: 2px; }
.ring { position: fixed; border: 3px solid #e63946; border-radius: 10px;
  box-shadow: 0 0 0 4px rgba(230,57,70,.25), 0 0 18px rgba(230,57,70,.5); }
.pow { position: fixed; font: italic 900 20px/1 system-ui, sans-serif; color: #ffb703; -webkit-text-stroke: 1px #1b1f2b;
  text-shadow: 2px 2px 0 #1b1f2b; white-space: nowrap; }
.puff { position: fixed; width: 20px; height: 20px; margin: -10px 0 0 -10px; border-radius: 50%; background: #dfe3ea; }
@keyframes breathe { 50% { transform: scale(1.03, .97); } }
@keyframes wiggle { 25% { transform: rotate(-4deg); } 75% { transform: rotate(4deg); } }
@keyframes flutter { 50% { transform: rotate(-14deg); } }
@keyframes bubble { 0%, 100% { transform: scale(.35); } 55% { transform: scale(1.2); } }
@keyframes zzz {
  0% { opacity: 0; transform: translate(0, 0) scale(.6); }
  20% { opacity: 1; }
  100% { opacity: 0; transform: translate(26px, -48px) scale(1.2) rotate(-12deg); }
}
@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
`;

  const make = (tag, className, html) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (html) el.innerHTML = html;
    return el;
  };

  const host = document.createElement('booking-test-data-ninja');
  const shadow = host.attachShadow({ mode: 'open' });
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(CSS);
    shadow.adoptedStyleSheets = [sheet];
  } catch {
    shadow.append(make('style', null, CSS));
  }

  const stage = make('div', 'stage');
  const ninja = make('div', 'ninja asleep', NINJA_SVG);
  ninja.setAttribute('role', 'button');
  ninja.setAttribute('tabindex', '0');
  ninja.setAttribute('aria-label', 'Fyll ut skjemaet med testdata');
  ninja.title = 'Psst… klikk for å fylle ut skjemaet med testdata';
  const zzz = make('div', 'zzz', '<span>z</span><span>z</span><span>Z</span>');
  const speech = make('div', 'speech');
  speech.hidden = true;
  const exclaim = make('div', 'exclaim', '!');
  ninja.append(zzz, exclaim, speech);
  stage.append(ninja);
  shadow.append(stage);
  document.documentElement.append(host);

  const svg = ninja.querySelector('svg');
  const arm = ninja.querySelector('.arm');
  const bubble = ninja.querySelector('.bubble');

  // ---------- effects ----------

  const remove = (el, animation) => animation.finished.then(() => el.remove());

  const placeAt = (el, { x, y }) => {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    stage.append(el);
    return el;
  };

  const burst = (p, colors, count = 12, distance = 46) => {
    for (let i = 0; i < count; i++) {
      const spark = placeAt(make('div', 'spark'), p);
      spark.style.background = D.pick(colors);
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const d = distance * (0.6 + Math.random() * 0.6);
      remove(
        spark,
        anim(
          spark,
          [
            { translate: '0 0', rotate: '0deg', opacity: 1 },
            { translate: `${Math.cos(angle) * d}px ${Math.sin(angle) * d}px`, rotate: '220deg', opacity: 0 },
          ],
          520 + Math.random() * 200,
          { easing: 'cubic-bezier(.15,.8,.3,1)' }
        )
      );
    }
  };

  const puffs = (p) => {
    for (let i = 0; i < 6; i++) {
      const puff = placeAt(make('div', 'puff'), { x: p.x + (i - 2.5) * 12, y: p.y });
      const dx = (i - 2.5) * 10;
      remove(
        puff,
        anim(puff, [{ scale: 0.4, opacity: 0.9 }, { scale: 2, opacity: 0, translate: `${dx}px -14px` }], 600)
      );
    }
  };

  const say = (() => {
    let timer;
    return (text, duration = 1800) => {
      clearTimeout(timer);
      speech.textContent = text;
      speech.hidden = false;
      anim(speech, [{ scale: 0.3, opacity: 0 }, { scale: 1.08, opacity: 1, offset: 0.7 }, { scale: 1, opacity: 1 }], 260);
      timer = setTimeout(() => (speech.hidden = true), Math.max(duration, 400));
    };
  })();

  const feet = () => {
    const r = svg.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.bottom - 6 };
  };

  const hand = () => {
    const r = svg.getBoundingClientRect();
    return { x: r.left + r.width * 0.78, y: r.top + r.height * 0.6 };
  };

  const popBubble = async () => {
    const r = bubble.getBoundingClientRect();
    await anim(bubble, [{ scale: 1 }, { scale: 1.6 }], 160, { fill: 'none' }).finished;
    burst({ x: r.left + r.width / 2, y: r.top + r.height / 2 }, ['#bde0fe', '#8ecae6', '#ffffff'], 8, 24);
  };

  const jump = () =>
    anim(
      svg,
      [
        { translate: '0 0', scale: '1 1' },
        { translate: '0 0', scale: '1.15 .85', offset: 0.2 },
        { translate: '0 -46px', scale: '.92 1.08', offset: 0.55 },
        { translate: '0 0', scale: '1.12 .88', offset: 0.85 },
        { translate: '0 0', scale: '1 1' },
      ],
      620,
      { fill: 'none', easing: 'ease-in-out' }
    ).finished;

  const flip = async () => {
    puffs(feet());
    await anim(
      svg,
      [
        { translate: '0 0', rotate: '0deg', transformOrigin: '50% 60%' },
        { translate: '0 -80px', rotate: '-180deg', transformOrigin: '50% 60%', offset: 0.5 },
        { translate: '0 0', rotate: '-360deg', transformOrigin: '50% 60%' },
      ],
      800,
      { fill: 'none', easing: 'cubic-bezier(.3,.6,.4,1)' }
    ).finished;
    puffs(feet());
  };

  // Dashes along the bottom of the screen so the ninja stands below-left of the target.
  let ninjaX = 0;
  const HOME_LEFT = 20;
  const dashTo = async (targetX) => {
    const width = ninja.getBoundingClientRect().width;
    const left = Math.min(Math.max(targetX - 160, HOME_LEFT), innerWidth - width - 20);
    const dx = left - HOME_LEFT;
    if (Math.abs(dx - ninjaX) < 60) return;
    puffs(feet());
    const lean = dx > ninjaX ? '12deg' : '-12deg';
    anim(svg, [{ rotate: '0deg' }, { rotate: lean, offset: 0.3 }, { rotate: lean, offset: 0.7 }, { rotate: '0deg' }], 300, {
      fill: 'none',
    });
    await anim(ninja, [{ translate: `${ninjaX}px 0` }, { translate: `${dx}px 0` }], 300, {
      easing: 'cubic-bezier(.5,0,.2,1)',
    }).finished;
    ninjaX = dx;
  };

  const swingArm = () =>
    anim(
      arm,
      [{ rotate: '0deg' }, { rotate: '-170deg', offset: 0.45 }, { rotate: '-60deg', offset: 0.75 }, { rotate: '0deg' }],
      380,
      { fill: 'none', easing: 'ease-in-out' }
    );

  const trail = (star, flight) => {
    const tick = () => {
      if (flight.playState !== 'running') return;
      const r = star.getBoundingClientRect();
      const dot = placeAt(make('div', 'trail'), { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      remove(dot, anim(dot, [{ scale: 1, opacity: 0.7 }, { scale: 0.2, opacity: 0 }], 260));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Flies a shuriken from the ninja's hand to `to` along a quadratic bezier, spinning all the way.
  const throwStar = async (to) => {
    const from = hand();
    swingArm();
    await sleep(150);
    const star = placeAt(make('div', 'star', SHURIKEN_SVG), { x: 0, y: 0 });
    const ctrl = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 80 - Math.random() * 100 };
    const spin = 1080 + Math.random() * 360;
    const frames = [];
    for (let i = 0, n = 24; i <= n; i++) {
      const t = i / n;
      const x = (1 - t) ** 2 * from.x + 2 * (1 - t) * t * ctrl.x + t * t * to.x;
      const y = (1 - t) ** 2 * from.y + 2 * (1 - t) * t * ctrl.y + t * t * to.y;
      frames.push({ transform: `translate(${x}px, ${y}px) rotate(${spin * t}deg)` });
    }
    const flight = anim(star, frames, 440, { easing: 'linear' });
    trail(star, flight);
    await flight.finished;
    return star;
  };

  const impact = (el, star, p) => {
    // The star sticks for a moment, wobbles, then drops away.
    anim(star, [{ scale: 1.5 }, { scale: 1, offset: 0.15 }, { scale: 1, translate: '0 0', opacity: 1, offset: 0.7 }, { translate: '0 40px', opacity: 0 }], 900, {
      easing: 'ease-in',
    }).finished.then(() => star.remove());
    burst(p, ['#ffb703', '#fb8500', '#e63946', '#ffd166']);

    const box = (el.type === 'radio' && el.closest('.pkt-input-check')) || el;
    const r = box.getBoundingClientRect();
    const ring = placeAt(make('div', 'ring'), { x: r.left - 4, y: r.top - 4 });
    ring.style.width = `${r.width + 2}px`;
    ring.style.height = `${r.height + 2}px`;
    remove(ring, anim(ring, [{ scale: 1.12, opacity: 1 }, { scale: 1, opacity: 1, offset: 0.4 }, { scale: 1, opacity: 0 }], 800));

    box.animate(
      [{ translate: '0 0' }, { translate: '-5px 0' }, { translate: '5px 0' }, { translate: '-3px 0' }, { translate: '0 0' }],
      { duration: ms(260) }
    );

    if (Math.random() < 0.45) {
      const pow = placeAt(make('div', 'pow'), { x: p.x + 14, y: p.y - 34 });
      pow.textContent = D.pick(['Hai!', 'Tsjak!', 'Zing!', 'Vups!', 'Shing!', 'Bam!']);
      remove(
        pow,
        anim(pow, [{ scale: 0.3, opacity: 0, rotate: '-12deg' }, { scale: 1.1, opacity: 1, rotate: '-6deg', offset: 0.3 }, { scale: 1, opacity: 0, translate: '0 -18px' }], 900)
      );
    }
  };

  // ---------- form filling ----------

  const field = (id) => {
    const el = document.getElementById(id);
    if (!el) return null;
    return el.matches('input, textarea') ? el : el.querySelector('input, textarea');
  };

  const radios = (name) => [...document.querySelectorAll(`input[type="radio"][name="${name}"]`)];

  const waitFor = async (find, timeout = 4000) => {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      const el = find();
      if (el) return el;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return null;
  };

  // Waits until a smooth scroll has stopped moving the element.
  const settle = async (el) => {
    let last = el.getBoundingClientRect().top;
    for (let i = 0; i < 25; i++) {
      await new Promise((resolve) => setTimeout(resolve, 60));
      const top = el.getBoundingClientRect().top;
      if (Math.abs(top - last) < 1) return;
      last = top;
    }
  };

  // React tracks input values, so go through the native setter and fire a real input event.
  const setNativeValue = (el, value) => {
    const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const typeInto = async (el, value) => {
    const text = String(value);
    const step = Math.max(1, Math.ceil(text.length / 16));
    for (let i = step; i < text.length && !reducedMotion; i += step) {
      setNativeValue(el, text.slice(0, i));
      await sleep(16);
    }
    setNativeValue(el, text);
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const aimPoint = (el) => {
    const r = el.getBoundingClientRect();
    if (el.type === 'radio') return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    return { x: r.left + Math.min(28, r.width / 2), y: r.top + r.height / 2 };
  };

  // Throws a star at the element, then clicks it (radios) or types `value` into it.
  const strike = async (el, value) => {
    if (!el) return null;
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
    await settle(el);
    await dashTo(aimPoint(el).x);
    const p = aimPoint(el);
    const star = await throwStar(p);
    impact(el, star, p);
    if (value === undefined) el.click();
    else await typeInto(el, value);
    await sleep(120);
    return el;
  };

  // Mirrors SchoolForm.tsx and LoppemarkedForm.tsx in origo-booking.
  const fillForm = async () => {
    const isSchoolForm = radios('activityType').length > 0;
    if (!isSchoolForm && !field('applicantName')) return false;

    const p = D.person();
    let applicantType = 'organisasjon'; // LoppemarkedForm is always an organisation
    if (isSchoolForm) {
      const activity = await strike(D.pick(radios('activityType')));
      if (activity?.value === 'annet') await strike(await waitFor(() => field('otherActivityType')), D.otherActivity());
      await strike(D.pick(radios('targetAudience')));
      await strike(field('participants'), D.participants());
      await strike(field('shortDescription'), D.description());
      await strike(D.pick(radios('hasUsedLocationBefore')));
      applicantType = (await strike(D.pick(radios('applicantType'))))?.value;
    }

    await strike(await waitFor(() => field('applicantName')), p.name);
    await strike(field('applicantEmail'), p.email);
    await strike(field('applicantPhoneNo'), p.phone);

    if (applicantType === 'organisasjon') {
      await strike(await waitFor(() => field('organisasjonsnummer')), D.orgNumber());
      return true;
    }
    if (applicantType === 'frivilligLagForening') await strike(await waitFor(() => field('orgName')), D.volunteerOrg());
    if (applicantType === 'etatVirksomhetKommunen') await strike(await waitFor(() => field('orgName')), D.municipalOrg());
    await strike(await waitFor(() => field('addressStreetName')), p.street);
    await strike(field('addressPostCode'), p.postCode);
    await strike(field('addressPostalName'), p.postalName);
    return true;
  };

  // ---------- wake up! ----------

  let busy = false;

  const wake = async () => {
    if (busy) return;
    busy = true;
    try {
      await popBubble();
      ninja.classList.replace('asleep', 'awake');
      anim(exclaim, [{ opacity: 0, translate: '0 10px', scale: 0.4 }, { opacity: 1, translate: '0 0', scale: 1.2, offset: 0.3 }, { opacity: 1, scale: 1, offset: 0.8 }, { opacity: 0 }], 900);
      await jump();
      say(D.pick(['Hai! 🥷', 'Ninja-modus!', 'Testdata, kom hit!', 'Jeg var ikke sovende!']));
      await sleep(450);

      if (await fillForm()) {
        await dashTo(0);
        say('Ferdig! Sjekk og trykk «Opprett booking»', 3200);
        await flip();
      } else {
        say('Hmm… finner ikke skjemaet 🤔', 2400);
      }
      await sleep(2600);
    } catch (e) {
      console.error('[Booking Test Data Ninja]', e);
      say('Au! Noe gikk galt (se konsollen)', 2400);
      await sleep(2400);
    } finally {
      await dashTo(0);
      ninja.classList.replace('awake', 'asleep');
      busy = false;
    }
  };

  ninja.addEventListener('click', wake);
  ninja.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      wake();
    }
  });

  // The admin app is a SPA, so keep checking which page we're on.
  const syncVisibility = () => {
    host.style.display = location.pathname.startsWith(TARGET_PATH) ? '' : 'none';
  };
  syncVisibility();
  setInterval(syncVisibility, 700);
})();
