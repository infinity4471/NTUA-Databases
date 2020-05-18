const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Enderbury": [
      [
        684.3333333333334,
        "-",
        "LMT",
        -2146003200000
      ],
      [
        720,
        "-",
        "-12",
        307584000000
      ],
      [
        660,
        "-",
        "-11",
        788832000000
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
    "Pacific/Enderbury": {
      "long": "Tonga Standard Time",
      "group": "(GMT+13:00) Nuku'alofa"
    }
  }
});