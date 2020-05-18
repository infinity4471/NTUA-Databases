const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/St_Thomas": "America/Port_of_Spain"
  },
  "rules": {},
  "titles": {
    "America/St_Thomas": {
      "long": "SA Western Standard Time",
      "group": "(GMT-04:00) La Paz"
    }
  }
});