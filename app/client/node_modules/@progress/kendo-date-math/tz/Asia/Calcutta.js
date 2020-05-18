const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Calcutta": "Asia/Kolkata"
  },
  "rules": {},
  "titles": {
    "Asia/Calcutta": {
      "long": "India Standard Time",
      "group": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi"
    }
  }
});