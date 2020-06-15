/*select customer transactions */
select Total_amount, Transaction.Date_Time, Payment_method from Transaction inner join Performs on Performs.Card_Number = '2222-2222-2222-2222' and Transaction.Date_Time = Performs.Date_Time;
/*select store transactions*/
select Transaction.Total_amount, Transaction.Date_Time, Transaction.Payment_method from ((((Stores inner join Offers on Stores.Store_Id = 5 and Offers.Store_Id = Stores.Store_Id) INNER JOIN Products on Products.Barcode = Offers.Barcode) inner join Contains on Contains.Barcode = Products.Barcode) INNER JOIN Transaction on Contains.Date_Time = Transaction.Date_Time) ;
/*select transaction by date*/
select Total_amount,Date_Time,Payment_method from Transaction where Date_Time = '2020-03-10 15:15:15';
/*select transaction by payment method*/
select Total_amount,Date_Time,Payment_method from Transaction where Payment_method = 1;
/*select transaction by date*/
select Total_amount,Date_Time,Payment_method from Transaction where Date(Date_Time) = '2020-03-10';
/*derived total pieces for contains*/
CREATE VIEW Total_Pieces AS SELECT trans.Date_Time,SUM(cont.Pieces) as Total_Pieces FROM (SELECT Pieces,Date_Time FROM Contains) cont,(SELECT Date_Time FROM Transaction) trans WHERE cont.Date_Time = trans.Date_Time group by trans.Date_Time;
/*select transaction by pieces*/
select * from Transaction inner join Total_Pieces on Total_Pieces.Date_Time = Transaction.Date_Time and Total_Pieces.Total_Pieces = 6;
/*select transaction by total amount*/
select * from Transaction where Total_amount = 1.55;
/*select transaction by category of products*/
select Transaction.Total_amount,Transaction.Date_Time,Transaction.Payment_method from ((((Category inner join Belongs on Category.Category_Id = Belongs.Category_Id and Category.Category_Id=1) inner join Products on Products.Barcode = Belongs.Barcode) inner join Contains on Contains.Barcode = Products.Barcode ) inner join Transaction on Contains.Date_Time = Transaction.Date_Time);
/*customer ages*/
CREATE VIEW Age as SELECT Card_Number, YEAR(CURDATE()) - YEAR(Date_Of_Birth) AS Age FROM Customer;
/*number of transactions per customer*/
select Customer.Card_Number,COUNT(*) as Number_Of_Transactions from ((Customer inner join Performs on Customer.Card_Number = Performs.Card_Number) inner join Transaction on Transaction.Date_Time = Performs.Date_Time) group by Customer.Card_Number;
/*customer top 10 products*/
/*customer how many stores*/
select count(Stores.Store_Id) as Number_Of_Stores from ((((((Customer inner join Performs on Customer.Card_Number = Performs.Card_Number and Customer.Card_Number = '1111-1111-1111-1111') inner join Transaction on Performs.Date_Time = Transaction.Date_Time) inner join Contains on Contains.Date_Time = Transaction.Date_Time ) inner join Products on Contains.Barcode = Products.Barcode) inner join Offers on Offers.Barcode = Products.Barcode) inner join Stores on Stores.Store_Id = Offers.Store_Id);
/*customer what stores*/
select Stores.Store_Id,Stores.Address from ((((((Customer inner join Performs on Customer.Card_Number = Performs.Card_Number and Customer.Card_Number = '1111-1111-1111-1111') inner join Transaction on Performs.Date_Time = Transaction.Date_Time) inner join Contains on Contains.Date_Time = Transaction.Date_Time ) inner join Products on Contains.Barcode = Products.Barcode) inner join Offers on Offers.Barcode = Products.Barcode) inner join Stores on Stores.Store_Id = Offers.Store_Id);

/*customer diagram with hours*/
/*customer mean of transactions per week*/
/*customer mean of transactions per month*/


/*view for customer profiles*/
CREATE VIEW Customer_Profile as SELECT Customer.Name,Customer.Date_Of_Birth,Customer.Points,Customer.Family_Members,Customer.Card_Number,Customer.Phone_Number,Customer.Address,Customer.Pet,Age.Age from Customer inner join Age on Customer.Card_Number = Age.Card_Number;
/*need another view for transactions per category*/

/*how to create index and use it*/
create index store_address on Stores (Address);
select Store_Size from Stores USE INDEX(store_address) where Store_Id=1;
