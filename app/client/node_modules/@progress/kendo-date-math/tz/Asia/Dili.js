const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Dili": [
      [
        -502.3333333333333,
        "-",
        "LMT",
        -1830384000000
      ],
      [
        -480,
        "-",
        "+08",
        -879123600000
      ],
      [
        -540,
        "-",
        "+09",
        199929600000
      ],
      [
        -480,
        "-",
        "+08",
        969148800000
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
    "Asia/Dili": {
      "long": "Tokyo Standard Time",
      "group": "(GMT+09:00) Osaka, Sapporo, Tokyo"
    }
  }
});