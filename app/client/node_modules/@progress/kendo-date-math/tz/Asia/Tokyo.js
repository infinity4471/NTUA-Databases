const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Tokyo": [
      [
        -558.9833333333333,
        "-",
        "LMT",
        -2587712400000
      ],
      [
        -540,
        "Japan",
        "J%sT",
        null
      ]
    ]
  },
  "rules": {
    "Japan": [
      [
        1948,
        "only",
        "-",
        "May",
        "Sat>=1",
        [
          24,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1948,
        1951,
        "-",
        "Sep",
        "Sat>=8",
        [
          25,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1949,
        "only",
        "-",
        "Apr",
        "Sat>=1",
        [
          24,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1950,
        1951,
        "-",
        "May",
        "Sat>=1",
        [
          24,
          0,
          0,
          null
        ],
        60,
        "D"
      ]
    ]
  },
  "titles": {
    "Asia/Tokyo": {
      "long": "Tokyo Standard Time",
      "group": "(GMT+09:00) Osaka, Sapporo, Tokyo"
    }
  }
});