const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Guayaquil": [
      [
        319.3333333333333,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        314,
        "-",
        "QMT",
        -1199318400000
      ],
      [
        300,
        "Ecuador",
        "-05/-04",
        null
      ]
    ]
  },
  "rules": {
    "Ecuador": [
      [
        1992,
        "only",
        "-",
        "Nov",
        "28",
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
        1993,
        "only",
        "-",
        "Feb",
        "5",
        [
          0,
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
    "America/Guayaquil": {
      "long": "SA Pacific Standard Time",
      "group": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
    }
  }
});