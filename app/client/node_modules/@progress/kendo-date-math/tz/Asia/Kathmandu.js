const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Kathmandu": [
      [
        -341.2666666666667,
        "-",
        "LMT",
        -1546387200000
      ],
      [
        -330,
        "-",
        "+0530",
        536371200000
      ],
      [
        -345,
        "-",
        "+0545",
        null
      ]
    ]
  },
  "rules": {},
  "titles": {
    "Asia/Kathmandu": {
      "long": null,
      "group": null
    }
  }
});