// === МОДУЛЬ СОСТОЯНИЯ ПРИЛОЖЕНИЯ ===
const AppState = (() => {
  return {
    lang: localStorage.getItem('boboy_lang') || 'ru',
    vegOnly: localStorage.getItem('boboy_veg_only') === '1',
    query: '',
    heroIdx: 0,
    heroTimer: null,
    isHeroAnimating: false,
    _heroFlip: false,
    activeCatIdx: parseInt(sessionStorage.getItem('active_cat_idx') || '0') || 0,
    drinksModalOpen: false
  };
})();