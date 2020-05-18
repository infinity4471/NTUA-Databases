const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Pago_Pago": [
      [
        -757.2,
        "-",
        "LMT",
        -2445379200000
      ],
      [
        682.8,
        "-",
        "LMT",
        -1830470400000
      ],
      [
        660,
        "-",
        "SST",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Pacific/Pago_Pago": {
      "long": "UTC-11",
      "group": null
    }
  }
});