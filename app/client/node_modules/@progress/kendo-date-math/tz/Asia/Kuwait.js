const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Kuwait": "Asia/Riyadh"
  },
  "rules": {},
  "titles": {
    "Asia/Kuwait": {
      "long": "Arab Standard Time",
      "group": "(GMT+03:00) Kuwait, Riyadh"
    }
  }
});