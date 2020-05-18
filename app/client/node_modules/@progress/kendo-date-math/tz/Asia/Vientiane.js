const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Vientiane": "Asia/Bangkok"
  },
  "rules": {},
  "titles": {
    "Asia/Vientiane": {
      "long": "SE Asia Standard Time",
      "group": "(GMT+07:00) Bangkok, Hanoi, Jakarta"
    }
  }
});