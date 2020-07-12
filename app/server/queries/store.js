exports.fetchTopAlleyShelf = (Store_Id) => (
"select Offers.Alley_Number,Offers.Shelf_Number from Stores inner join Offers on Stores.Store_Id = Offers.Store_Id inner join Products on Offers.Barcode = Products.Barcode inner join Contains on Products.Barcode = Contains.Barcode inner join Transaction on Transaction.Date_Time = Contains.Date_Time inner join Performs on Performs.Date_Time = Transaction.Date_Time where Stores.Store_Id = " + Store_Id + " group by Offers.Alley_Number, Offers.Shelf_Number order by COUNT(*) DESC;" )

exports.insertOrUpdate = ( data ) => (
	"INSERT INTO Stores(" + Object.keys( data ).join( "," ) + " ) VALUES( " + Object.values( data ).map(d => `'${d}'`).join(',') + " ) ON DUPLICATE KEY UPDATE " + Object.keys( data ).map( ( k, i ) => `${k} = '${Object.values( data )[ i ]}'` ).join(',') + ";"
);

exports.deleteStores = ( key ) => (
	"DELETE FROM Stores WHERE Address = '" + key + "';" 
);

exports.fetchTopCustomersPerStore = ( address ) => (
	"SELECT Customer.Name, SUM( Transaction.Total_amount ) AS Total_Spendings FROM Customer JOIN Performs ON Customer.Card_Number = Performs.Card_Number JOIN Transaction ON Transaction.Date_Time = Performs.Date_Time JOIN Contains ON Contains.Date_Time = Transaction.Date_Time JOIN Products ON Products.Barcode = Contains.Barcode JOIN Offers ON Offers.Barcode = Products.Barcode JOIN Stores ON Stores.Store_Id = Offers.Store_Id WHERE Stores.Address = '" + address + "' GROUP BY Customer.Card_Number ORDER BY SUM( Transaction.Total_amount ) DESC;"
);
