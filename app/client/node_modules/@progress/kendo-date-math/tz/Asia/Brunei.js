const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Brunei": [
      [
        -459.6666666666667,
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
        "-",
        "+08",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Asia/Brunei": {
      "long": "Singapore Standard Time",
      "group": "(GMT+08:00) Kuala Lumpur, Singapore"
    }
  }
});