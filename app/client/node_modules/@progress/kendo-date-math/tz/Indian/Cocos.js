const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Indian/Cocos": [
      [
        -387.6666666666667,
        "-",
        "LMT",
        -2177539200000
      ],
      [
        -390,
        "-",
        "+0630",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Indian/Cocos": {
      "long": "Myanmar Standard Time",
      "group": "(GMT+06:30) Yangon (Rangoon)"
    }
  }
});