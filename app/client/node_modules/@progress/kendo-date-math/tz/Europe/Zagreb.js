const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Zagreb": "Europe/Belgrade"
  },
  "rules": {},
  "titles": {
    "Europe/Zagreb": {
      "long": "Central European Standard Time",
      "group": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
    }
  }
});