// === МОДУЛЬ МОДАЛЬНЫХ ОКОН ===
const Modals = (() => {
  // МОДАЛ ПОДКАТЕГОРИЙ НАПИТКОВ
  function showDrinksSubcategories() {
    if (AppState.drinksModalOpen) return;
    AppState.drinksModalOpen = true;
    
    const modal = document.createElement('div');
    modal.id = 'drinks-modal';
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl p-6 w-[min(520px,calc(100%-32px))]">
        <div class="font-heading text-2xl font-extrabold text-center mb-4">${STR[AppState.lang].drinks}</div>
        <div class="grid grid-cols-2 gap-3">
          <button class="drinks-subcat-btn" data-subcat="drinks_coffee">${STR[AppState.lang].drinks_coffee}</button>
          <button class="drinks-subcat-btn" data-subcat="drinks_tea">${STR[AppState.lang].drinks_tea}</button>
          <button class="drinks-subcat-btn" data-subcat="drinks_cold">${STR[AppState.lang].drinks_cold}</button>
          <button class="drinks-subcat-btn" data-subcat="drinks_juices">${STR[AppState.lang].drinks_juices}</button>
          <button class="drinks-subcat-btn" data-subcat="drinks_hot_chocolate">${STR[AppState.lang].drinks_hot_chocolate}</button>
        </div>
        <button id="close-drinks-modal" class="mt-6 w-full py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">${AppState.lang === 'ru' ? 'Закрыть' : AppState.lang === 'en' ? 'Close' : 'Yopish'}</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Добавляем обработчики событий
    modal.querySelectorAll('.drinks-subcat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const subcat = btn.dataset.subcat;
        Navigation.goToCategoryId(subcat);
        closeDrinksModal();
      });
    });
    
    modal.querySelector('#close-drinks-modal').addEventListener('click', closeDrinksModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeDrinksModal();
    });
  }

  function closeDrinksModal() {
    const modal = AppUtils.$('#drinks-modal');
    if (modal) {
      modal.remove();
    }
    AppState.drinksModalOpen = false;
  }

  // МОДАЛ БЛЮДА
  function openDishModal(id) {
    const d = MENU.items[id];
    if (!d) return;
    const m = AppUtils.$('#dish-modal');
    if (!m) return;
    AppUtils.$('#dish-modal-image').src = d.image || HERO_IMG_SRC(id);
    AppUtils.$('#dish-modal-title').textContent = AppUtils.i18nName(d);
    AppUtils.$('#dish-modal-desc').textContent = AppUtils.i18nDesc(d, id);
    AppUtils.$('#dish-modal-price').textContent = AppUtils.fmt(d.price);
    m.classList.remove('hidden');
    m.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeDishModal() {
    const m = AppUtils.$('#dish-modal');
    if (!m) return;
    m.classList.add('hidden');
    m.classList.remove('flex');
    document.body.style.overflow = '';
  }

  return {
    showDrinksSubcategories,
    closeDrinksModal,
    openDishModal,
    closeDishModal
  };
})();