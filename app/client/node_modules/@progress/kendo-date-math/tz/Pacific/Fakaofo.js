const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Fakaofo": [
      [
        684.9333333333334,
        "-",
        "LMT",
        -2146003200000
      ],
      [
        660,
        "-",
        "-11",
        1325203200000
      ],
      [
        -780,
        "-",
        "+13",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Pacific/Fakaofo": {
      "long": "Tonga Standard Time",
      "group": "(GMT+13:00) Nuku'alofa"
    }
  }
});