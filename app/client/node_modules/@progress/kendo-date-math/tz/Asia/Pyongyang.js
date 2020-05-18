const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Pyongyang": [
      [
        -503,
        "-",
        "LMT",
        -1948752000000
      ],
      [
        -510,
        "-",
        "KST",
        -1830384000000
      ],
      [
        -540,
        "-",
        "JST",
        -768614400000
      ],
      [
        -540,
        "-",
        "KST",
        1439596800000
      ],
      [
        -510,
        "-",
        "KST",
        1525476600000
      ],
      [
        -540,
        "-",
        "KST",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Asia/Pyongyang": {
      "long": "Korea Standard Time",
      "group": "(GMT+09:00) Seoul"
    }
  }
});