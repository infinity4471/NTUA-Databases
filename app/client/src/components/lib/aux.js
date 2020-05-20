function fixDate( date ) {
	alert( date )
	if( date === undefined ) return undefined;
	let myDate = date.getFullYear() + "-"
	var month = (date.getMonth() + 1)
	if( month < 10 ) myDate += "0";
	myDate += month + "-"
	var day = date.getDate();
	if( day < 10 ) myDate += "0";
	myDate += day
	return myDate
}
