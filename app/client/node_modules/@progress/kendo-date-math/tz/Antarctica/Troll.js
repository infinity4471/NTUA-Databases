const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Antarctica/Troll": [
      [
        0,
        "-",
        "-00",
        1108166400000
      ],
      [
        0,
        "Troll",
        "%s",
        null
      ]
    ]
  },
  "rules": {
    "Troll": [
      [
        2005,
        "max",
        "-",
        "Mar",
        "lastSun",
        [
          1,
          0,
          0,
          "u"
        ],
        120,
        "+02"
      ],
      [
        2004,
        "max",
        "-",
        "Oct",
        "lastSun",
        [
          1,
          0,
          0,
          "u"
        ],
        0,
        "+00"
      ]
    ]
  },
  "titles": {
    "Antarctica/Troll": {
      "long": null,
      "group": null
    }
  }
});