-- use projectManagementSystem
-- select * from Users

CREATE or alter PROCEDURE GetAllUsers
AS
BEGIN
    SELECT userName, Email
    FROM Users
    WHERE role = 'employee';
END;

exec GetAllUsers