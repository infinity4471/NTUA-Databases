const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Urumqi": [
      [
        -350.3333333333333,
        "-",
        "LMT",
        -1293926400000
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
    "Asia/Urumqi": {
      "long": "China Standard Time",
      "group": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
    }
  }
});