const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Cordoba": "America/Argentina/Cordoba"
  },
  "rules": {},
  "titles": {
    "America/Cordoba": {
      "long": "Argentina Standard Time",
      "group": "(GMT-03:00) Buenos Aires"
    }
  }
});