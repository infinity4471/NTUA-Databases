const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Wallis": [
      [
        -735.3333333333334,
        "-",
        "LMT",
        -2146003200000
      ],
      [
        -720,
        "-",
        "+12",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Pacific/Wallis": {
      "long": "UTC+12",
      "group": null
    }
  }
});