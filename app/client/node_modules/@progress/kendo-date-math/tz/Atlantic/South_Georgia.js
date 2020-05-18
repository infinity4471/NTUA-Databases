const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Atlantic/South_Georgia": [
      [
        146.13333333333335,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        120,
        "-",
        "-02",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Atlantic/South_Georgia": {
      "long": "UTC-02",
      "group": null
    }
  }
});