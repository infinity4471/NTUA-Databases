const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Johnston": "Pacific/Honolulu"
  },
  "rules": {},
  "titles": {
    "Pacific/Johnston": {
      "long": "Hawaiian Standard Time",
      "group": "(GMT-10:00) Hawaii"
    }
  }
});