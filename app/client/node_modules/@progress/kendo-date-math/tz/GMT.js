const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "GMT": "Etc/GMT"
  },
  "rules": {},
  "titles": {
    "GMT": {
      "long": "Dateline Standard Time",
      "group": "(GMT-12:00) International Date Line West"
    }
  }
});