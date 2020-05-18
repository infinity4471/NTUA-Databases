const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Martinique": [
      [
        244.33333333333334,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        244.33333333333334,
        "-",
        "FFMT",
        -1851552000000
      ],
      [
        240,
        "-",
        "AST",
        323827200000
      ],
      [
        240,
        "1:00",
        "ADT",
        338947200000
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
    "America/Martinique": {
      "long": "SA Western Standard Time",
      "group": "(GMT-04:00) La Paz"
    }
  }
});