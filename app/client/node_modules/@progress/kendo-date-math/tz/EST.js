const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "EST": [
      [
        300,
        "-",
        "EST",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "EST": {
      "long": "Eastern Standard Time",
      "group": "(GMT-05:00) Eastern Time (US & Canada)"
    }
  }
});