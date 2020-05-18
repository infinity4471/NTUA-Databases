const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Thimphu": [
      [
        -358.6,
        "-",
        "LMT",
        -706320000000
      ],
      [
        -330,
        "-",
        "+0530",
        560044800000
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
    "Asia/Thimphu": {
      "long": "Bangladesh Standard Time",
      "group": null
    }
  }
});