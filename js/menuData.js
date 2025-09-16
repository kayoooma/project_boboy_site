// === МОДУЛЬ РАБОТЫ С ДАННЫМИ МЕНЮ ===
const MenuData = (() => {
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

  return {
    loadMenuData
  };
})();