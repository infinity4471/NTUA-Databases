const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Antarctica/Rothera": [
      [
        0,
        "-",
        "-00",
        218246400000
      ],
      [
        180,
        "-",
        "-03",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Antarctica/Rothera": {
      "long": "SA Eastern Standard Time",
      "group": "(GMT-03:00) Georgetown"
    }
  }
});