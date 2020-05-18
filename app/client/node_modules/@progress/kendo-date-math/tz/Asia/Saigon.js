const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Saigon": "Asia/Ho_Chi_Minh"
  },
  "rules": {},
  "titles": {
    "Asia/Saigon": {
      "long": "SE Asia Standard Time",
      "group": "(GMT+07:00) Bangkok, Hanoi, Jakarta"
    }
  }
});