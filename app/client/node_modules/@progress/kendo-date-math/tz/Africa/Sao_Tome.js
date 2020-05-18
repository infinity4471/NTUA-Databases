const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Sao_Tome": [
      [
        -26.933333333333334,
        "-",
        "LMT",
        -2682374400000
      ],
      [
        36.75,
        "-",
        "LMT",
        -1830384000000
      ],
      [
        0,
        "-",
        "GMT",
        1514768400000
      ],
      [
        -60,
        "-",
        "WAT",
        1546308000000
      ],
      [
        0,
        "-",
        "GMT",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Africa/Sao_Tome": {
      "long": "Greenwich Standard Time",
      "group": "(GMT) Monrovia, Reykjavik"
    }
  }
});