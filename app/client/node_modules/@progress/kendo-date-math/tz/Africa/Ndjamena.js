const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Ndjamena": [
      [
        -60.2,
        "-",
        "LMT",
        -1798848000000
      ],
      [
        -60,
        "-",
        "WAT",
        308707200000
      ],
      [
        -60,
        "1:00",
        "WAST",
        321321600000
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
    "Africa/Ndjamena": {
      "long": "W. Central Africa Standard Time",
      "group": "(GMT+01:00) West Central Africa"
    }
  }
});