// === МОДУЛЬ HERO-СЛАЙДЕРА ===
const HeroSlider = (() => {
  // Инициализация Hero изображений
  function initHeroImages() {
    const id = MENU.heroIds[AppState.heroIdx];
    const src = HERO_IMG_SRC(id);
    const alt = AppUtils.i18nName(MENU.items[id]);
    const a = AppUtils.$('#hero-img-a');
    const b = AppUtils.$('#hero-img-b');
    if (a) {
      a.src = src;
      a.alt = alt;
      a.style.transition = 'none';
      a.style.transform = 'translateX(0)';
    }
    if (b) {
      b.src = src;
      b.alt = '';
      b.style.transition = 'none';
      b.style.transform = 'translateX(100%)';
    }
    AppState._heroFlip = false;
  }

  async function slideHeroImage(src, alt, dir = 1) {
    const a = AppUtils.$('#hero-img-a');
    const b = AppUtils.$('#hero-img-b');
    const incoming = AppState._heroFlip ? a : b;
    const outgoing = AppState._heroFlip ? b : a;
    if (!incoming || !outgoing) return;
    if (incoming.src !== src) incoming.src = src;
    incoming.alt = alt || '';
    try {
      if (incoming.decode) await incoming.decode();
    } catch (e) { }
    [incoming, outgoing].forEach(img => {
      img.style.transition = 'none';
    });
    incoming.style.transform = `translateX(${dir > 0 ? 100 : -100}%)`;
    outgoing.style.transform = 'translateX(0%)';
    void incoming.offsetWidth; // reflow
    const dur = 250, easing = 'cubic-bezier(.22,.61,.36,1)';
    incoming.style.transition = `transform ${dur}ms ${easing}`;
    outgoing.style.transition = `transform ${dur}ms ${easing}`;
    incoming.style.transform = 'translateX(0%)';
    outgoing.style.transform = `translateX(${dir > 0 ? -100 : 100}%)`;
    await new Promise(res => {
      let done = 0;
      const onEnd = (e) => {
        if (e.propertyName === 'transform') {
          e.currentTarget.removeEventListener('transitionend', onEnd);
          if (++done === 2) res();
        }
      };
      incoming.addEventListener('transitionend', onEnd);
      outgoing.addEventListener('transitionend', onEnd);
    });
    AppState._heroFlip = !AppState._heroFlip;
  }

  async function applyHero(id, dir = 1) {
    if (AppState.isHeroAnimating) return;
    AppState.isHeroAnimating = true;
    const d = MENU.items[id];
    if (!d) {
      AppState.isHeroAnimating = false;
      return;
    }
    const name = AppUtils.$('#dishOfDayName');
    const desc = AppUtils.$('#dishOfDayDesc');
    const badges = AppUtils.$('#dishOfDayBadges');
    [name, desc].forEach(el => {
      if (!el) return;
      el.classList.remove('slide-in');
      el.classList.add('slide-out');
    });
    setTimeout(() => {
      if (name) name.textContent = AppUtils.i18nName(d);
      if (desc) desc.textContent = AppUtils.i18nDesc(d, id);
      if (badges) badges.innerHTML = `<span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg border bg-amber-500/10 border-amber-500/20 text-amber-800 font-bold">${AppUtils.fmt(d.price)}</span>`;
      [name, desc].forEach(el => {
        if (!el) return;
        el.classList.remove('slide-out');
        el.classList.add('slide-in');
      });
      setTimeout(() => {
        [name, desc].forEach(el => el && el.classList.remove('slide-in'));
      }, 420);
    }, 60);
    await slideHeroImage(HERO_IMG_SRC(id), AppUtils.i18nName(d), dir);
    AppState.isHeroAnimating = false;
  }

  function startHero() {
    initHeroImages();
    applyHero(MENU.heroIds[AppState.heroIdx], 1);
    restartHeroTimer();
  }

  function restartHeroTimer() {
    if (AppState.heroTimer) clearInterval(AppState.heroTimer);
    AppState.heroTimer = setInterval(() => {
      if (AppState.isHeroAnimating) return;
      AppState.heroIdx = (AppState.heroIdx + 1) % MENU.heroIds.length;
      applyHero(MENU.heroIds[AppState.heroIdx], 1);
    }, 5000);
  }

  function nextHero() {
    if (AppState.isHeroAnimating) return;
    AppState.heroIdx = (AppState.heroIdx + 1) % MENU.heroIds.length;
    applyHero(MENU.heroIds[AppState.heroIdx], 1);
    restartHeroTimer();
  }

  function prevHero() {
    if (AppState.isHeroAnimating) return;
    AppState.heroIdx = (AppState.heroIdx - 1 + MENU.heroIds.length) % MENU.heroIds.length;
    applyHero(MENU.heroIds[AppState.heroIdx], -1);
    restartHeroTimer();
  }

  function enableHeroManual() {
    const area = AppUtils.$('#hero-slider');
    if (!area) return;
    area.querySelector('.hero-arrow.left')?.addEventListener('click', prevHero, { passive: true });
    area.querySelector('.hero-arrow.right')?.addEventListener('click', nextHero, { passive: true });
    let sx = null, sy = null, active = false;
    const TH = 40;
    area.addEventListener('touchstart', e => {
      const t = e.changedTouches[0];
      sx = t.clientX;
      sy = t.clientY;
      active = true;
    }, { passive: true });
    area.addEventListener('touchmove', e => {
      if (!active) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > TH) {
        active = false;
        if (dx < 0) nextHero();
        else prevHero();
      }
    }, { passive: true });
    area.addEventListener('touchend', () => {
      active = false;
    }, { passive: true });
    let px = null, py = null, down = false;
    area.addEventListener('pointerdown', e => {
      px = e.clientX;
      py = e.clientY;
      down = true;
    });
    area.addEventListener('pointerup', e => {
      if (!down) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > TH) {
        if (dx < 0) nextHero();
        else prevHero();
      }
      down = false;
    });
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') prevHero();
      else if (e.key === 'ArrowRight') nextHero();
    });
  }

  return {
    startHero,
    enableHeroManual,
    nextHero,
    prevHero
  };
})();