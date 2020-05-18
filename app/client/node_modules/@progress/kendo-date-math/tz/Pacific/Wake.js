const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Wake": [
      [
        -666.4666666666666,
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
    "Pacific/Wake": {
      "long": "UTC+12",
      "group": null
    }
  }
});