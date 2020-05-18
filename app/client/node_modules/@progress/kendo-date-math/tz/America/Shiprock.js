const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Shiprock": "America/Denver"
  },
  "rules": {},
  "titles": {
    "America/Shiprock": {
      "long": "Mountain Standard Time",
      "group": "(GMT-07:00) Mountain Time (US & Canada)"
    }
  }
});