const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Kampala": "Africa/Nairobi"
  },
  "rules": {},
  "titles": {
    "Africa/Kampala": {
      "long": "E. Africa Standard Time",
      "group": "(GMT+03:00) Nairobi"
    }
  }
});