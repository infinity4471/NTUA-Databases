const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT-2": [
      [
        -120,
        "-",
        "+02",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT-2": {
      "long": "South Africa Standard Time",
      "group": "(GMT+02:00) Harare, Pretoria"
    }
  }
});