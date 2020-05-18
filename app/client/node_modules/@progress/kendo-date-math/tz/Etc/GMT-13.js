const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT-13": [
      [
        -780,
        "-",
        "+13",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT-13": {
      "long": "Tonga Standard Time",
      "group": "(GMT+13:00) Nuku'alofa"
    }
  }
});