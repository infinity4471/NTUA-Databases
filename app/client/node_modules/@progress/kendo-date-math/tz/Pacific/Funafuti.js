const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Funafuti": [
      [
        -716.8666666666667,
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
    "Pacific/Funafuti": {
      "long": "UTC+12",
      "group": null
    }
  }
});