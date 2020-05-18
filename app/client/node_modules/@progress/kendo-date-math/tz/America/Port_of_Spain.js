const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Port_of_Spain": [
      [
        246.06666666666666,
        "-",
        "LMT",
        -1825113600000
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
    "America/Port_of_Spain": {
      "long": "SA Western Standard Time",
      "group": "(GMT-04:00) La Paz"
    }
  }
});