const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Tahiti": [
      [
        598.2666666666667,
        "-",
        "LMT",
        -1806710400000
      ],
      [
        600,
        "-",
        "-10",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Pacific/Tahiti": {
      "long": "Hawaiian Standard Time",
      "group": "(GMT-10:00) Hawaii"
    }
  }
});