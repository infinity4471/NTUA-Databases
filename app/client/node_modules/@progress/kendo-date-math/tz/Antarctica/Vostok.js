const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Antarctica/Vostok": [
      [
        0,
        "-",
        "-00",
        -380073600000
      ],
      [
        -360,
        "-",
        "+06",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Antarctica/Vostok": {
      "long": "Central Asia Standard Time",
      "group": "(GMT+06:00) Astana, Dhaka"
    }
  }
});