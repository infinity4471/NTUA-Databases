const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Windhoek": [
      [
        -68.4,
        "-",
        "LMT",
        -2458166400000
      ],
      [
        -90,
        "-",
        "+0130",
        -2109283200000
      ],
      [
        -120,
        "-",
        "SAST",
        -860968800000
      ],
      [
        -120,
        "1:00",
        "SAST",
        -845244000000
      ],
      [
        -120,
        "-",
        "SAST",
        637977600000
      ],
      [
        -120,
        "Namibia",
        "%s",
        null
      ]
    ]
  },
  "rules": {
    "Namibia": [
      [
        1994,
        "only",
        "-",
        "Mar",
        "21",
        [
          0,
          0,
          0,
          null
        ],
        -60,
        "WAT"
      ],
      [
        1994,
        2017,
        "-",
        "Sep",
        "Sun>=1",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "CAT"
      ],
      [
        1995,
        2017,
        "-",
        "Apr",
        "Sun>=1",
        [
          2,
          0,
          0,
          null
        ],
        -60,
        "WAT"
      ]
    ]
  },
  "titles": {
    "Africa/Windhoek": {
      "long": "Namibia Standard Time",
      "group": "(GMT+02:00) Windhoek"
    }
  }
});