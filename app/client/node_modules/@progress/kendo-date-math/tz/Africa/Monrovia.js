const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Monrovia": [
      [
        43.13333333333333,
        "-",
        "LMT",
        -2745532800000
      ],
      [
        43.13333333333333,
        "-",
        "MMT",
        -1604361600000
      ],
      [
        44.5,
        "-",
        "MMT",
        63590400000
      ],
      [
        0,
        "-",
        "GMT",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Africa/Monrovia": {
      "long": "Greenwich Standard Time",
      "group": "(GMT) Monrovia, Reykjavik"
    }
  }
});