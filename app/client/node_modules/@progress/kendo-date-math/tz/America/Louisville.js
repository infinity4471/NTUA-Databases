const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Louisville": "America/Kentucky/Louisville"
  },
  "rules": {},
  "titles": {
    "America/Louisville": {
      "long": "Eastern Standard Time",
      "group": "(GMT-05:00) Eastern Time (US & Canada)"
    }
  }
});