const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT-3": [
      [
        -180,
        "-",
        "+03",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT-3": {
      "long": "E. Africa Standard Time",
      "group": "(GMT+03:00) Nairobi"
    }
  }
});