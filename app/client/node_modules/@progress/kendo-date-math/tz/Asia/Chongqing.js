const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Chongqing": "Asia/Shanghai"
  },
  "rules": {},
  "titles": {
    "Asia/Chongqing": {
      "long": "China Standard Time",
      "group": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
    }
  }
});