const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Jersey": "Europe/London"
  },
  "rules": {},
  "titles": {
    "Europe/Jersey": {
      "long": "GMT Standard Time",
      "group": "(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"
    }
  }
});