const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Indian/Reunion": [
      [
        -221.86666666666665,
        "-",
        "LMT",
        -1848873600000
      ],
      [
        -240,
        "-",
        "+04",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Indian/Reunion": {
      "long": "Mauritius Standard Time",
      "group": "(GMT+04:00) Port Louis"
    }
  }
});