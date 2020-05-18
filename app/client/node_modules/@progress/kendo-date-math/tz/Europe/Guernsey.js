const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Guernsey": "Europe/London"
  },
  "rules": {},
  "titles": {
    "Europe/Guernsey": {
      "long": "GMT Standard Time",
      "group": "(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"
    }
  }
});