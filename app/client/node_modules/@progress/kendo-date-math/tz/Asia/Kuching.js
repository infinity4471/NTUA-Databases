const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Kuching": [
      [
        -441.3333333333333,
        "-",
        "LMT",
        -1383436800000
      ],
      [
        -450,
        "-",
        "+0730",
        -1136160000000
      ],
      [
        -480,
        "NBorneo",
        "+08/+0820",
        -879638400000
      ],
      [
        -540,
        "-",
        "+09",
        -766972800000
      ],
      [
        -480,
        "-",
        "+08",
        null
      ]
    ]
  },
  "rules": {
    "NBorneo": [
      [
        1935,
        1941,
        "-",
        "Sep",
        "14",
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
        1935,
        1941,
        "-",
        "Dec",
        "14",
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
    "Asia/Kuching": {
      "long": "Singapore Standard Time",
      "group": "(GMT+08:00) Kuala Lumpur, Singapore"
    }
  }
});