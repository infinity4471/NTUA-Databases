const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT+1": [
      [
        60,
        "-",
        "-01",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT+1": {
      "long": "Dateline Standard Time",
      "group": "(GMT-12:00) International Date Line West"
    }
  }
});