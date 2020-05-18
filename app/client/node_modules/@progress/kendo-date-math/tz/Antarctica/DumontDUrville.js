const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Antarctica/DumontDUrville": [
      [
        0,
        "-",
        "-00",
        -694396800000
      ],
      [
        -600,
        "-",
        "+10",
        -566956800000
      ],
      [
        0,
        "-",
        "-00",
        -415497600000
      ],
      [
        -600,
        "-",
        "+10",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Antarctica/DumontDUrville": {
      "long": "West Pacific Standard Time",
      "group": "(GMT+10:00) Guam, Port Moresby"
    }
  }
});