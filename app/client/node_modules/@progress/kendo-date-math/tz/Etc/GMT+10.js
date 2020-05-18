const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT+10": [
      [
        600,
        "-",
        "-10",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT+10": {
      "long": "Hawaiian Standard Time",
      "group": "(GMT-10:00) Hawaii"
    }
  }
});