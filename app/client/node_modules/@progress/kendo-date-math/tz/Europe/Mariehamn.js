const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Mariehamn": "Europe/Helsinki"
  },
  "rules": {},
  "titles": {
    "Europe/Mariehamn": {
      "long": "FLE Standard Time",
      "group": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
    }
  }
});