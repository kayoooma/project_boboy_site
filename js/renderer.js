// === МОДУЛЬ РЕНДЕРИНГА ИНТЕРФЕЙСА ===
const Renderer = (() => {
  // РЕНДЕР ТЕКСТОВ И ИНТЕРФЕЙСА
  function renderTopCopy() {
    // Проверка наличия необходимых объектов
    if (typeof STR === 'undefined' || typeof AppState === 'undefined') {
      console.error('STR or AppState is not defined');
      return;
    }
    
    // Проверка наличия перевода для текущего языка
    if (!STR[AppState.lang]) {
      console.error('No translations found for language:', AppState.lang);
      // Fallback to Russian
      AppState.lang = 'ru';
    }
    
    const langStrings = STR[AppState.lang];
    
    // Безопасный доступ к свойствам с fallback значениями
    AppUtils.$('#subtitle').textContent = langStrings.topbarSubtitle || 'UZBEK EATERY';
    AppUtils.$('#change-language')?.setAttribute('aria-label', langStrings.changeLanguage || 'Change language');
    AppUtils.$('#vegOnlyLabel').textContent = langStrings.vegOnly || 'Vegetarian only';
    
    const s = AppUtils.$('#search');
    if (s) s.placeholder = langStrings.searchPlaceholder || 'Search the menu…';
    
    AppUtils.$('#locationsLabel').textContent = langStrings.locations || 'Locations';
    AppUtils.$('#footerCopy').textContent = langStrings.footerCopy || 'Uzbek Eatery';
    AppUtils.$('#allergyNote').textContent = langStrings.allergyNote || 'Please inform us about any allergies';
    
    renderCategoryChips();
  }

  // Рендер чипсов категорий
  function renderCategoryChips() {
    const box = AppUtils.$('#cat-chips');
    if (!box || typeof MENU === 'undefined' || !MENU.categories) return;
    
    // Создаем массив категорий, исключая drinks_* категории
    const mainCategories = Object.keys(MENU.categories).filter(cat => !cat.startsWith('drinks_'));
    
    box.innerHTML = '';
    
    // Добавляем индикатор скрола
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    box.appendChild(scrollIndicator);
    
    // Добавляем основные категории
    mainCategories.forEach(id => {
      const b = document.createElement('button');
      b.className = 'px-4 py-2 rounded-full border text-sm font-semibold whitespace-nowrap transition chip';
      b.style.borderColor = '#EAE0D5';
      b.textContent = MENU.catNames[AppState.lang][id] || id;
      b.dataset.cat = id;
      b.onclick = () => Navigation.goToCategoryId(id);
      box.appendChild(b);
    });
    
    // Добавляем категорию "Напитки"
    const drinksBtn = document.createElement('button');
    drinksBtn.className = 'px-4 py-2 rounded-full border text-sm font-semibold whitespace-nowrap transition chip flex items-center gap-1';
    drinksBtn.style.borderColor = '#EAE0D5';
    drinksBtn.innerHTML = `${STR[AppState.lang].drinks || 'Drinks'} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    drinksBtn.dataset.cat = 'drinks';
    drinksBtn.onclick = Modals.showDrinksSubcategories;
    box.appendChild(drinksBtn);
    
    setActiveChip(activeCatId());
  }

  function setActiveChip(id) {
    AppUtils.$$('#cat-chips .chip').forEach(c => {
      const isActive = c.dataset.cat === id || (id.startsWith('drinks_') && c.dataset.cat === 'drinks');
      c.classList.toggle('active', isActive);
      c.style.borderWidth = isActive ? '2px' : '1px';
      c.style.borderColor = isActive ? 'var(--brand-blue)' : '#EAE0D5';
    });
  }

  const activeCatId = () => {
    if (!MENU.categories) return '';
    const categories = Object.keys(MENU.categories);
    return categories[AppState.activeCatIdx] || categories[0] || '';
  };

  // Рендер активной категории
  function renderActiveCategory() {
    const root = AppUtils.$('#menu-root');
    if (!root || typeof MENU === 'undefined' || !MENU.categories) return;
    
    root.innerHTML = '';
    const catId = activeCatId();
    if (!catId) return;
    
    // Проверяем, является ли категория drinks_*
    const isDrinksSubcategory = catId.startsWith('drinks_');
    
    const list = isDrinksSubcategory ? 
      (MENU.categories[catId] || []).map(k => MENU.items[k]).filter(matchesQuery) :
      MENU.categories[catId] ? (MENU.categories[catId] || []).map(k => MENU.items[k]).filter(matchesQuery) : [];
    
    const sec = document.createElement('section');
    sec.id = `cat-${catId}`;
    sec.className = 'fade-in';
    
    // Определяем заголовок категории
    let categoryTitle = isDrinksSubcategory ? 
      `${STR[AppState.lang].drinks || 'Drinks'} - ${MENU.catNames[AppState.lang][catId] || catId}` : 
      MENU.catNames[AppState.lang][catId] || catId;
    
    sec.innerHTML = `<h2 class="section-title text-3xl font-bold mb-8">${categoryTitle}</h2>`;
    
    const grid = document.createElement('div');
    grid.className = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-8';
    
    if (list.length === 0) {
      grid.innerHTML = `<div class='text-gray-500'>${AppState.lang === 'ru' ? 'Ничего не найдено в этой категории.' : AppState.lang === 'en' ? 'Nothing found in this category.' : 'Bu kategoriyada hech narsa topilmadi.'}</div>`;
    } else {
      list.forEach(it => {
        if (it) grid.appendChild(buildCard(it));
      });
    }
    
    sec.appendChild(grid);
    root.appendChild(sec);
    setActiveChip(catId);
  }

  function matchesQuery(item) {
    if (!item) return false;
    const text = (AppUtils.i18nName(item) + ' ' + (item?.i18n?.desc?.[AppState.lang] || '')).toLowerCase();
    const okQuery = !AppState.query || text.includes(AppState.query.toLowerCase());
    const okVeg = !AppState.vegOnly || item.veg;
    return okQuery && okVeg;
  }

  function buildCard(item) {
    const el = document.createElement('div');
    el.className = 'card p-4 flex flex-col cursor-pointer';
    el.dataset.id = item.id;
    const vegBadge = item.veg ? `<div class="w-7 h-7 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center" title="${STR[AppState.lang].vegetarian || 'Vegetarian'}"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" class="text-green-600"><path d="M7 14c-3 0-4-1-4-4  0-3 2-6 5-7 3 1 5 4 5 7s-1 4-4 4-2-1-2-1zM4 15c2 2 6 2 8 0"/></svg></div>` : '';
    const name = AppUtils.i18nName(item);
    const desc = item?.i18n?.desc?.[AppState.lang] || '';
    el.innerHTML = `<div class="flex-grow">
        <div class="flex justify-between items-start">
          <h4 class="font-heading font-bold text-lg pr-2">${name}</h4>
          ${vegBadge}
        </div>
        <p class="text-sm mt-1 text-gray-600">${desc}</p>
      </div>
      <div class="flex items-center justify-between mt-4">
        <div class="text-lg font-bold" style="color:var(--brand-dark-text)">${AppUtils.fmt(item.price)}</div>
      </div>`;
    el.addEventListener('click', () => Modals.openDishModal(item.id));
    return el;
  }

  return {
    renderTopCopy,
    renderActiveCategory,
    setActiveChip,
    activeCatId
  };
})();