const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Kabul": [
      [
        -276.8,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        -240,
        "-",
        "+04",
        -757468800000
      ],
      [
        -270,
        "-",
        "+0430",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Asia/Kabul": {
      "long": "Afghanistan Standard Time",
      "group": "(GMT+04:30) Kabul"
    }
  }
});