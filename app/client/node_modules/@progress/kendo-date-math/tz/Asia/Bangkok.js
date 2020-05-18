const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Bangkok": [
      [
        -402.06666666666666,
        "-",
        "LMT",
        -2808604800000
      ],
      [
        -402.06666666666666,
        "-",
        "BMT",
        -1570060800000
      ],
      [
        -420,
        "-",
        "+07",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Asia/Bangkok": {
      "long": "SE Asia Standard Time",
      "group": "(GMT+07:00) Bangkok, Hanoi, Jakarta"
    }
  }
});