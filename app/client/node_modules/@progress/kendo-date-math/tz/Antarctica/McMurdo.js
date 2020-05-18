const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Antarctica/McMurdo": "Pacific/Auckland"
  },
  "rules": {},
  "titles": {
    "Antarctica/McMurdo": {
      "long": "New Zealand Standard Time",
      "group": "(GMT+12:00) Auckland, Wellington"
    }
  }
});