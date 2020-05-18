const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Cayenne": [
      [
        209.33333333333334,
        "-",
        "LMT",
        -1846281600000
      ],
      [
        240,
        "-",
        "-04",
        -71107200000
      ],
      [
        180,
        "-",
        "-03",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "America/Cayenne": {
      "long": "SA Eastern Standard Time",
      "group": "(GMT-03:00) Georgetown"
    }
  }
});