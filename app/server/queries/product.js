exports.fetchOlderPrices = ( BarCode ) => (
	"SELECT Products.BarCode as BarCode, Products.Price as Current_Price, Older_Prices.Start_Date, Older_Prices.Price, Older_Prices.End_Date FROM Products JOIN Had ON Had.BarCode = Products.BarCode JOIN Older_Prices ON Older_Prices.Start_Date = Had.Start_Date WHERE Products.BarCode = '" + BarCode + "';"
);

exports.insertOrUpdate = ( data ) => (
	"INSERT INTO Products( " + Object.keys( data ).join( "," ) + " ) VALUES( " + Object.values( data ).map(d => `'${d}'`).join(',') + " ) ON DUPLICATE KEY UPDATE " + Object.keys( data ).map( ( k, i ) => `${k} = '${Object.values( data )[ i ]}'` ).join(',') + ";"
);

exports.deleteProduct = ( key ) => (
	"DELETE FROM Products WHERE Barcode = '" + key + "';" 
);

exports.fetchTicketPercentage = ( category_id ) => (
	"SELECT 100.0 * SUM( case when Products.Brand_Name = 'TSUPEMAKI' then 1 else 0 end ) / COUNT( * ) as Ticket_Products_From_Category FROM Products JOIN Belongs ON Products.Barcode = Belongs.Barcode JOIN Category ON Category.Category_id = Belongs.Category_id WHERE Category.Category_id = " + category_id + ";"
);

exports.fetchTopProductPairs = () => (
	"SELECT P1.Barcode as Barcode_1, P1.Name as Name_1, P2.Barcode as Barcode_2, P2.Name as Name_2 FROM Products as P1 JOIN Products as P2 JOIN ( Contains as C1, Contains as C2 ) ON ( C1.Barcode = P1.Barcode AND C2.Barcode = P2.Barcode ) JOIN Transaction ON ( Transaction.Date_Time = C1.Date_Time AND C2.Date_TIME = Transaction.Date_Time ) WHERE P1.Barcode > P2.Barcode GROUP BY P1.Barcode, P2.Barcode ORDER BY COUNT( * ) DESC;"
);
