// === МОДУЛЬ ДЕКОРА И АНИМАЦИЙ ===
const Decor = (() => {
  // СКРОЛЛ-ДЕКОР (плавный, без лагов)
  function setupDecor() {
    const donkey = AppUtils.$('#donkey-art');
    const footer = AppUtils.$('footer');
    const left = AppUtils.$('#left-art');
    const menu = AppUtils.$('#menu-root');
    if (!donkey || !footer || !left || !menu) return;

    // Скрываем осла до тех пор, пока не проскроллим до меню
    const donkeyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          donkey.style.display = 'block';
        } else {
          donkey.style.display = 'none';
        }
      });
    }, { threshold: 0.1 });

    donkeyObserver.observe(menu);

    // Останавливаем осла у футера через IntersectionObserver
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { // футер на экране — фиксируем позицию осла над футером
          const dH = donkey.getBoundingClientRect().height;
          const footerTopAbs = footer.getBoundingClientRect().top + window.scrollY;
          donkey.style.position = 'absolute';
          donkey.style.top = (footerTopAbs - dH) + 'px';
          donkey.style.right = '0';
          donkey.style.bottom = '';
        } else { // обычный fixed
          donkey.style.position = 'fixed';
          donkey.style.bottom = '0';
          donkey.style.right = '0';
          donkey.style.top = '';
        }
      }
    }, { root: null, threshold: 0.01 });
    io.observe(footer);

    // Левый арт привязываем к верху секции меню (обновляем по скроллу/resize, но через rAF)
    const onSR = (() => {
      let raf = 0;
      return () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 2;
          const menuRect = menu.getBoundingClientRect();
          left.style.position = 'absolute';
          left.style.left = '0px';
          left.style.top = menuRect.top + 'px';
        });
      };
    })();
    window.addEventListener('scroll', onSR, { passive: true });
    window.addEventListener('resize', onSR);
    left.addEventListener('load', onSR);
    donkey.addEventListener('load', onSR);
    onSR();
  }

  return {
    setupDecor
  };
})();