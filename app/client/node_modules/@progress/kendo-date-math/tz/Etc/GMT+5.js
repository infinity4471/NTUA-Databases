const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT+5": [
      [
        300,
        "-",
        "-05",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT+5": {
      "long": "SA Pacific Standard Time",
      "group": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
    }
  }
});