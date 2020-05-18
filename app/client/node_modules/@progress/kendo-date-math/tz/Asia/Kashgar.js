const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Kashgar": "Asia/Urumqi"
  },
  "rules": {},
  "titles": {
    "Asia/Kashgar": {
      "long": "China Standard Time",
      "group": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
    }
  }
});