const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT+4": [
      [
        240,
        "-",
        "-04",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT+4": {
      "long": "SA Western Standard Time",
      "group": "(GMT-04:00) La Paz"
    }
  }
});