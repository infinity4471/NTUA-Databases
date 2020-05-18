const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Dhaka": [
      [
        -361.6666666666667,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        -353.3333333333333,
        "-",
        "HMT",
        -891561600000
      ],
      [
        -390,
        "-",
        "+0630",
        -872035200000
      ],
      [
        -330,
        "-",
        "+0530",
        -862617600000
      ],
      [
        -390,
        "-",
        "+0630",
        -576115200000
      ],
      [
        -360,
        "-",
        "+06",
        1262217600000
      ],
      [
        -360,
        "Dhaka",
        "+06/+07",
        null
      ]
    ]
  },
  "rules": {
    "Dhaka": [
      [
        2009,
        "only",
        "-",
        "Jun",
        "19",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        2009,
        "only",
        "-",
        "Dec",
        "31",
        [
          24,
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
    "Asia/Dhaka": {
      "long": "Bangladesh Standard Time",
      "group": null
    }
  }
});