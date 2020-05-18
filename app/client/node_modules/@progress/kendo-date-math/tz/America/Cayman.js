const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Cayman": "America/Panama"
  },
  "rules": {},
  "titles": {
    "America/Cayman": {
      "long": "SA Pacific Standard Time",
      "group": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
    }
  }
});