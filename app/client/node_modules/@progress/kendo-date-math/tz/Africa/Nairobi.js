const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Nairobi": [
      [
        -147.26666666666665,
        "-",
        "LMT",
        -1309737600000
      ],
      [
        -180,
        "-",
        "EAT",
        -1230854400000
      ],
      [
        -150,
        "-",
        "+0230",
        -915235200000
      ],
      [
        -165,
        "-",
        "+0245",
        -284083200000
      ],
      [
        -180,
        "-",
        "EAT",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Africa/Nairobi": {
      "long": "E. Africa Standard Time",
      "group": "(GMT+03:00) Nairobi"
    }
  }
});