const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Ljubljana": "Europe/Belgrade"
  },
  "rules": {},
  "titles": {
    "Europe/Ljubljana": {
      "long": "Central Europe Standard Time",
      "group": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
    }
  }
});