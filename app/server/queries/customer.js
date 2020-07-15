exports.selectCustomer = (Name) => (
	"select * from Customer where Name = '" + Name + "'"
);

exports.fetchTransactions = (cardNumber) => (
	"select Total_amount, Transaction.Date_Time, Payment_method from Transaction inner join Performs on Performs.Card_Number = '" + cardNumber + "' and Transaction.Date_Time = Performs.Date_Time"
);

exports.fetchStores = (cardNumber) => (
	"select DISTINCT Stores.Store_Id, Stores.Address from ((((((Customer inner join Performs on Customer.Card_Number = Performs.Card_Number and Customer.Card_Number = '" + cardNumber + "') inner join Transaction on Performs.Date_Time = Transaction.Date_Time) inner join Contains on Contains.Date_Time = Transaction.Date_Time ) inner join Products on Contains.Barcode = Products.Barcode) inner join Offers on Offers.Barcode = Products.Barcode) inner join Stores on Stores.Store_Id = Offers.Store_Id)"
);

exports.fetchTop10Products = (cardNumber) => (
	"select Products.Brand_Name, COUNT( Products.Barcode ) from Products inner join Contains on Products.Barcode = Contains.Barcode inner join Transaction on Transaction.Date_Time = Contains.Date_Time inner join Performs on Performs.Date_Time = Transaction.Date_Time inner join Customer on Customer.Card_Number = Performs.Card_Number where Customer.Card_Number = '" + cardNumber + "' group by Products.Barcode order by COUNT( Products.Barcode )     DESC LIMIT 10;"
);

exports.fetchAverageOverMonth = (cardNumber) => (
	"SELECT ROUND( AVG( Transaction.Total_amount ), 2 ), MONTH( Transaction.Date_Time ) from Transaction INNER JOIN Performs on Transaction.Date_Time = Performs.Date_Time INNER JOIN Customer ON Customer.Card_Number = Performs.Card_Number WHERE Customer.Card_Number = '" + cardNumber + "' group by MONTH( Transaction.Date_Time );"
);

exports.fetchAverageOverWeek = (cardNumber) => (
	"SELECT ROUND( AVG( Transaction.Total_amount ), 2 ), WEEK( Transaction.Date_Time ) from Transaction INNER JOIN Performs on Transaction.Date_Time = Performs.Date_Time INNER JOIN Customer ON Customer.Card_Number = Performs.Card_Number WHERE Customer.Card_Number = '" + cardNumber + "' group by WEEK( Transaction.Date_Time );"
);

exports.fetchNumberOfStoresPerCustomer = (cardNumber) => (
	"select count(*) as Number_Of_Stores, Stores.Store_Id, Stores.Address from Customer inner join Performs on Customer.Card_Number = Performs.Card_Number and Customer.Card_Number = '" + cardNumber + "' inner join Transaction on Performs.Date_Time = Transaction.Date_Time inner join Contains on Contains.Date_Time = Transaction.Date_Time inner join Products on Contains.Barcode = Products.Barcode inner join Offers on Offers.Barcode = Products.Barcode inner join Stores on Stores.Store_Id = Offers.Store_Id group by Stores.Store_Id;"
);

exports.insertOrUpdate = ( data ) => (
	"INSERT INTO Customer( " + Object.keys( data ).join( "," ) + " ) VALUES( " + Object.values( data ).map(d => `'${d}'`).join(',') + " ) ON DUPLICATE KEY UPDATE " + Object.keys( data ).map( ( k, i ) => `${k} = '${Object.values( data )[ i ]}'` ).join(',') + ";"
);

exports.fetchCustomerVisitsPerHour = ( card_number, address ) => (
	"SELECT HOUR( Transaction.Date_Time ), COUNT( * ) AS Total_Visits FROM Customer JOIN Performs ON Customer.Card_Number = Performs.Card_Number JOIN Transaction ON Transaction.Date_Time = Performs.Date_Time JOIN Contains ON Contains.Date_Time = Transaction.Date_Time JOIN Products ON Products.Barcode = Contains.Barcode JOIN Offers ON Offers.Barcode = Products.Barcode JOIN Stores ON Stores.Store_Id = Offers.Store_Id WHERE Stores.Address = '" + address + "' AND Customer.Card_Number = '" + card_number + "' GROUP BY HOUR( Transaction.Date_Time ) ORDER BY HOUR( Transaction.Date_Time ) ASC;"
);

exports.deleteCustomer = ( key ) => (
	"DELETE FROM Customer WHERE Card_Number = '" + key + "';" 
);

exports.fetchTop10Products = ( card_number ) => (
	"SELECT Products.Barcode, Products.Name, Products.Brand_Name, COUNT( * ) as Times_Purchased FROM Customer JOIN Performs ON Customer.Card_Number = Performs.Card_Number JOIN Transaction ON Transaction.Date_Time = Performs.Date_Time JOIN Contains ON Contains.Date_Time = Transaction.Date_Time JOIN Products ON Products.Barcode = Contains.Barcode WHERE Customer.Card_Number = '" + card_number + "' GROUP BY Products.Barcode ORDER BY COUNT( * ) DESC;"
);
