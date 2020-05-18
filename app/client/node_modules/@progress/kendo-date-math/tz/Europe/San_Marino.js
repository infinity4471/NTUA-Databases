const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/San_Marino": "Europe/Rome"
  },
  "rules": {},
  "titles": {
    "Europe/San_Marino": {
      "long": "W. Europe Standard Time",
      "group": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
    }
  }
});