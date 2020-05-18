const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Podgorica": "Europe/Belgrade"
  },
  "rules": {},
  "titles": {
    "Europe/Podgorica": {
      "long": "Central Europe Standard Time",
      "group": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
    }
  }
});