const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Harbin": "Asia/Shanghai"
  },
  "rules": {},
  "titles": {
    "Asia/Harbin": {
      "long": "China Standard Time",
      "group": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
    }
  }
});