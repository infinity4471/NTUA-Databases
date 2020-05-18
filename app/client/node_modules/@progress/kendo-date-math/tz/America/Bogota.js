const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Bogota": [
      [
        296.2666666666667,
        "-",
        "LMT",
        -2707689600000
      ],
      [
        296.2666666666667,
        "-",
        "BMT",
        -1739059200000
      ],
      [
        300,
        "CO",
        "-05/-04",
        null
      ]
    ]
  },
  "rules": {
    "CO": [
      [
        1992,
        "only",
        "-",
        "May",
        "3",
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
        "Apr",
        "4",
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
    "America/Bogota": {
      "long": "SA Pacific Standard Time",
      "group": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
    }
  }
});