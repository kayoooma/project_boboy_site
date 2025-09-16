// === МОДУЛЬ НАВИГАЦИИ ===
const Navigation = (() => {
  function goToCategoryId(id) {
    const ids = Object.keys(MENU.categories);
    const idx = ids.indexOf(id);
    if (idx === -1) return;
    AppState.activeCatIdx = idx;
    sessionStorage.setItem('active_cat_idx', String(AppState.activeCatIdx));
    Renderer.renderActiveCategory();
  }

  function goToSiblingCategory(dir) {
    const ids = Object.keys(MENU.categories);
    AppState.activeCatIdx = Math.min(ids.length - 1, Math.max(0, AppState.activeCatIdx + dir));
    sessionStorage.setItem('active_cat_idx', String(AppState.activeCatIdx));
    Renderer.renderActiveCategory();
  }

  return {
    goToCategoryId,
    goToSiblingCategory
  };
})();