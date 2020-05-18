const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Skopje": "Europe/Belgrade"
  },
  "rules": {},
  "titles": {
    "Europe/Skopje": {
      "long": "Central European Standard Time",
      "group": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
    }
  }
});