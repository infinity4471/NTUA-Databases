const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "MST": [
      [
        420,
        "-",
        "MST",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "MST": {
      "long": "Mountain Standard Time",
      "group": "(GMT-07:00) Mountain Time (US & Canada)"
    }
  }
});