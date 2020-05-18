const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Jayapura": [
      [
        -562.8,
        "-",
        "LMT",
        -1172880000000
      ],
      [
        -540,
        "-",
        "+09",
        -799459200000
      ],
      [
        -570,
        "-",
        "+0930",
        -157852800000
      ],
      [
        -540,
        "-",
        "WIT",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Asia/Jayapura": {
      "long": "Tokyo Standard Time",
      "group": "(GMT+09:00) Osaka, Sapporo, Tokyo"
    }
  }
});