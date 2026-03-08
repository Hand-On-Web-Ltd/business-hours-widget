// Business Hours Widget
// https://github.com/Hand-On-Web-Ltd/business-hours-widget

(function() {
  'use strict';

  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function isOpenNow(hours, timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      weekday: 'long'
    });

    const parts = formatter.formatToParts(now);
    const dayName = parts.find(p => p.type === 'weekday').value.toLowerCase();
    const hour = parseInt(parts.find(p => p.type === 'hour').value);
    const minute = parseInt(parts.find(p => p.type === 'minute').value);
    const currentMinutes = hour * 60 + minute;

    const todayHours = hours[dayName];
    if (!todayHours) return { open: false, day: dayName };

    const [openH, openM] = todayHours.open.split(':').map(Number);
    const [closeH, closeM] = todayHours.close.split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    return {
      open: currentMinutes >= openMinutes && currentMinutes < closeMinutes,
      day: dayName
    };
  }

  function formatTime(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const suffix = h >= 12 ? 'pm' : 'am';
    const hour12 = h % 12 || 12;
    return m === 0 ? `${hour12}${suffix}` : `${hour12}:${m.toString().padStart(2,'0')}${suffix}`;
  }

  function render(container, config) {
    const { open, day } = isOpenNow(config.hours, config.timezone);
    const today = new Date().getDay();

    let html = '<div class="bh-widget">';
    html += '<div class="bh-header">';
    html += '<span class="bh-title">Opening Hours</span>';
    html += `<span class="bh-badge ${open ? 'bh-open' : 'bh-closed'}">${open ? 'Open Now' : 'Closed'}</span>`;
    html += '</div>';
    html += '<ul class="bh-list">';

    for (let i = 0; i < 7; i++) {
      const dayKey = DAYS[i];
      const dayLabel = DAY_LABELS[i];
      const dayHours = config.hours[dayKey];
      const isToday = i === today;

      html += `<li class="bh-day ${isToday ? 'bh-today' : ''}">`;
      html += `<span class="bh-day-name">${dayLabel}</span>`;
      if (dayHours) {
        html += `<span class="bh-day-hours">${formatTime(dayHours.open)} – ${formatTime(dayHours.close)}</span>`;
      } else {
        html += '<span class="bh-day-hours bh-day-closed">Closed</span>';
      }
      html += '</li>';
    }

    html += '</ul></div>';
    container.innerHTML = html;
  }

  window.BusinessHours = {
    init: function(selector, config) {
      const el = document.querySelector(selector);
      if (!el) { console.error('BusinessHours: element not found:', selector); return; }
      config.timezone = config.timezone || 'Europe/London';
      render(el, config);
      // Update every minute
      setInterval(() => render(el, config), 60000);
    }
  };
})();
