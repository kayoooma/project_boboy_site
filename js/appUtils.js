// === МОДУЛЬ УТИЛИТ ===
const AppUtils = (() => {
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const fmt = n => new Intl.NumberFormat('ru-RU').format(n) + ' UZS';
  
  const locName = o => o?.[AppState.lang] || o?.ru || '';
  const i18nName = item => item?.i18n?.name?.[AppState.lang] || item?.i18n?.name?.ru || '';
  const i18nDesc = (item, idFallback) => 
    item?.i18n?.desc?.[AppState.lang] || HERO_DESC_BY_ID[AppState.lang]?.[idFallback] || STR[AppState.lang].dishOfDayDesc;
  
  // Дебаунс функция для оптимизации поиска
  const debounce = (func, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  
  return {
    $, $$, fmt, locName, i18nName, i18nDesc, debounce
  };
})();