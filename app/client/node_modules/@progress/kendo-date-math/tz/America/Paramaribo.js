const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Paramaribo": [
      [
        220.66666666666666,
        "-",
        "LMT",
        -1830470400000
      ],
      [
        220.86666666666665,
        "-",
        "PMT",
        -1073088000000
      ],
      [
        220.6,
        "-",
        "PMT",
        -765331200000
      ],
      [
        210,
        "-",
        "-0330",
        465436800000
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
    "America/Paramaribo": {
      "long": "SA Eastern Standard Time",
      "group": "(GMT-03:00) Georgetown"
    }
  }
});