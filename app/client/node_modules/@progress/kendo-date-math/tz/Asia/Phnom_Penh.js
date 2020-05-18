const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Phnom_Penh": "Asia/Bangkok"
  },
  "rules": {},
  "titles": {
    "Asia/Phnom_Penh": {
      "long": "SE Asia Standard Time",
      "group": "(GMT+07:00) Bangkok, Hanoi, Jakarta"
    }
  }
});