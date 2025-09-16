// === ОСНОВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ПРИЛОЖЕНИЯ ===
function initApp() {
  Renderer.renderTopCopy();
  preloadHeroImages();
  HeroSlider.startHero();
  HeroSlider.enableHeroManual();
  Renderer.renderActiveCategory();
  if (!localStorage.getItem('boboy_lang')) Language.showLangGate();
  Decor.setupDecor();
  Language.bindLangButtons();

  // Слушатели
  const searchEl = AppUtils.$('#search');
  const debouncedSearch = AppUtils.debounce(e => {
    AppState.query = e.target.value;
    Renderer.renderActiveCategory();
  }, 140);
  
  searchEl?.addEventListener('input', debouncedSearch);
  
  const vegBtn = AppUtils.$('#vegOnlyBtn');
  if (vegBtn) {
    vegBtn.classList.toggle('bg-green-100', AppState.vegOnly);
    vegBtn.classList.toggle('border-green-300', AppState.vegOnly);
  }
  
  vegBtn?.addEventListener('click', () => {
    AppState.vegOnly = !AppState.vegOnly;
    localStorage.setItem('boboy_veg_only', AppState.vegOnly ? '1' : '0');
    AppUtils.$('#vegOnlyBtn').classList.toggle('bg-green-100', AppState.vegOnly);
    AppUtils.$('#vegOnlyBtn').classList.toggle('border-green-300', AppState.vegOnly);
    Renderer.renderActiveCategory();
  });

  // Модал блюд
  AppUtils.$('#dish-modal')?.addEventListener('click', e => {
    if (e.target.id === 'dish-modal') Modals.closeDishModal();
  });
  AppUtils.$('#dish-modal-close')?.addEventListener('click', Modals.closeDishModal);
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') Modals.closeDishModal();
  });

  if (window.matchMedia('(max-width: 767px)').matches) {
    Gestures.enableCategorySwipe();
    Gestures.showSwipeHintOnce();
  }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', initApp);