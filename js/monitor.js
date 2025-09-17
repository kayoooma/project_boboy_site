// monitor.js - исправленная версия
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 0,
      memory: null,
      longTasks: [],
      layoutShifts: [],
      interactions: []
    };
    
    this.logs = [];
    this.isMonitoring = false;
    this.startTime = Date.now();
    
    // Пороги для определения лагов
    this.thresholds = {
      fps: 30,
      longTask: 50, // снизим порог для более точного обнаружения
      memory: 70
    };
  }

  // Запуск мониторинга
  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    console.log('[PerformanceMonitor] Запуск мониторинга производительности');
    
    // Мониторинг FPS
    this._startFPSMonitoring();
    
    // Мониторинг долгих задач
    this._startLongTaskMonitoring();
    
    // Мониторинг изменений layout
    this._startLayoutShiftMonitoring();
    
    // Отслеживание взаимодействий
    this._startInteractionMonitoring();
    
    // Отслеживание ошибок
    this._startErrorTracking();
    
    // Периодическая отчетность
    this._startPeriodicReporting();
  }

  // Остановка мониторинга
  stop() {
    this.isMonitoring = false;
    if (this._fpsInterval) clearInterval(this._fpsInterval);
    if (this._reportInterval) clearInterval(this._reportInterval);
    console.log('[PerformanceMonitor] Мониторинг остановлен');
  }

  // Мониторинг FPS
  _startFPSMonitoring() {
    let lastTime = performance.now();
    let frames = 0;
    
    this._fpsInterval = setInterval(() => {
      const now = performance.now();
      frames++;
      
      if (now >= lastTime + 1000) {
        this.metrics.fps = Math.round((frames * 1000) / (now - lastTime));
        lastTime = now;
        frames = 0;
        
        if (this.metrics.fps < this.thresholds.fps) {
          this._logLag('low_fps', `Низкий FPS: ${this.metrics.fps}`, {
            fps: this.metrics.fps,
            duration: Math.round(now - this.startTime)
          });
        }
      }
    }, 100);
  }

  // Мониторинг долгих задач
  _startLongTaskMonitoring() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > this.thresholds.longTask) {
              this.metrics.longTasks.push(entry);
              
              this._logLag('long_task', `Долгая задача: ${Math.round(entry.duration)}ms`, {
                duration: Math.round(entry.duration),
                name: entry.name,
                startTime: Math.round(entry.startTime),
                durationFromStart: Math.round(entry.startTime - this.startTime)
              });
            }
          }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('[PerformanceMonitor] LongTask monitoring not supported', e);
      }
    }
  }

  // Мониторинг изменений layout
  _startLayoutShiftMonitoring() {
    if ('PerformanceObserver' in window) {
      try {
        let cls = 0;
        
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
              this.metrics.layoutShifts.push(entry);
              
              if (entry.value > 0.1) {
                this._logLag('layout_shift', `Сдвиг layout: ${entry.value.toFixed(3)}`, {
                  value: entry.value,
                  sources: entry.sources || []
                });
              }
            }
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('[PerformanceMonitor] Layout Shift monitoring not supported', e);
      }
    }
  }

  // Мониторинг взаимодействий
  _startInteractionMonitoring() {
    // Отслеживание кликов
    document.addEventListener('click', (e) => {
      const now = performance.now();
      const target = e.target;
      
      this.metrics.interactions.push({
        type: 'click',
        target: this._getElementSelector(target),
        timestamp: now,
        position: { x: e.clientX, y: e.clientY }
      });
    }, true);
  }

  // Отслеживание ошибок
  _startErrorTracking() {
    // Глобальные ошибки
    window.addEventListener('error', (e) => {
      this._logError('global_error', e.error || e.message, {
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
      });
    });
    
    // Promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      this._logError('promise_rejection', e.reason, {
        reason: e.reason
      });
    });
  }

  // Периодическая отчетность
  _startPeriodicReporting() {
    this._reportInterval = setInterval(() => {
      if (this.logs.length > 0) {
        console.groupCollapsed(`[PerformanceMonitor] Отчет (${new Date().toLocaleTimeString()})`);
        
        // Группируем логи по типу
        const groupedLogs = {};
        this.logs.forEach(log => {
          if (!groupedLogs[log.type]) groupedLogs[log.type] = [];
          groupedLogs[log.type].push(log);
        });
        
        // Выводим логи по группам
        for (const type in groupedLogs) {
          console.groupCollapsed(`${type} (${groupedLogs[type].length})`);
          groupedLogs[type].forEach(log => {
            console.log(`[${new Date(log.timestamp).toLocaleTimeString()}] ${log.message}`, log.data || '');
          });
          console.groupEnd();
        }
        
        console.groupEnd();
        
        // Очищаем логи после отчетности (оставляем только последние 20)
        this.logs = this.logs.slice(-20);
      }
    }, 10000);
  }

  // Логирование лагов
  _logLag(type, message, data = {}) {
    const logEntry = {
      type,
      message,
      data,
      timestamp: Date.now(),
      location: window.location.href,
      userAgent: navigator.userAgent
    };
    
    this.logs.push(logEntry);
    console.warn(`[Lag] ${message}`, data);
  }

  // Логирование ошибок
  _logError(type, message, data = {}) {
    const logEntry = {
      type,
      message: message instanceof Error ? message.message : String(message),
      data: {
        ...data,
        stack: message instanceof Error ? message.stack : undefined
      },
      timestamp: Date.now(),
      location: window.location.href
    };
    
    this.logs.push(logEntry);
    console.error(`[Error] ${message}`, data);
  }

  // Получение селектора элемента
  _getElementSelector(element) {
    if (!element || !element.tagName) return 'unknown';
    
    let selector = element.tagName.toLowerCase();
    
    if (element.id) {
      selector += `#${element.id}`;
    } else if (element.className && typeof element.className === 'string') {
      selector += `.${element.className.split(' ')[0]}`; // только первый класс
    }
    
    return selector;
  }

  // Получение статистики
  getStats() {
    return {
      metrics: this.metrics,
      logs: this.logs,
      thresholds: this.thresholds
    };
  }

  // Очистка логов
  clearLogs() {
    this.logs = [];
  }
}

// Создаем глобальный экземпляр монитора
window.PerformanceMonitor = new PerformanceMonitor();

// Автоматический запуск мониторинга
if (typeof window !== 'undefined') {
  // Ждем полной загрузки страницы
  if (document.readyState === 'complete') {
    setTimeout(() => window.PerformanceMonitor.start(), 1000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => window.PerformanceMonitor.start(), 1000);
    });
  }
  
  // Добавляем кнопку для просмотра статистики
  setTimeout(() => {
    const statsBtn = document.createElement('button');
    statsBtn.innerHTML = '📊 Perf';
    statsBtn.style.position = 'fixed';
    statsBtn.style.bottom = '20px';
    statsBtn.style.right = '20px';
    statsBtn.style.zIndex = '10000';
    statsBtn.style.background = '#f0f0f0';
    statsBtn.style.border = '1px solid #ccc';
    statsBtn.style.borderRadius = '4px';
    statsBtn.style.padding = '8px 12px';
    statsBtn.style.cursor = 'pointer';
    statsBtn.style.fontSize = '16px';
    
    statsBtn.addEventListener('click', () => {
      console.log('[PerformanceMonitor] Статистика:', window.PerformanceMonitor.getStats());
    });
    
    document.body.appendChild(statsBtn);
  }, 2000);
}