const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT+12": [
      [
        720,
        "-",
        "-12",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT+12": {
      "long": "Dateline Standard Time",
      "group": "(GMT-12:00) International Date Line West"
    }
  }
});