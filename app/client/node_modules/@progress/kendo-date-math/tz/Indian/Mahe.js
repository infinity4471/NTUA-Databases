const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Indian/Mahe": [
      [
        -221.8,
        "-",
        "LMT",
        -2006640000000
      ],
      [
        -240,
        "-",
        "+04",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Indian/Mahe": {
      "long": "Mauritius Standard Time",
      "group": "(GMT+04:00) Port Louis"
    }
  }
});