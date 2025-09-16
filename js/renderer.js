// === МОДУЛЬ РЕНДЕРИНГА ИНТЕРФЕЙСА ===
const Renderer = (() => {
  // РЕНДЕР ТЕКСТОВ И ИНТЕРФЕЙСА
  function renderTopCopy() {
    AppUtils.$('#subtitle').textContent = STR[AppState.lang].topbarSubtitle;
    AppUtils.$('#change-language')?.setAttribute('aria-label', STR[AppState.lang].changeLanguage);
    AppUtils.$('#vegOnlyLabel').textContent = STR[AppState.lang].vegOnly;
    const s = AppUtils.$('#search');
    if (s) s.placeholder = STR[AppState.lang].searchPlaceholder;
    AppUtils.$('#locationsLabel').textContent = STR[AppState.lang].locations;
    AppUtils.$('#footerCopy').textContent = STR[AppState.lang].footerCopy;
    AppUtils.$('#allergyNote').textContent = STR[AppState.lang].allergyNote;
    renderCategoryChips();
  }

  // Рендер чипсов категорий
  function renderCategoryChips() {
    const box = AppUtils.$('#cat-chips');
    if (!box) return;
    
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
      b.textContent = MENU.catNames[AppState.lang][id];
      b.dataset.cat = id;
      b.onclick = () => Navigation.goToCategoryId(id);
      box.appendChild(b);
    });
    
    // Добавляем категорию "Напитки"
    const drinksBtn = document.createElement('button');
    drinksBtn.className = 'px-4 py-2 rounded-full border text-sm font-semibold whitespace-nowrap transition chip';
    drinksBtn.style.borderColor = '#EAE0D5';
    drinksBtn.textContent = STR[AppState.lang].drinks;
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

  const activeCatId = () => Object.keys(MENU.categories)[AppState.activeCatIdx] || Object.keys(MENU.categories)[0];

  // Рендер активной категории
  function renderActiveCategory() {
    const root = AppUtils.$('#menu-root');
    if (!root) return;
    root.innerHTML = '';
    const catId = activeCatId();
    
    // Проверяем, является ли категория drinks_*
    const isDrinksSubcategory = catId.startsWith('drinks_');
    
    const list = isDrinksSubcategory ? 
      MENU.categories[catId].map(k => MENU.items[k]).filter(matchesQuery) :
      MENU.categories[catId] ? MENU.categories[catId].map(k => MENU.items[k]).filter(matchesQuery) : [];
    
    const sec = document.createElement('section');
    sec.id = `cat-${catId}`;
    sec.className = 'fade-in';
    
    // Определяем заголовок категории
    let categoryTitle = isDrinksSubcategory ? 
      `${STR[AppState.lang].drinks} - ${MENU.catNames[AppState.lang][catId]}` : 
      MENU.catNames[AppState.lang][catId];
    
    sec.innerHTML = `<h2 class="section-title text-3xl font-bold mb-8">${categoryTitle}</h2>`;
    
    const grid = document.createElement('div');
    grid.className = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-8';
    
    if (list.length === 0) {
      grid.innerHTML = `<div class='text-gray-500'>${AppState.lang === 'ru' ? 'Ничего не найдено в этой категории.' : AppState.lang === 'en' ? 'Nothing found in this category.' : 'Bu kategoriyada hech narsa topilmadi.'}</div>`;
    } else {
      list.forEach(it => grid.appendChild(buildCard(it)));
    }
    
    sec.appendChild(grid);
    root.appendChild(sec);
    setActiveChip(catId);
  }

  function matchesQuery(item) {
    const text = (AppUtils.i18nName(item) + ' ' + (item?.i18n?.desc?.[AppState.lang] || '')).toLowerCase();
    const okQuery = !AppState.query || text.includes(AppState.query.toLowerCase());
    const okVeg = !AppState.vegOnly || item.veg;
    return okQuery && okVeg;
  }

  function buildCard(item) {
    const el = document.createElement('div');
    el.className = 'card p-4 flex flex-col cursor-pointer';
    el.dataset.id = item.id;
    const vegBadge = item.veg ? `<div class="w-7 h-7 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center" title="${STR[AppState.lang].vegetarian}"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" class=\"text-green-600\"><path d=\"M7 14c-3 0-4-1-4-4 极速快3 0-3 2-6 5-7 3 1 5 4 5 7s-1 4-4 4-2-1-2-1zM4 15c2 2 6 2 8 0\"/></svg></div>` : '';
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