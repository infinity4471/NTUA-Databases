const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Muscat": "Asia/Dubai"
  },
  "rules": {},
  "titles": {
    "Asia/Muscat": {
      "long": "Arabian Standard Time",
      "group": "(GMT+04:00) Abu Dhabi, Muscat"
    }
  }
});