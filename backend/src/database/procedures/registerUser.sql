-- use projectManagementSystem
CREATE OR ALTER PROCEDURE registerUser(
    @userID varchar(100),
    @userName varchar(200),
    @email VARCHAR(300),
    @phone_no varchar(200),
    @password VARCHAR(200)
)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Users WHERE email = @email)
    BEGIN
        INSERT INTO Users (userID, userName, email, phone_no, password)
        VALUES (@userID, @userName, @email, @phone_no,  @password)
    END
    ELSE
    BEGIN
        PRINT 'Email already exists. User not registered.'
    END
END



