const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Guadalcanal": [
      [
        -639.8,
        "-",
        "LMT",
        -1806710400000
      ],
      [
        -660,
        "-",
        "+11",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Pacific/Guadalcanal": {
      "long": "Central Pacific Standard Time",
      "group": "(GMT+11:00) Magadan, Solomon Is., New Caledonia"
    }
  }
});