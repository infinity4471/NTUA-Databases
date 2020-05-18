const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Makassar": [
      [
        -477.6,
        "-",
        "LMT",
        -1546387200000
      ],
      [
        -477.6,
        "-",
        "MMT",
        -1172880000000
      ],
      [
        -480,
        "-",
        "+08",
        -880243200000
      ],
      [
        -540,
        "-",
        "+09",
        -766022400000
      ],
      [
        -480,
        "-",
        "WITA",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Asia/Makassar": {
      "long": "Singapore Standard Time",
      "group": "(GMT+08:00) Kuala Lumpur, Singapore"
    }
  }
});