const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Montreal": "America/Toronto"
  },
  "rules": {},
  "titles": {
    "America/Montreal": {
      "long": "Eastern Standard Time",
      "group": "(GMT-05:00) Eastern Time (US & Canada)"
    }
  }
});