# node_basic_crud_mssql
store 
```
USE [basic_crud]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[manage_customer] 
	-- set parameters for store
	@customer_id INT,
	@customer_firstname NVARCHAR(50),
	@customer_lastname NVARCHAR(50),
	@customer_sex INT, -- 0 = man, 1 = female
	@customer_tel NVARCHAR(50),
	@customer_email NVARCHAR(255)
AS
BEGIN
	SET NOCOUNT ON;
	IF @customer_id = 0
		BEGIN
			IF EXISTS (SELECT * FROM dbo.customer WHERE (SELECT CONCAT(customer_firstname, ' ', customer_lastname)) = (SELECT CONCAT(@customer_firstname, ' ', @customer_lastname)))
				BEGIN
					SELECT 0
				END
			ELSE
				BEGIN
					BEGIN TRANSACTION
					-- insert statements for store
					INSERT INTO dbo.customer (customer_firstname, customer_lastname, customer_sex, customer_tel, customer_email)
					VALUES (@customer_firstname, @customer_lastname, @customer_sex, @customer_tel, @customer_email)
					IF @@ERROR > 0
						BEGIN
							ROLLBACK TRAN
							SELECT -2
						END
					ELSE
						BEGIN
							SELECT @@IDENTITY AS IDENTITY_ID
							COMMIT TRAN
						END
					END
				END
	ELSE
		BEGIN
			BEGIN TRANSACTION
      			-- update statements for store
			UPDATE dbo.customer
			SET	customer_firstname = @customer_firstname,
				customer_lastname = @customer_lastname,
				customer_sex = @customer_sex,
				@customer_tel = @customer_tel,
				customer_email = @customer_email
			WHERE customer_id = @customer_id
			IF @@ERROR > 0
				BEGIN
					ROLLBACK TRAN
					SELECT -2
				END
			ELSE
				BEGIN
					SELECT @customer_id AS IDENTITY_ID
					COMMIT TRAN
				END
			END
END
```
