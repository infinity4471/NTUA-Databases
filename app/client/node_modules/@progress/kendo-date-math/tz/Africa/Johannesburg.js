const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Johannesburg": [
      [
        -112,
        "-",
        "LMT",
        -2458166400000
      ],
      [
        -90,
        "-",
        "SAST",
        -2109283200000
      ],
      [
        -120,
        "SA",
        "SAST",
        null
      ]
    ]
  },
  "rules": {
    "SA": [
      [
        1942,
        1943,
        "-",
        "Sep",
        "Sun>=15",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1943,
        1944,
        "-",
        "Mar",
        "Sun>=15",
        [
          2,
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
    "Africa/Johannesburg": {
      "long": "South Africa Standard Time",
      "group": "(GMT+02:00) Harare, Pretoria"
    }
  }
});