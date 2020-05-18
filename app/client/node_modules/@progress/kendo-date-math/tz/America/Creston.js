const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Creston": [
      [
        466.06666666666666,
        "-",
        "LMT",
        -2682374400000
      ],
      [
        420,
        "-",
        "MST",
        -1680480000000
      ],
      [
        480,
        "-",
        "PST",
        -1627862400000
      ],
      [
        420,
        "-",
        "MST",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "America/Creston": {
      "long": "US Mountain Standard Time",
      "group": "(GMT-07:00) Arizona"
    }
  }
});