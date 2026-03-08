# Business Hours Widget

A simple, embeddable widget that shows your business opening hours with a live "Open Now" or "Closed" indicator.

Drop it into any website with a single script tag. No dependencies, no build step.

![Widget Preview](https://img.shields.io/badge/status-open%20now-brightgreen)

## Quick Start

Add this to your HTML:

```html
<div id="business-hours"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Hand-On-Web-Ltd/business-hours-widget/style.css">
<script src="https://cdn.jsdelivr.net/gh/Hand-On-Web-Ltd/business-hours-widget/widget.js"></script>
<script>
  BusinessHours.init('#business-hours', {
    timezone: 'Europe/London',
    hours: {
      monday:    { open: '09:00', close: '17:30' },
      tuesday:   { open: '09:00', close: '17:30' },
      wednesday: { open: '09:00', close: '17:30' },
      thursday:  { open: '09:00', close: '17:30' },
      friday:    { open: '09:00', close: '17:00' },
      saturday:  { open: '10:00', close: '14:00' },
      sunday:    null // closed
    }
  });
</script>
```

## Features

- Shows today's hours with "Open Now" / "Closed" badge
- Full week schedule at a glance
- Highlights the current day
- Fully customisable via CSS
- Zero dependencies
- Works on any website

## Customisation

Change the colours by overriding the CSS variables:

```css
.bh-widget {
  --bh-open-color: #22c55e;
  --bh-closed-color: #ef4444;
  --bh-highlight-bg: #f0f9ff;
  --bh-font-family: system-ui, sans-serif;
}
```

## Self-Hosting

Just grab `widget.js` and `style.css` and host them yourself. That's it.

## Demo

Open `index.html` in your browser to see it in action.

## About Hand On Web
We build AI chatbots, voice agents, and automation tools for businesses.
- 🌐 [handonweb.com](https://www.handonweb.com)
- 📧 outreach@handonweb.com
- 📍 Chester, UK

## Licence
MIT
