const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Africa/Maputo": [
      [
        -130.33333333333331,
        "-",
        "LMT",
        -2109283200000
      ],
      [
        -120,
        "-",
        "CAT",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Africa/Maputo": {
      "long": "South Africa Standard Time",
      "group": "(GMT+02:00) Harare, Pretoria"
    }
  }
});