const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT-1": [
      [
        -60,
        "-",
        "+01",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT-1": {
      "long": "W. Central Africa Standard Time",
      "group": "(GMT+01:00) West Central Africa"
    }
  }
});