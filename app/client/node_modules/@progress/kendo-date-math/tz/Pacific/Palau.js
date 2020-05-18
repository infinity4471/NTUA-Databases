const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Palau": [
      [
        902.0666666666666,
        "-",
        "LMT",
        -3944678400000
      ],
      [
        -537.9333333333334,
        "-",
        "LMT",
        -2146003200000
      ],
      [
        -540,
        "-",
        "+09",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Pacific/Palau": {
      "long": "Tokyo Standard Time",
      "group": "(GMT+09:00) Osaka, Sapporo, Tokyo"
    }
  }
});