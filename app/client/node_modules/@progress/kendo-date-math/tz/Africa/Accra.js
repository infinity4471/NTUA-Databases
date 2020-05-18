const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Accra": [
      [
        0.8666666666666666,
        "-",
        "LMT",
        -1609545600000
      ],
      [
        0,
        "Ghana",
        "GMT/+0020",
        null
      ]
    ]
  },
  "rules": {
    "Ghana": [
      [
        1920,
        1942,
        "-",
        "Sep",
        "1",
        [
          0,
          0,
          0,
          null
        ],
        20,
        "-"
      ],
      [
        1920,
        1942,
        "-",
        "Dec",
        "31",
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
    "Africa/Accra": {
      "long": "Greenwich Standard Time",
      "group": "(GMT) Monrovia, Reykjavik"
    }
  }
});