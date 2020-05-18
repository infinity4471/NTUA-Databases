const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Indian/Maldives": [
      [
        -294,
        "-",
        "LMT",
        -2808604800000
      ],
      [
        -294,
        "-",
        "MMT",
        -284083200000
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
    "Indian/Maldives": {
      "long": "West Asia Standard Time",
      "group": "(GMT+05:00) Tashkent"
    }
  }
});