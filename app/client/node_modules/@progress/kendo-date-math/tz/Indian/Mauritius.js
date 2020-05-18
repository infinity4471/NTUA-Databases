const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Indian/Mauritius": [
      [
        -230,
        "-",
        "LMT",
        -1956700800000
      ],
      [
        -240,
        "Mauritius",
        "+04/+05",
        null
      ]
    ]
  },
  "rules": {
    "Mauritius": [
      [
        1982,
        "only",
        "-",
        "Oct",
        "10",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1983,
        "only",
        "-",
        "Mar",
        "21",
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
        2008,
        "only",
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        2009,
        "only",
        "-",
        "Mar",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Indian/Mauritius": {
      "long": "Mauritius Standard Time",
      "group": "(GMT+04:00) Port Louis"
    }
  }
});