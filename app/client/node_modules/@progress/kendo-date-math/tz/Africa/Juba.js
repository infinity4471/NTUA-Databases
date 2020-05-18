const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Juba": [
      [
        -126.46666666666667,
        "-",
        "LMT",
        -1199318400000
      ],
      [
        -120,
        "Sudan",
        "CA%sT",
        947937600000
      ],
      [
        -180,
        "-",
        "EAT",
        null
      ]
    ]
  },
  "rules": {
    "Sudan": [
      [
        1970,
        "only",
        "-",
        "May",
        "1",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1970,
        1985,
        "-",
        "Oct",
        "15",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1971,
        "only",
        "-",
        "Apr",
        "30",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1972,
        1985,
        "-",
        "Apr",
        "lastSun",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "S"
      ]
    ]
  },
  "titles": {
    "Africa/Juba": {
      "long": "E. Africa Standard Time",
      "group": "(GMT+03:00) Nairobi"
    }
  }
});