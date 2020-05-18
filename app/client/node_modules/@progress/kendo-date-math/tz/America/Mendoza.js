const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Mendoza": "America/Argentina/Mendoza"
  },
  "rules": {},
  "titles": {
    "America/Mendoza": {
      "long": "Argentina Standard Time",
      "group": "(GMT-03:00) Buenos Aires"
    }
  }
});