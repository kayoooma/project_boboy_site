// === МОДУЛЬ СОСТОЯНИЯ ПРИЛОЖЕНИЯ ===
const AppState = (() => {
  // Получаем язык из localStorage или используем русский по умолчанию
  let lang = 'ru';
  try {
    lang = localStorage.getItem('boboy_lang') || 'ru';
  } catch (e) {
    console.error('Error accessing localStorage:', e);
  }

  return {
    lang: lang,
    vegOnly: localStorage.getItem('boboy_veg_only') === '1',
    query: '',
    heroIdx: 0,
    heroTimer: null,
    isHeroAnimating: false,
    _heroFlip: false,
    activeCatIdx: parseInt(sessionStorage.getItem('active_cat_idx') || '0') || 0,
    drinksModalOpen: false,
    
    init: function() {
      console.log('AppState initialized with lang:', this.lang);
    }
  };
})();