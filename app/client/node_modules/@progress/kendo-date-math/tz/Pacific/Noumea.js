const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Noumea": [
      [
        -665.8,
        "-",
        "LMT",
        -1829347200000
      ],
      [
        -660,
        "NC",
        "+11/+12",
        null
      ]
    ]
  },
  "rules": {
    "NC": [
      [
        1977,
        1978,
        "-",
        "Dec",
        "Sun>=1",
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
        1978,
        1979,
        "-",
        "Feb",
        "27",
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
        1996,
        "only",
        "-",
        "Dec",
        "1",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "-"
      ],
      [
        1997,
        "only",
        "-",
        "Mar",
        "2",
        [
          2,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Pacific/Noumea": {
      "long": "Central Pacific Standard Time",
      "group": "(GMT+11:00) Magadan, Solomon Is., New Caledonia"
    }
  }
});