// heroSlider.js - исправленная версия с анимацией текста
const HeroSlider = (() => {
  let currentIndex = 0;
  let isAnimating = false;
  let sliderTimer = null;
  let initialized = false;

  // Инициализация слайдера
  function init() {
    if (initialized) return;
    console.log('HeroSlider init called');
    
    // Обновляем текст для текущего слайда  
    const currentDish = MENU.items[MENU.heroIds[currentIndex]];
    updateHeroText(currentDish, AppUtils.$('#hero-text-a'));
    
    // Загружаем первое изображение
    loadImage(currentIndex);
    
    // Предзагружаем следующее изображение
    preloadNextImage();
    
    // Запускаем таймер
    startTimer();
    
    initialized = true;
  }

  // Загрузка изображения
  function loadImage(index) {
    const id = MENU.heroIds[index];
    const dish = MENU.items[id];
    const src = HERO_IMG_SRC(id);
    
    const img = new Image();
    img.src = src;
    img.alt = AppUtils.i18nName(dish);
    
    img.onload = () => {
      // Устанавливаем изображение в активный слот
      const activeImg = AppUtils.$('#hero-img-a');
      if (activeImg) {
        activeImg.src = src;
        activeImg.alt = AppUtils.i18nName(dish);
      }
      
      // Обновляем текст
      updateHeroText(dish, AppUtils.$('#hero-text-a'));
    };
    
    return img;
  }

  // Предзагрузка следующего изображения
  function preloadNextImage() {
    const nextIndex = (currentIndex + 1) % MENU.heroIds.length;
    const id = MENU.heroIds[nextIndex];
    const src = HERO_IMG_SRC(id);
    
    const img = new Image();
    img.src = src;
  }

  // Обновление текста
  function updateHeroText(dish, element) {
    const name = element.querySelector('.dish-name');
    const desc = element.querySelector('.dish-desc');
    const badges = element.querySelector('.dish-badges');
    
    if (name) name.textContent = AppUtils.i18nName(dish);
    if (desc) desc.textContent = AppUtils.i18nDesc(dish, dish.id);
    if (badges) {
      badges.innerHTML = `<span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg border bg-amber-500/10 border-amber-500/20 text-amber-800 font-bold">${AppUtils.fmt(dish.price)}</span>`;
    }
  }

  // Плавная анимация перехода
  function animateTransition(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    const container = AppUtils.$('#hero-slider');
    const activeImg = AppUtils.$('#hero-img-a');
    const nextImg = AppUtils.$('#hero-img-b');
    const activeText = AppUtils.$('#hero-text-a');
    const nextText = AppUtils.$('#hero-text-b');
    
    if (!container || !activeImg || !nextImg || !activeText || !nextText) {
      isAnimating = false;
      return;
    }
    
    // Определяем следующий индекс
    const nextIndex = direction === 'next' 
      ? (currentIndex + 1) % MENU.heroIds.length
      : (currentIndex - 1 + MENU.heroIds.length) % MENU.heroIds.length;
    
    const nextId = MENU.heroIds[nextIndex];
    const nextDish = MENU.items[nextId];
    const nextSrc = HERO_IMG_SRC(nextId);
    
    // Устанавливаем следующее изображение
    nextImg.src = nextSrc;
    nextImg.alt = AppUtils.i18nName(nextDish);
    
    // Обновляем текст для следующего слайда
    updateHeroText(nextDish, nextText);
    
    // Настраиваем начальные позиции
    activeImg.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    nextImg.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    activeText.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    nextText.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    
    if (direction === 'next') {
      activeImg.style.transform = 'translateX(0)';
      nextImg.style.transform = 'translateX(100%)';
      activeText.style.opacity = '1';
      activeText.style.transform = 'translateX(0)';
      nextText.style.opacity = '0';
      nextText.style.transform = 'translateX(100%)';
    } else {
      activeImg.style.transform = 'translateX(0)';
      nextImg.style.transform = 'translateX(-100%)';
      activeText.style.opacity = '1';
      activeText.style.transform = 'translateX(0)';
      nextText.style.opacity = '0';
      nextText.style.transform = 'translateX(-100%)';
    }
    
    // Даем браузеру время на отрисовку
    setTimeout(() => {
      // Запускаем анимацию
      if (direction === 'next') {
        activeImg.style.transform = 'translateX(-100%)';
        nextImg.style.transform = 'translateX(0)';
        activeText.style.opacity = '0';
        activeText.style.transform = 'translateX(-100%)';
        nextText.style.opacity = '1';
        nextText.style.transform = 'translateX(0)';
      } else {
        activeImg.style.transform = 'translateX(100%)';
        nextImg.style.transform = 'translateX(0)';
        activeText.style.opacity = '0';
        activeText.style.transform = 'translateX(100%)';
        nextText.style.opacity = '1';
        nextText.style.transform = 'translateX(0)';
      }
      
      // По завершении анимации
      const onTransitionEnd = () => {
        // Сбрасываем трансформации
        activeImg.style.transition = 'none';
        nextImg.style.transition = 'none';
        activeText.style.transition = 'none';
        nextText.style.transition = 'none';
        
        // Меняем местами изображения
        activeImg.style.transform = 'translateX(0)';
        nextImg.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        
        // Копируем следующее изображение в активное
        activeImg.src = nextImg.src;
        activeImg.alt = nextImg.alt;
        
        // Копируем следующий текст в активный
        updateHeroText(nextDish, activeText);
        
        // Сбрасываем позиции текста
        activeText.style.opacity = '1';
        activeText.style.transform = 'translateX(0)';
        nextText.style.opacity = '0';
        nextText.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        
        // Обновляем текущий индекс
        currentIndex = nextIndex;
        
        // Предзагружаем следующее изображение
        preloadNextImage();
        
        isAnimating = false;
        
        // Убираем обработчик
        activeImg.removeEventListener('transitionend', onTransitionEnd);
      };
      
      activeImg.addEventListener('transitionend', onTransitionEnd);
    }, 50);
  }

  // Следующий слайд
  function nextSlide() {
    animateTransition('next');
    restartTimer();
  }

  // Предыдущий слайд
  function prevSlide() {
    animateTransition('prev');
    restartTimer();
  }

  // Запуск таймера
  function startTimer() {
    if (sliderTimer) clearInterval(sliderTimer);
    sliderTimer = setInterval(nextSlide, 5000);
  }

  // Перезапуск таймера
  function restartTimer() {
    if (sliderTimer) {
      clearInterval(sliderTimer);
      startTimer();
    }
  }

  // Остановка таймера
  function stopTimer() {
    if (sliderTimer) {
      clearInterval(sliderTimer);
      sliderTimer = null;
    }
  }

  // Включение управления
  function enableControls() {
    const area = AppUtils.$('#hero-slider');
    if (!area) return;
    
    // Стрелки
    const leftArrow = area.querySelector('.hero-arrow.left');
    const rightArrow = area.querySelector('.hero-arrow.right');
    
    if (leftArrow) {
      leftArrow.addEventListener('click', prevSlide);
    }
    
    if (rightArrow) {
      rightArrow.addEventListener('click', nextSlide);
    }
    
    // Свайпы
    let touchStartX = 0;
    
    area.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    area.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    }, { passive: true });
    
    // Клавиатура
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  }

  // Обновление текстов при смене языка
  function updateTexts() {
    if (MENU.heroIds.length === 0) return;
    const currentDish = MENU.items[MENU.heroIds[currentIndex]];
    if (!currentDish) return;
    updateHeroText(currentDish, AppUtils.$('#hero-text-a'));
    updateHeroText(currentDish, AppUtils.$('#hero-text-b'));
  }

  return {
    init,
    enableControls,
    nextSlide,
    prevSlide,
    updateTexts
  };
})();