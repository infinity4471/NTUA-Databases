const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT+7": [
      [
        420,
        "-",
        "-07",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT+7": {
      "long": "US Mountain Standard Time",
      "group": "(GMT-07:00) Arizona"
    }
  }
});