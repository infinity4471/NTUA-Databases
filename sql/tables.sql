DROP DATABASE IF EXISTS TSUPEMAKI;
CREATE DATABASE IF NOT EXISTS TSUPEMAKI;

USE TSUPEMAKI;

CREATE TABLE Category (
    Category_Id INT NOT NULL AUTO_INCREMENT,
    Name varchar( 255 ) NOT NULL,
    PRIMARY KEY( Category_Id )
) ENGINE=INNODB;

CREATE TABLE Products (
    Barcode varchar( 6 ) NOT NULL,
    Price DOUBLE NOT NULL,
    Name varchar( 255 ) NOT NULL,
    Brand_Name varchar( 255 ) NOT NULL,
    First_Transaction DATETIME NOT NULL,
    PRIMARY KEY (Barcode)
) ENGINE=INNODB;

CREATE TABLE Older_Prices (
    Price DOUBLE NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE NOT NULL,
    PRIMARY KEY (Start_Date)
) ENGINE=INNODB;

CREATE TABLE Customer (
    Name varchar( 255 ) NOT NULL,
    Date_Of_Birth DATE NOT NULL,
    Points INT NOT NULL,
    Family_Members INT NOT NULL,
    Card_Number varchar( 19 ) NOT NULL,
    Phone_Number varchar( 10 ) NOT NULL,
    Street varchar( 255 ) NOT NULL,
    Street_Number varchar( 2 ) NOT NULL,
    Postal_Code varchar( 5 ) NOT NULL,
    City varchar( 255 ) NOT NULL,
    Pet boolean NOT NULL,
    Address varchar( 255 ) AS ( CONCAT( Street, " ", Street_Number, ", ", Postal_Code, " ", City ) ),
    PRIMARY KEY( Card_Number )
) ENGINE=INNODB;

CREATE TABLE Transaction (
    Total_amount DOUBLE NOT NULL,
    Date_Time DATETIME NOT NULL,
    Payment_method boolean NOT NULL, /*false means cash true means credit*/
    PRIMARY KEY( Date_Time )
) ENGINE=INNODB;

CREATE TABLE Stores (
    Store_Id INT NOT NULL AUTO_INCREMENT,
    Store_Size INT NOT NULL,
    Street varchar( 255 ) NOT NULL,
    Operating_Hours varchar( 255 ) NOT NULL,
    Street_Number varchar( 255 ) NOT NULL,
    Postal_Code varchar( 5 ) NOT NULL,
    City varchar( 255 ) NOT NULL,
    Address varchar( 255 ) AS ( CONCAT( Street, " ", Street_Number, ", ", Postal_Code, " ", City ) ),
    PRIMARY KEY( Store_Id )
) ENGINE = INNODB;

CREATE TABLE Provides (
    Store_Id INT NOT NULL,
    Category_Id INT NOT NULL,
    PRIMARY KEY( Store_Id, Category_Id ),
    FOREIGN KEY (Store_Id) REFERENCES Stores(Store_Id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Offers (
    Barcode varchar( 6 ) NOT NULL,
    Store_Id INT NOT NULL,
    Alley_Number INT NOT NULL,
    Shelf_Number INT NOT NULL,
    PRIMARY KEY (Barcode, Store_Id ),
    FOREIGN KEY (Barcode) REFERENCES Products(Barcode) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Store_Id) REFERENCES Stores(Store_Id ) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Had (
    Start_Date DATE NOT NULL,
    Barcode varchar( 6 ) NOT NULL,
    PRIMARY KEY (Barcode, Start_Date),
    FOREIGN KEY (Barcode) REFERENCES Products(Barcode) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Start_Date) REFERENCES Older_Prices(Start_Date) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Belongs (
    Category_Id INT NOT NULL,
    Barcode varchar( 6 ) NOT NULL,
    PRIMARY KEY( Barcode, Category_Id ),
    FOREIGN KEY (Barcode) REFERENCES Products(Barcode) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Contains (
    Barcode varchar( 6 ) NOT NULL,
    Date_Time DATETIME NOT NULL,
    Pieces INT NOT NULL,
    PRIMARY KEY (Date_Time,Barcode,Pieces),
    FOREIGN KEY (Barcode) REFERENCES Products(Barcode) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Date_Time) REFERENCES Transaction(Date_Time) ON UPDATE CASCADE ON DELETE CASCADE 
);

CREATE TABLE Performs (
    Date_Time DATETIME NOT NULL,
    Card_Number varchar( 19 ) NOT NULL,
    PRIMARY KEY ( Card_Number, Date_Time ),
    FOREIGN KEY (Date_Time) REFERENCES Transaction(Date_Time) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Card_Number) REFERENCES Customer(Card_Number) ON UPDATE CASCADE ON DELETE CASCADE  
);

CREATE TABLE StorePhones (
    Store_Id INT NOT NULL,
    Phone_Number BIGINT NOT NULL,
    FOREIGN KEY (Store_Id) REFERENCES Stores(Store_Id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (Store_Id,Phone_Number)
);

/*Products stuff*/
/*Gotta add more*/
/*Belongs stuff*/
/*Provides Stuff*/
/*Offers stuff*/
/*Do older prices*/
/*Customer Stuff*/
/*Transaction stuff*/
/*add more stuff*/
/*fix total price to match bought products*/

/*Contains stuff*/

/*Performs stuff*/

/*Older Prices stuff*/

/*Had stuff*/

/*Age(ok) and Total Pieces(not ok)*/
SELECT cont.Pieces as Total_Pieces FROM (SELECT Pieces,Date_Time FROM Contains) cont,(SELECT Date_Time FROM Transaction) trans WHERE cont.Date_Time = trans.Date_Time;
SELECT *, YEAR(CURDATE()) - YEAR(Date_Of_Birth) AS Age FROM Customer;
