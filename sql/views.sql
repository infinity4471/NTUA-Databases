CREATE VIEW Total_Pieces AS SELECT trans.Date_Time,SUM(cont.Pieces) as Total_Pieces FROM (SELECT Pieces,Date_Time FROM Contains) cont,(SELECT Date_Time FROM Transaction) trans WHERE cont.Date_Time = trans.Date_Time group by trans.Date_Time;

CREATE VIEW Age as SELECT Card_Number, YEAR(CURDATE()) - YEAR(Date_Of_Birth) AS Age FROM Customer;

CREATE VIEW Customer_Profile as SELECT Customer.Name,Customer.Date_Of_Birth,Customer.Points,Customer.Family_Members,Customer.Card_Number,Customer.Phone_Number,Customer.Address,Customer.Pet,Age.Age from Customer inner join Age on Customer.Card_Number = Age.Card_Number;

CREATE VIEW Sellings_Per_Store_And_Category AS select Transaction.Total_amount,Transaction.Date_Time,Transaction.Payment_method,Category.Category_Id,Stores.Store_Id, COUNT( * ) AS Total_Sells from Stores inner join Provides on Provides.Store_Id = Stores.Store_Id inner join Category on Category.Category_Id = Provides.Category_Id inner join Belongs on Category.Category_Id = Belongs.Category_Id inner join Products on Products.Barcode = Belongs.Barcode inner join Contains on Contains.Barcode = Products.Barcode inner join Transaction on Contains.Date_Time = Transaction.Date_Time GROUP BY Stores.Store_Id, Category.Category_id;

