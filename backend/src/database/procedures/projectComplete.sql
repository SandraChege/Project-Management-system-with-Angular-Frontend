-- use projectManagementSystem
-- SELECT * FROM Projects


-- create procedure projectCompleted
-- @projectID VARCHAR(300)
-- as
-- begin
-- update Projects
-- set isCompleted = 1
-- where isCompleted = 0 and projectID = @projectID
-- end

drop PROCEDURE projectCompleted

update Projects
set isCompleted = 0
where isCompleted = 1 and projectID = '1da4856b-edde-47f2-90d4-603913e26b7f'
