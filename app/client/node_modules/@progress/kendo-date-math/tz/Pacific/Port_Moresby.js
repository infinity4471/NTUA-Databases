const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Port_Moresby": [
      [
        -588.6666666666666,
        "-",
        "LMT",
        -2808604800000
      ],
      [
        -588.5333333333334,
        "-",
        "PMMT",
        -2335305600000
      ],
      [
        -600,
        "-",
        "+10",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Pacific/Port_Moresby": {
      "long": "West Pacific Standard Time",
      "group": "(GMT+10:00) Guam, Port Moresby"
    }
  }
});