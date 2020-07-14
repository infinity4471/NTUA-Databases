DELIMITER $$
CREATE TRIGGER update_older_price BEFORE UPDATE ON Products FOR EACH ROW 
BEGIN
	IF NEW.Price <> OLD.Price THEN
		SET @x = (select MAX(Older_Prices.End_Date) FROM Older_Prices JOIN Had ON Had.Start_Date = Older_Prices.Start_Date where Had.Barcode = OLD.Barcode);
		INSERT INTO Older_Prices(Price,Start_Date,End_Date) values (OLD.Price,@x,CURDATE());
		INSERT INTO Had(Barcode,Start_Date) values (NEW.Barcode,@x);
	END IF;
END$$
DELIMITER ;
