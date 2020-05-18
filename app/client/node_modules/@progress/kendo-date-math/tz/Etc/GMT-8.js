const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT-8": [
      [
        -480,
        "-",
        "+08",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT-8": {
      "long": "Singapore Standard Time",
      "group": "(GMT+08:00) Kuala Lumpur, Singapore"
    }
  }
});