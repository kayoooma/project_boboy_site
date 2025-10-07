// === ОСНОВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ПРИЛОЖЕНИЯ ===
function initApp() {
  // Предотвращаем множественную инициализацию
  if (window.appInitialized) {
    console.log('App already initialized');
    return;
  }
  window.appInitialized = true;
  
  try {
    // Инициализация прелоадера
    if (typeof Preloader !== 'undefined' && typeof Preloader.init === 'function') {
      Preloader.init();
    }
    
    // Проверяем, что все необходимые модули загружены
    if (typeof AppState === 'undefined' || typeof Renderer === 'undefined' || 
        typeof HeroSlider === 'undefined' || typeof Language === 'undefined' ||
        typeof Modals === 'undefined' || typeof Navigation === 'undefined' ||
        typeof Gestures === 'undefined') {
      console.error('One or more modules are not loaded');
      return;
    }
    
    // Инициализация состояния приложения
    if (typeof AppState.init === 'function') {
      AppState.init();
    }
    
    Renderer.renderTopCopy();
    
    // Инициализация hero-слайдера
    if (typeof HeroSlider.init === 'function') {
      HeroSlider.init();
    }
    
    if (typeof HeroSlider.enableControls === 'function') {
      HeroSlider.enableControls();
    }
    
    Renderer.renderActiveCategory();
    
    // Показываем языковое окно, если язык не выбран
    if (!localStorage.getItem('boboy_lang') && typeof Language.showLangGate === 'function') {
      Language.showLangGate();
    }
    
    // Настройка декора
    if (typeof Decor.setupDecor === 'function') {
      Decor.setupDecor();
    }
    
    // Привязка языковых кнопок
    if (typeof Language.bindLangButtons === 'function') {
      Language.bindLangButtons();
    }

    // Слушатели
    const searchEl = document.querySelector('#search');
    if (searchEl) {
      const debouncedSearch = AppUtils.debounce(e => {
        AppState.query = e.target.value;
        Renderer.renderActiveCategory();
      }, 140);
      
      searchEl.addEventListener('input', debouncedSearch);
    }
    
    const vegBtn = document.querySelector('#vegOnlyBtn');
    if (vegBtn) {
      vegBtn.classList.toggle('bg-green-100', AppState.vegOnly);
      vegBtn.classList.toggle('border-green-300', AppState.vegOnly);
      
      vegBtn.addEventListener('click', () => {
        AppState.vegOnly = !AppState.vegOnly;
        localStorage.setItem('boboy_veg_only', AppState.vegOnly ? '1' : '0');
        
        // Обновляем стиль кнопки
        vegBtn.classList.toggle('bg-green-100', AppState.vegOnly);
        vegBtn.classList.toggle('border-green-300', AppState.vegOnly);
        
        Renderer.renderActiveCategory();
      });
    }

    // Модал блюд
    const dishModal = document.querySelector('#dish-modal');
    if (dishModal) {
      dishModal.addEventListener('click', e => {
        if (e.target.id === 'dish-modal' && typeof Modals.closeDishModal === 'function') {
          Modals.closeDishModal();
        }
      });
    }
    
    const dishModalClose = document.querySelector('#dish-modal-close');
    if (dishModalClose && typeof Modals.closeDishModal === 'function') {
      dishModalClose.addEventListener('click', Modals.closeDishModal);
    }
    
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && typeof Modals.closeDishModal === 'function') {
        Modals.closeDishModal();
      }
    });

    // Жесты для мобильных устройств
    if (window.matchMedia('(max-width: 767px)').matches) {
      if (typeof Gestures.enableCategorySwipe === 'function') {
        Gestures.enableCategorySwipe();
      }
      
      if (typeof Gestures.showSwipeHintOnce === 'function') {
        Gestures.showSwipeHintOnce();
      }
    }
    
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Error initializing app:', error);
    // В случае ошибки все равно скрываем прелоадер
    if (typeof Preloader !== 'undefined' && typeof Preloader.hidePreloader === 'function') {
      Preloader.hidePreloader();
    }
  }
}

// Функция обновления интерфейса при смене языка
function updateAppLanguage() {
  // Закрываем модальное окно напитков если открыто
  if (AppState.drinksModalOpen) {
    Modals.closeDrinksModal();
  }

  Renderer.renderTopCopy();
  Renderer.renderCategoryChips();
  Renderer.renderActiveCategory();
  
  // Обновляем текст в hero-слайдере
  if (typeof HeroSlider.updateTexts === 'function') {
    HeroSlider.updateTexts();
  }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', initApp);