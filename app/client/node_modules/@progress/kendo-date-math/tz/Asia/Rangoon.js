const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Rangoon": "Asia/Yangon"
  },
  "rules": {},
  "titles": {
    "Asia/Rangoon": {
      "long": "Myanmar Standard Time",
      "group": "(GMT+06:30) Yangon (Rangoon)"
    }
  }
});