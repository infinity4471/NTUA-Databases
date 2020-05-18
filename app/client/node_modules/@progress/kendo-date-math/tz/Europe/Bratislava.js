const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Bratislava": "Europe/Prague"
  },
  "rules": {},
  "titles": {
    "Europe/Bratislava": {
      "long": "Central Europe Standard Time",
      "group": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
    }
  }
});