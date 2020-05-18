const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Indian/Chagos": [
      [
        -289.6666666666667,
        "-",
        "LMT",
        -1956700800000
      ],
      [
        -300,
        "-",
        "+05",
        851990400000
      ],
      [
        -360,
        "-",
        "+06",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Indian/Chagos": {
      "long": "Central Asia Standard Time",
      "group": "(GMT+06:00) Astana, Dhaka"
    }
  }
});