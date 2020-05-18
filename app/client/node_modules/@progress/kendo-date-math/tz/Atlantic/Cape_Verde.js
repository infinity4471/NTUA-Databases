const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Atlantic/Cape_Verde": [
      [
        94.06666666666668,
        "-",
        "LMT",
        -1830376800000
      ],
      [
        120,
        "-",
        "-02",
        -862617600000
      ],
      [
        120,
        "1:00",
        "-01",
        -764121600000
      ],
      [
        120,
        "-",
        "-02",
        186112800000
      ],
      [
        60,
        "-",
        "-01",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Atlantic/Cape_Verde": {
      "long": "Cape Verde Standard Time",
      "group": "(GMT-01:00) Cape Verde Is."
    }
  }
});