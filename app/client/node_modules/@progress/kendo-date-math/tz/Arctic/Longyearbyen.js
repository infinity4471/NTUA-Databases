const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Arctic/Longyearbyen": "Europe/Oslo"
  },
  "rules": {},
  "titles": {
    "Arctic/Longyearbyen": {
      "long": "W. Europe Standard Time",
      "group": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
    }
  }
});