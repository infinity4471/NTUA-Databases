const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Curacao": [
      [
        275.7833333333333,
        "-",
        "LMT",
        -1826755200000
      ],
      [
        270,
        "-",
        "-0430",
        -126316800000
      ],
      [
        240,
        "-",
        "AST",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "America/Curacao": {
      "long": "SA Western Standard Time",
      "group": "(GMT-04:00) La Paz"
    }
  }
});