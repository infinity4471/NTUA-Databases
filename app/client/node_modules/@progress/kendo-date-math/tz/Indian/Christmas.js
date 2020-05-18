const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Indian/Christmas": [
      [
        -422.8666666666667,
        "-",
        "LMT",
        -2364076800000
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
    "Indian/Christmas": {
      "long": "SE Asia Standard Time",
      "group": "(GMT+07:00) Bangkok, Hanoi, Jakarta"
    }
  }
});