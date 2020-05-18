const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Kwajalein": [
      [
        -669.3333333333334,
        "-",
        "LMT",
        -2146003200000
      ],
      [
        -660,
        "-",
        "+11",
        -1009929600000
      ],
      [
        -600,
        "-",
        "+10",
        -907372800000
      ],
      [
        -540,
        "-",
        "+09",
        -817430400000
      ],
      [
        -660,
        "-",
        "+11",
        -7948800000
      ],
      [
        720,
        "-",
        "-12",
        745891200000
      ],
      [
        -720,
        "-",
        "+12",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Pacific/Kwajalein": {
      "long": "UTC+12",
      "group": null
    }
  }
});