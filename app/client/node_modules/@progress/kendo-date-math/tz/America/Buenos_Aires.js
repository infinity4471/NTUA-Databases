const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Buenos_Aires": "America/Argentina/Buenos_Aires"
  },
  "rules": {},
  "titles": {
    "America/Buenos_Aires": {
      "long": "Argentina Standard Time",
      "group": "(GMT-03:00) Buenos Aires"
    }
  }
});