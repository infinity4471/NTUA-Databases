const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Galapagos": [
      [
        358.4,
        "-",
        "LMT",
        -1199318400000
      ],
      [
        300,
        "-",
        "-05",
        536371200000
      ],
      [
        360,
        "Ecuador",
        "-06/-05",
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
    "Pacific/Galapagos": {
      "long": "Central America Standard Time",
      "group": "(GMT-06:00) Central America"
    }
  }
});