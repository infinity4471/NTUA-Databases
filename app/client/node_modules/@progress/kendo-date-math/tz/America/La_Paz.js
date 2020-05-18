const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/La_Paz": [
      [
        272.6,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        272.6,
        "-",
        "CMT",
        -1205971200000
      ],
      [
        272.6,
        "1:00",
        "BST",
        -1192320000000
      ],
      [
        240,
        "-",
        "-04",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "America/La_Paz": {
      "long": "SA Western Standard Time",
      "group": "(GMT-04:00) La Paz"
    }
  }
});