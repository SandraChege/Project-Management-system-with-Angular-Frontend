-- use projectManagementSystem
create procedure getSingleProject
@AssignedUserEmail VARCHAR(250)
AS
BEGIN
    select * from Projects
where AssignedUserEmail = @AssignedUserEmail
END