const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Sarajevo": "Europe/Belgrade"
  },
  "rules": {},
  "titles": {
    "Europe/Sarajevo": {
      "long": "Central European Standard Time",
      "group": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
    }
  }
});