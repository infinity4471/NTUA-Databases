const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Saipan": "Pacific/Guam"
  },
  "rules": {},
  "titles": {
    "Pacific/Saipan": {
      "long": "West Pacific Standard Time",
      "group": "(GMT+10:00) Guam, Port Moresby"
    }
  }
});