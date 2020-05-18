const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Rarotonga": [
      [
        639.0666666666666,
        "-",
        "LMT",
        -2146003200000
      ],
      [
        630,
        "-",
        "-1030",
        279676800000
      ],
      [
        600,
        "Cook",
        "-10/-0930",
        null
      ]
    ]
  },
  "rules": {
    "Cook": [
      [
        1978,
        "only",
        "-",
        "Nov",
        "12",
        [
          0,
          0,
          0,
          null
        ],
        30,
        "-"
      ],
      [
        1979,
        1991,
        "-",
        "Mar",
        "Sun>=1",
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
        1979,
        1990,
        "-",
        "Oct",
        "lastSun",
        [
          0,
          0,
          0,
          null
        ],
        30,
        "-"
      ]
    ]
  },
  "titles": {
    "Pacific/Rarotonga": {
      "long": "Hawaiian Standard Time",
      "group": "(GMT-10:00) Hawaii"
    }
  }
});