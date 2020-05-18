const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Indian/Kerguelen": [
      [
        0,
        "-",
        "-00",
        -599702400000
      ],
      [
        -300,
        "-",
        "+05",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Indian/Kerguelen": {
      "long": "West Asia Standard Time",
      "group": "(GMT+05:00) Tashkent"
    }
  }
});