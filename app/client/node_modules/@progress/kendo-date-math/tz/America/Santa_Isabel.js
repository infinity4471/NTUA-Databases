const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Santa_Isabel": "America/Tijuana"
  },
  "rules": {},
  "titles": {
    "America/Santa_Isabel": {
      "long": "Pacific Standard Time (Mexico)",
      "group": "(GMT-08:00) Tijuana, Baja California"
    }
  }
});