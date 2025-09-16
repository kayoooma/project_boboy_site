// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
function preloadHeroImages() {
  const list = MENU.heroIds.map(id => HERO_IMG_SRC(id)).filter(Boolean);
  const load = src => {
    const img = new Image();
    img.loading = 'eager';
    img.decoding = 'async';
    img.src = src;
    img.decode?.().catch(() => { });
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => list.forEach(load));
  } else {
    setTimeout(() => list.forEach(load), 0);
  }
}