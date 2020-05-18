const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Antarctica/South_Pole": "Pacific/Auckland"
  },
  "rules": {},
  "titles": {
    "Antarctica/South_Pole": {
      "long": "New Zealand Standard Time",
      "group": "(GMT+12:00) Auckland, Wellington"
    }
  }
});