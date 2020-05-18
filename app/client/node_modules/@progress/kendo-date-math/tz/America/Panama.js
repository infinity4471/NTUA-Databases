const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Panama": [
      [
        318.1333333333333,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        319.6,
        "-",
        "CMT",
        -1946937600000
      ],
      [
        300,
        "-",
        "EST",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "America/Panama": {
      "long": "SA Pacific Standard Time",
      "group": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
    }
  }
});