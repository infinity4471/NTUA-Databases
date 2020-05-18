const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Antarctica/Syowa": [
      [
        0,
        "-",
        "-00",
        -407808000000
      ],
      [
        -180,
        "-",
        "+03",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Antarctica/Syowa": {
      "long": "E. Africa Standard Time",
      "group": "(GMT+03:00) Nairobi"
    }
  }
});