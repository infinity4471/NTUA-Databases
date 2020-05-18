const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Antarctica/Mawson": [
      [
        0,
        "-",
        "-00",
        -501206400000
      ],
      [
        -360,
        "-",
        "+06",
        1255831200000
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
    "Antarctica/Mawson": {
      "long": "West Asia Standard Time",
      "group": "(GMT+05:00) Tashkent"
    }
  }
});