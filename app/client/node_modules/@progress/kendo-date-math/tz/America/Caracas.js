const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Caracas": [
      [
        267.7333333333333,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        267.6666666666667,
        "-",
        "CMT",
        -1826755200000
      ],
      [
        270,
        "-",
        "-0430",
        -157766400000
      ],
      [
        240,
        "-",
        "-04",
        1197169200000
      ],
      [
        270,
        "-",
        "-0430",
        1462069800000
      ],
      [
        240,
        "-",
        "-04",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "America/Caracas": {
      "long": "Venezuela Standard Time",
      "group": "(GMT-04:30) Caracas"
    }
  }
});