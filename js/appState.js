// === МОДУЛЬ СОСТОЯНИЯ ПРИЛОЖЕНИЯ ===
const AppState = (() => {
  // Принудительно устанавливаем русский язык по умолчанию
  let lang = 'ru';
  try {
    const savedLang = localStorage.getItem('boboy_lang');
    // Используем сохраненный язык только если он есть, иначе оставляем русский
    if (savedLang) {
      lang = savedLang;
    } else {
      localStorage.setItem('boboy_lang', 'ru');
    }
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