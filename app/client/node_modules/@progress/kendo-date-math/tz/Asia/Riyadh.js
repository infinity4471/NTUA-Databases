const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Riyadh": [
      [
        -186.86666666666665,
        "-",
        "LMT",
        -719625600000
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
    "Asia/Riyadh": {
      "long": "Arab Standard Time",
      "group": "(GMT+03:00) Kuwait, Riyadh"
    }
  }
});