// === МОДУЛЬ ЖЕСТОВ И СВАЙПОВ ===
const Gestures = (() => {
  function enableCategorySwipe() {
    let x0 = null, y0 = null, locked = false;
    const TH = 50;
    document.body.addEventListener('touchstart', e => {
      const t = e.changedTouches[0];
      x0 = t.clientX;
      y0 = t.clientY;
      locked = false;
    }, { passive: true });
    document.body.addEventListener('touchmove', e => {
      if (x0 === null || locked) return;
      const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) > Math.abs(dy) * 1.6 && Math.abs(dx) > TH) {
        locked = true;
        Navigation.goToSiblingCategory(dx < 0 ? 1 : -1);
      }
    }, { passive: true });
    document.body.addEventListener('touchend', () => {
      x0 = y0 = null;
      locked = false;
    }, { passive: true });
  }

  function showSwipeHintOnce() {
    if (sessionStorage.getItem('swipe_hint_shown')) return;
    sessionStorage.setItem('swipe_hint_shown', '1');
    const h = document.createElement('div');
    h.className = 'swipe-hint';
    h.textContent = AppState.lang === 'ru' ? 'Свайпайте по экрану — следующий раздел' : 
                    AppState.lang === 'en' ? 'Swipe across the screen - next section' : 
                    'Ekranda siljitish - keyingi boʻlim';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2600);
  }

  return {
    enableCategorySwipe,
    showSwipeHintOnce
  };
})();