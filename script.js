// === ЛОГИКА ПРИЛОЖЕНИЯ ===

// Утилиты
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const fmt = n => new Intl.NumberFormat('ru-RU').format(n) + ' UZS';

// Глобальные переменные
let lang = localStorage.getItem('boboy_lang') || 'ru';
let vegOnly = localStorage.getItem('boboy_veg_only') === '1';
let query = '';
let heroIdx = 0, heroTimer = null, isHeroAnimating = false, _heroFlip = false;
let activeCatIdx = parseInt(sessionStorage.getItem('active_cat_idx') || '0') || 0;
let drinksModalOpen = false;

// Загрузка и кеширование данных меню
function loadMenuData() {
  const cachedMenu = localStorage.getItem('boboy_menu_data');
  
  if (cachedMenu) {
    try {
      const parsedMenu = JSON.parse(cachedMenu);
      // Проверяем актуальность данных (1 день)
      const oneDay = 24 * 60 * 60 * 1000;
      const isFresh = new Date().getTime() - parsedMenu.timestamp < oneDay;
      const isSameVersion = parsedMenu.version === MENU.version;
      
      console.log('Cache status:', {
        hasCache: true,
        isFresh: isFresh,
        versionMatch: isSameVersion,
        timestamp: new Date(parsedMenu.timestamp).toLocaleString()
      });
      
      if (isFresh && isSameVersion) {
        console.log('Using cached menu data');
        return Promise.resolve(parsedMenu);
      } else {
        console.log('Cache invalidated:', {
          reason: !isFresh ? 'cache expired' : 'version mismatch',
          currentVersion: MENU.version,
          cachedVersion: parsedMenu.version
        });
        
        // Удаляем устаревшие данные
        localStorage.removeItem('boboy_menu_data');
      }
    } catch (e) {
      console.error('Error parsing cached menu data', e);
      localStorage.removeItem('boboy_menu_data');
    }
  } else {
    console.log('No cached menu data found');
  }

  // Если нет кеша или он устарел, используем текущие данные
  console.log('Using fresh menu data');
  const menuData = {
    ...MENU,
    timestamp: new Date().getTime()
  };
  
  // Сохраняем в кеш
  try {
    localStorage.setItem('boboy_menu_data', JSON.stringify(menuData));
    console.log('Menu data cached successfully');
  } catch (e) {
    console.error('Failed to cache menu data:', e);
  }
  
  return Promise.resolve(menuData);
}

// Вспомогательные функции
const locName = o => o?.[lang] || o?.ru || '';
const i18nName = item => item?.i18n?.name?.[lang] || item?.i18n?.name?.ru || '';
const i18nDesc = (item, idFallback) => item?.i18n?.desc?.[lang] || HERO_DESC_BY_ID[lang]?.[idFallback] || STR[lang].dishOfDayDesc;

// РЕНДЕР ТЕКСТОВ И ИНТЕРФЕЙСА
function renderTopCopy() {
  $('#subtitle').textContent = STR[lang].topbarSubtitle;
  $('#change-language')?.setAttribute('aria-label', STR[lang].changeLanguage);
  $('#vegOnlyLabel').textContent = STR[lang].vegOnly;
  const s = $('#search');
  if (s) s.placeholder = STR[lang].searchPlaceholder;
  $('#locationsLabel').textContent = STR[lang].locations;
  $('#footerCopy').textContent = STR[lang].footerCopy;
  $('#allergyNote').textContent = STR[lang].allergyNote;
  renderCategoryChips();
}

// HERO СЛАЙДЕР
function initHeroImages() {
  const id = MENU.heroIds[heroIdx];
  const src = HERO_IMG_SRC(id);
  const alt = i18nName(MENU.items[id]);
  const a = $('#hero-img-a');
  const b = $('#hero-img-b');
  if (a) {
    a.src = src;
    a.alt = alt;
    a.style.transition = 'none';
    a.style.transform = 'translateX(0)';
  }
  if (b) {
    b.src = src;
    b.alt = '';
    b.style.transition = 'none';
    b.style.transform = 'translateX(100%)';
  }
  _heroFlip = false;
}

async function slideHeroImage(src, alt, dir = 1) {
  const a = $('#hero-img-a');
  const b = $('#hero-img-b');
  const incoming = _heroFlip ? a : b;
  const outgoing = _heroFlip ? b : a;
  if (!incoming || !outgoing) return;
  if (incoming.src !== src) incoming.src = src;
  incoming.alt = alt || '';
  try {
    if (incoming.decode) await incoming.decode();
  } catch (e) { }
  [incoming, outgoing].forEach(img => {
    img.style.transition = 'none';
  });
  incoming.style.transform = `translateX(${dir > 0 ? 100 : -100}%)`;
  outgoing.style.transform = 'translateX(0%)';
  void incoming.offsetWidth; // reflow
  const dur = 520, easing = 'cubic-bezier(.22,.61,.36,1)';
  incoming.style.transition = `transform ${dur}ms ${easing}`;
  outgoing.style.transition = `transform ${dur}ms ${easing}`;
  incoming.style.transform = 'translateX(0%)';
  outgoing.style.transform = `translateX(${dir > 0 ? -100 : 100}%)`;
  await new Promise(res => {
    let done = 0;
    const onEnd = (e) => {
      if (e.propertyName === 'transform') {
        e.currentTarget.removeEventListener('transitionend', onEnd);
        if (++done === 2) res();
      }
    };
    incoming.addEventListener('transitionend', onEnd);
    outgoing.addEventListener('transitionend', onEnd);
  });
  _heroFlip = !_heroFlip;
}

async function applyHero(id, dir = 1) {
  if (isHeroAnimating) return;
  isHeroAnimating = true;
  const d = MENU.items[id];
  if (!d) {
    isHeroAnimating = false;
    return;
  }
  const name = $('#dishOfDayName');
  const desc = $('#dishOfDayDesc');
  const badges = $('#dishOfDayBadges');
  [name, desc].forEach(el => {
    if (!el) return;
    el.classList.remove('slide-in');
    el.classList.add('slide-out');
  });
  setTimeout(() => {
    if (name) name.textContent = i18nName(d);
    if (desc) desc.textContent = i18nDesc(d, id);
    if (badges) badges.innerHTML = `<span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg border bg-amber-500/10 border-amber-500/20 text-amber-800 font-bold">${fmt(d.price)}</span>`;
    [name, desc].forEach(el => {
      if (!el) return;
      el.classList.remove('slide-out');
      el.classList.add('slide-in');
    });
    setTimeout(() => {
      [name, desc].forEach(el => el && el.classList.remove('slide-in'));
    }, 420);
  }, 60);
  await slideHeroImage(HERO_IMG_SRC(id), i18nName(d), dir);
  isHeroAnimating = false;
}

function startHero() {
  initHeroImages();
  applyHero(MENU.heroIds[heroIdx], 1);
  restartHeroTimer();
}

function restartHeroTimer() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    if (isHeroAnimating) return;
    heroIdx = (heroIdx + 1) % MENU.heroIds.length;
    applyHero(MENU.heroIds[heroIdx], 1);
  }, 5000);
}

function nextHero() {
  if (isHeroAnimating) return;
  heroIdx = (heroIdx + 1) % MENU.heroIds.length;
  applyHero(MENU.heroIds[heroIdx], 1);
  restartHeroTimer();
}

function prevHero() {
  if (isHeroAnimating) return;
  heroIdx = (heroIdx - 1 + MENU.heroIds.length) % MENU.heroIds.length;
  applyHero(MENU.heroIds[heroIdx], -1);
  restartHeroTimer();
}

function enableHeroManual() {
  const area = $('#hero-slider');
  if (!area) return;
  area.querySelector('.hero-arrow.left')?.addEventListener('click', prevHero, { passive: true });
  area.querySelector('.hero-arrow.right')?.addEventListener('click', nextHero, { passive: true });
  let sx = null, sy = null, active = false;
  const TH = 40;
  area.addEventListener('touchstart', e => {
    const t = e.changedTouches[0];
    sx = t.clientX;
    sy = t.clientY;
    active = true;
  }, { passive: true });
  area.addEventListener('touchmove', e => {
    if (!active) return;
    const t = e.changedTouches[0];
    const dx = t.client极速快3
    X - sx;
    const dy = t.clientY - sy;
    if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > TH) {
      active = false;
      if (dx < 0) nextHero();
      else prevHero();
    }
  }, { passive: true });
  area.addEventListener('touchend', () => {
    active = false;
  }, { passive: true });
  let px = null, py = null, down = false;
  area.addEventListener('pointerdown', e => {
    px = e.clientX;
    py = e.clientY;
    down = true;
  });
  area.addEventListener('pointerup', e => {
    if (!down) return;
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > TH) {
      if (dx < 0) nextHero();
      else prevHero();
    }
    down = false;
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevHero();
    else if (e.key === 'ArrowRight') nextHero();
  });
}

// КАТЕГОРИИ И ПОИСК
function renderCategoryChips() {
  const box = $('#cat-chips');
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
    b.textContent = MENU.catNames[lang][id];
    b.dataset.cat = id;
    b.onclick = () => goToCategoryId(id);
    box.appendChild(b);
  });
  
  // Добавляем категорию "Напитки"
  const drinksBtn = document.createElement('button');
  drinksBtn.className = 'px-4 py-2 rounded-full border text-sm font-semibold whitespace-nowrap transition chip';
  drinksBtn.style.borderColor = '#EAE0D5';
  drinksBtn.textContent = STR[lang].drinks;
  drinksBtn.dataset.cat = 'drinks';
  drinksBtn.onclick = showDrinksSubcategories;
  box.appendChild(drinksBtn);
  
  setActiveChip(activeCatId());
}

function setActiveChip(id) {
  $$('#cat-chips .chip').forEach(c => {
    const isActive = c.dataset.cat === id || (id.startsWith('drinks_') && c.dataset.cat === 'drinks');
    c.classList.toggle('active', isActive);
    c.style.borderWidth = isActive ? '2px' : '1px';
    c.style.borderColor = isActive ? 'var(--brand-blue)' : '#EAE0D5';
  });
}

const activeCatId = () => Object.keys(MENU.categories)[activeCatIdx] || Object.keys(MENU.categories)[0];

// Рендер активной категории
function renderActiveCategory() {
  const root = $('#menu-root');
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
    `${STR[lang].drinks} - ${MENU.catNames[lang][catId]}` : 
    MENU.catNames[lang][catId];
  
  sec.innerHTML = `<h2 class="section-title text-3xl font-bold mb-8">${categoryTitle}</h2>`;
  
  const grid = document.createElement('div');
  grid.className = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-8';
  
  if (list.length === 0) {
    grid.innerHTML = `<div class='text-gray-500'>${lang === 'ru' ? 'Ничего не найдено в этой категории.' : lang === 'en' ? 'Nothing found in this category.' : 'Bu kategoriyada hech narsa topilmadi.'}</div>`;
  } else {
    list.forEach(it => grid.appendChild(buildCard(it)));
  }
  
  sec.appendChild(grid);
  root.appendChild(sec);
  setActiveChip(catId);
}

function matchesQuery(item) {
  const text = (i18nName(item) + ' ' + (item?.i18n?.desc?.[lang] || '')).toLowerCase();
  const okQuery = !query || text.includes(query.toLowerCase());
  const okVeg = !vegOnly || item.veg;
  return okQuery && okVeg;
}

function buildCard(item) {
  const el = document.createElement('div');
  el.className = 'card p-4 flex flex-col cursor-pointer';
  el.dataset.id = item.id;
  const vegBadge = item.veg ? `<div class="w-7 h-7 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center" title="${STR[lang].vegetarian}"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" class=\"text-green-600\"><path d=\"M7 14c-3 极速快3
  0-4-1-4-4 0-3 2-6 5-7 3 1 5 4 5 7s-1 4-4 4-极速快3
  2-1-2-1zM4 15c2 2 6 2 8 0\"/></svg></div>` : '';
  const name = i18nName(item);
  const desc = item?.i18n?.desc?.[lang] || '';
  el.innerHTML = `<div class="flex-grow">
      <div class="flex justify-between items-start">
        <h4 class="font-heading font-bold text-lg pr-2">${name}</h4>
        ${vegBadge}
      </div>
      <p class="text-sm mt-1 text-gray-600">${desc}</p>
    </div>
    <div class="flex items-center justify-between mt-4">
      <div class="text-lg font-bold" style="color:var(--brand-dark-text)">${fmt(item.price)}</div>
    </div>`;
  el.addEventListener('click', () => openDishModal(item.id));
  return el;
}

// МОДАЛ ПОДКАТЕГОРИЙ НАПИТКОВ
function showDrinksSubcategories() {
  if (drinksModalOpen) return;
  drinksModalOpen = true;
  
  const modal = document.createElement('div');
  modal.id = 'drinks-modal';
  modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl p-6 w-[min(520px,calc(100%-32px))]">
      <div class="font-heading text-2xl font-extrabold text-center mb-4">${STR[lang].drinks}</div>
      <div class="grid grid-cols-2 gap-3">
        <button class="drinks-subcat-btn" data-subcat="drinks_coffee">${STR[lang].drinks_coffee}</button>
        <button class="drinks-subcat-btn" data-subcat="drinks_tea">${STR[lang].drinks_tea}</button>
        <button class="drinks-subcat-btn" data-subcat="drinks_cold">${STR[lang].drinks_cold}</button>
        <button class="drinks-subcat-btn" data-subcat="drinks_juices">${STR[lang].drinks_juices}</button>
        <button class="drinks-subcat-btn" data-subcat="drinks_hot_chocolate">${STR[lang].drinks_hot_chocolate}</button>
      </div>
      <button id="close-drinks-modal" class="mt-6 w-full py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">${lang === 'ru' ? 'Закрыть' : lang === 'en' ? 'Close' : 'Yopish'}</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Добавляем обработчики событий
  modal.querySelectorAll('.drinks-subcat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const subcat = btn.dataset.subcat;
      goToCategoryId(subcat);
      closeDrinksModal();
    });
  });
  
  modal.querySelector('#close-drinks-modal').addEventListener('click', closeDrinksModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDrinksModal();
  });
}

function closeDrinksModal() {
  const modal = $('#drinks-modal');
  if (modal) {
    modal.remove();
  }
  drinksModalOpen = false;
}

// МОДАЛ БЛЮДА
function openDishModal(id) {
  const d = MENU.items[id];
  if (!d) return;
  const m = $('#dish-modal');
  if (!m) return;
  $('#dish-modal-image').src = d.image || HERO_IMG_SRC(id);
  $('#dish-modal-title').textContent = i18nName(d);
  $('#dish-modal-desc').textContent = i18nDesc(d, id);
  $('#dish-modal-price').textContent = fmt(d.price);
  m.classList.remove('hidden');
  m.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeDishModal() {
  const m = $('#dish-modal');
  if (!m) return;
  m.classList.add('hidden');
  m.classList.remove('flex');
  document.body.style.overflow = '';
}

// ЯЗЫКИ
function bindLangButtons() {
  $$('#change-language,[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const l = btn.getAttribute('data-lang');
      if (!l) {
        showLangGate();
        return;
      }
      lang = l;
      localStorage.setItem('boboy_lang', l);
      init();
      hideLangGate();
    });
  });
}

function showLangGate() {
  const g = $('#lang-gate');
  if (g) {
    g.classList.remove('hidden');
    g.classList.add('flex');
  }
}

function hideLangGate() {
  const g = $('#lang-gate');
  if (g) {
    g.classList.add('hidden');
    g.classList.remove('flex');
  }
}

// СКРОЛЛ-ДЕКОР (плавный, без лагов)
function setupDecor() {
  const donkey = $('#donkey-art');
  const footer = $('footer');
  const left = $('#left-art');
  const menu = $('#menu-root');
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
        raf = 0;
        const menuRect = menu.getBoundingClientRect();
        left.style.position = 'fixed';
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

// ПРОЧЕЕ
function enableCategorySwipe() {
  let x0 = null, y0 = null, locked = false;
  const TH = 50;
  document.body.addEventListener('touchstart', e => {
    const t = e.changedTouches[0];
    x0 = t.clientX;
    y0 = t.clientY;
    locked = false;
  }, { passive: true });
  document.body.addEventListener('touchmove', e => {
    if (x0 === null || locked) return;
    const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
    if (Math.abs(dx) > Math.abs(dy) * 1.6 && Math.abs(dx) > TH) {
      locked = true;
      goToSiblingCategory(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
  document.body.addEventListener('touchend', () => {
    x0 = y0 = null;
    locked = false;
  }, { passive: true });
}

function goToCategoryId(id) {
  const ids = Object.keys(MENU.categories);
  const idx = ids.indexOf(id);
  if (idx === -1) return;
  activeCatIdx = idx;
  sessionStorage.setItem('active_cat_idx', String(activeCatIdx));
  renderActiveCategory();
}

function goToSiblingCategory(dir) {
  const ids = Object.keys(MENU.categories);
  activeCatIdx = Math.min(ids.length - 1, Math.max(0, activeCatIdx + dir));
  sessionStorage.setItem极速快3
  ('active_cat_idx', String(activeCatIdx));
  renderActiveCategory();
}

function showSwipeHintOnce() {
  if (sessionStorage.getItem('swipe_hint_shown')) return;
  sessionStorage.setItem('swipe_hint_shown', '1');
  const h = document.createElement('div');
  h.className = 'swipe-hint';
  h.textContent = lang === 'ru' ? 'Свайпайте по экрану — следующий раздел' : 
                  lang === 'en' ? 'Swipe across the screen - next section' : 
                  'Ekranda siljitish - keyingi boʻlim';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 2600);
}

// ИНИЦ
function preloadHeroImages() {
  const list = MENU.heroIds.map(id => HERO_IMG_SRC(id)).filter(Boolean);
  const load = src => {
    const img = new Image();
    img.loading = 'eager';
    img.decoding = 'async';
    img.src = src;
    img.decode?.().catch(() => { });
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => list.forEach(load));
  } else {
    setTimeout(() => list.forEach(load), 0);
  }
}

function init() {
  renderTopCopy();
  preloadHeroImages();
  startHero();
  enableHeroManual();
  renderActiveCategory();
  if (!localStorage.getItem('boboy_lang')) showLangGate();
  setupDecor();
  bindLangButtons();

  // Слушатели
  const searchEl = $('#search');
  let debTimer = 0;
  searchEl?.addEventListener('input', e => {
    clearTimeout(debTimer);
    debTimer = setTimeout(() => {
      query = e.target.value;
      renderActiveCategory();
    }, 140);
  });
  const vegBtn = $('#vegOnlyBtn');
  if (vegBtn) {
    vegBtn.classList.toggle('bg-green-100', vegOnly);
    vegBtn.classList.toggle('border-green-300', vegOnly);
  }
  vegBtn?.addEventListener('click', () => {
    vegOnly = !vegOnly;
    localStorage.setItem('boboy_veg_only', vegOnly ? '1' : '0');
    $('#vegOnlyBtn').classList.toggle('bg-green-100', vegOnly);
    $('#vegOnlyBtn').classList.toggle('border-green-300', vegOnly);
    renderActiveCategory();
  });

  // Модал блюд
  $('#dish-modal')?.addEventListener('click', e => {
    if (e.target.id === 'dish-modal') closeDishModal();
  });
  $('#dish-modal-close')?.addEventListener('click', closeDishModal);
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDishModal();
  });

  if (window.matchMedia('(max-width: 767px)').matches) {
    enableCategorySwipe();
    showSwipeHintOnce();
  }
}

document.addEventListener('DOMContentLoaded', init);