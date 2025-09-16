// === МОДУЛЬ РАБОТЫ С ЯЗЫКАМИ ===
const Language = (() => {
  function bindLangButtons() {
    AppUtils.$$('#change-language,[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const l = btn.getAttribute('data-lang');
        if (!l) {
          showLangGate();
          return;
        }
        AppState.lang = l;
        localStorage.setItem('boboy_lang', l);
        initApp();
        hideLangGate();
      });
    });
  }

  function showLangGate() {
    const g = AppUtils.$('#lang-gate');
    if (g) {
      g.classList.remove('hidden');
      g.classList.add('flex');
    }
  }

  function hideLangGate() {
    const g = AppUtils.$('#lang-gate');
    if (g) {
      g.classList.add('hidden');
      g.classList.remove('flex');
    }
  }

  return {
    bindLangButtons,
    showLangGate,
    hideLangGate
  };
})();