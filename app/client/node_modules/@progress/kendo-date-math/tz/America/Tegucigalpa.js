const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Tegucigalpa": [
      [
        348.8666666666667,
        "-",
        "LMT",
        -1538524800000
      ],
      [
        360,
        "Hond",
        "C%sT",
        null
      ]
    ]
  },
  "rules": {
    "Hond": [
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
      ],
      [
        2006,
        "only",
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
        2006,
        "only",
        "-",
        "Aug",
        "Mon>=1",
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
    "America/Tegucigalpa": {
      "long": "Central America Standard Time",
      "group": "(GMT-06:00) Central America"
    }
  }
});