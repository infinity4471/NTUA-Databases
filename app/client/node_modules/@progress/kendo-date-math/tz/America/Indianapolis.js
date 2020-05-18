const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Indianapolis": "America/Indiana/Indianapolis"
  },
  "rules": {},
  "titles": {
    "America/Indianapolis": {
      "long": "US Eastern Standard Time",
      "group": "(GMT-05:00) Indiana (East)"
    }
  }
});