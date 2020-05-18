const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Qatar": [
      [
        -206.13333333333335,
        "-",
        "LMT",
        -1546387200000
      ],
      [
        -240,
        "-",
        "+04",
        76204800000
      ],
      [
        -180,
        "-",
        "+03",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Asia/Qatar": {
      "long": "Arab Standard Time",
      "group": "(GMT+03:00) Kuwait, Riyadh"
    }
  }
});