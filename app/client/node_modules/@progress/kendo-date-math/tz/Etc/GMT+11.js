const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Etc/GMT+11": [
      [
        660,
        "-",
        "-11",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Etc/GMT+11": {
      "long": "UTC-11",
      "group": null
    }
  }
});