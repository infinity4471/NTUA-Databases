const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Tarawa": [
      [
        -692.0666666666666,
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
    "Pacific/Tarawa": {
      "long": "UTC+12",
      "group": null
    }
  }
});