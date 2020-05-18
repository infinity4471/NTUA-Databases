const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/El_Salvador": [
      [
        356.8,
        "-",
        "LMT",
        -1514851200000
      ],
      [
        360,
        "Salv",
        "C%sT",
        null
      ]
    ]
  },
  "rules": {
    "Salv": [
      [
        1987,
        1988,
        "-",
        "May",
        "Sun>=1",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1987,
        1988,
        "-",
        "Sep",
        "lastSun",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "S"
      ]
    ]
  },
  "titles": {
    "America/El_Salvador": {
      "long": "Central America Standard Time",
      "group": "(GMT-06:00) Central America"
    }
  }
});