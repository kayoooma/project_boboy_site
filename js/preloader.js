// === МОДУЛЬ ПРЕЛОАДЕРА ===
const Preloader = (() => {
  let isHidden = false;
  
  function init() {
    // Предзагрузка критических изображений
    preloadCriticalImages();
    
    // Скрываем прелоадер когда все загружено
    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 1000); // Минимальное время показа
    });
    
    // Резервное скрытие через 4 секунды
    setTimeout(() => {
      if (!isHidden) hidePreloader();
    }, 4000);
  }
  
  function preloadCriticalImages() {
    const criticalImages = [
      'BOBOY_logo_basic_blue (1).png',
      'assets/Plov.webp',
      'assets/lagman-uygurskiy.webp',
      'assets/shashlik-mol_jaz.webp',
      'assets/kazan-kebab.webp'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  function hidePreloader() {
    if (isHidden) return;
    
    const preloader = document.querySelector('#preloader');
    if (!preloader) return;
    
    // Добавляем анимацию исчезновения
    preloader.classList.add('hidden');
    
    // Удаляем из DOM после анимации
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 1000);
    
    isHidden = true;
    
    // Запускаем мониторинг производительности после загрузки
    if (window.PerformanceMonitor) {
      setTimeout(() => window.PerformanceMonitor.start(), 500);
    }
    
    console.log('Preloader hidden, app fully loaded');
  }
  
  return {
    init,
    hidePreloader
  };
})();