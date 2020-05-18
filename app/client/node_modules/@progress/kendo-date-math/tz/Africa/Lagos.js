const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Lagos": [
      [
        -13.6,
        "-",
        "LMT",
        -1588464000000
      ],
      [
        -60,
        "-",
        "WAT",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Africa/Lagos": {
      "long": "W. Central Africa Standard Time",
      "group": "(GMT+01:00) West Central Africa"
    }
  }
});