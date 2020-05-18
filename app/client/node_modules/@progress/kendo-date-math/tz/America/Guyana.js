const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Guyana": [
      [
        232.66666666666666,
        "-",
        "LMT",
        -1730592000000
      ],
      [
        225,
        "-",
        "-0345",
        175996800000
      ],
      [
        180,
        "-",
        "-03",
        694137600000
      ],
      [
        240,
        "-",
        "-04",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "America/Guyana": {
      "long": "SA Western Standard Time",
      "group": "(GMT-04:00) La Paz"
    }
  }
});