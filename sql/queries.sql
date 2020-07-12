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
/*select transaction by pieces*/
select * from Transaction inner join Total_Pieces on Total_Pieces.Date_Time = Transaction.Date_Time and Total_Pieces.Total_Pieces = 6;
/*select transaction by total amount*/
select * from Transaction where Total_amount = 1.55;
/*select transaction by category of products*/
select Transaction.Total_amount,Transaction.Date_Time,Transaction.Payment_method from ((((Category inner join Belongs on Category.Category_Id = Belongs.Category_Id and Category.Category_Id=1) inner join Products on Products.Barcode = Belongs.Barcode) inner join Contains on Contains.Barcode = Products.Barcode ) inner join Transaction on Contains.Date_Time = Transaction.Date_Time);
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

/*need another view for transactions per category*/

/*how to create index and use it*/

/* top 10 products bought by specific customer nigga */
select Products.Brand_Name, COUNT( Products.Barcode ) from Products inner join Contains on Products.Barcode = Contains.Barcode inner join Transaction on Transaction.Date_Time = Contains.Date_Time inner join Performs on Performs.Date_Time = Transaction.Date_Time inner join Customer on Customer.Card_Number = Performs.Card_Number where Customer.Card_Number = '1111-1111-1111-1111' group by Products.Barcode order by COUNT( Products.Barcode ) DESC LIMIT 10;

/* top alley-shelf position for a store*/
select Offers.Alley_Number,Offers.Shelf_Number from Stores inner join Offers on Stores.Store_Id = Offers.Store_Id inner join Products on Offers.Barcode = Products.Barcode inner join Contains on Products.Barcode = Contains.Barcode inner join Transaction on Transaction.Date_Time = Contains.Date_Time inner join Performs on Performs.Date_Time = Transaction.Date_Time where Stores.Store_Id = 1 group by Offers.Alley_Number, Offers.Shelf_Number order by COUNT(*) DESC;

/*hours crazy time*/
 SELECT HOUR( Transaction.Date_Time ), ROUND( SUM( Transaction.Total_amount ), 2 ) FROM Transaction INNER JOIN Performs ON Transaction.Date_Time = Performs.Date_Time INNER JOIN Customer ON Customer.Card_Number = Performs.Card_Number group by HOUR( Transaction.Date_Time ) order by SUM( Transaction.Total_amount ) DESC;

/*hours usually customer going crazy */
SELECT HOUR( Transaction.Date_Time ), COUNT( Transaction.Date_Time ) from Transaction INNER JOIN Performs on Transaction.Date_Time = Performs.Date_Time INNER JOIN Customer ON Customer.Card_Number = Performs.Card_Number group by HOUR( Transaction.Date_Time ) ;

/*average over month for transactions*/
SELECT ROUND( AVG( Transaction.Total_amount ), 2 ), MONTH( Transaction.Date_Time ) from Transaction INNER JOIN Performs on Transaction.Date_Time = Performs.Date_Time INNER JOIN Customer ON Customer.Card_Number = Performs.Card_Number group by MONTH( Transaction.Date_Time ) ;
