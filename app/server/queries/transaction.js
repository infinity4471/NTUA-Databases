exports.fetchTopHours = () => (
"SELECT HOUR( Transaction.Date_Time ), ROUND( SUM( Transaction.Total_amount ), 2 ) FROM Transaction INNER JOIN Performs ON Transaction.Date_Time = Performs.Date_Time INNER JOIN Customer ON Customer.Card_Number = Performs.Card_Number group by HOUR( Transaction.Date_Time ) order by SUM( Transaction.Total_amount ) DESC;"
);

exports.fetchCountTransactionsPerHour = () => (
	"SELECT HOUR( Transaction.Date_Time ), COUNT( Transaction.Date_Time ) from Transaction INNER JOIN Performs on Transaction.Date_Time = Performs.Date_Time INNER JOIN Customer ON Customer.Card_Number = Performs.Card_Number group by HOUR( Transaction.Date_Time );"
);
