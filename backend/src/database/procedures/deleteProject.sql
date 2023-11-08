-- use projectManagementSystem
-- drop procedure deleteProject
-- select * from Projects
-- CREATE PROCEDURE deleteProject
    -- @projectID VARCHAR(1000)  
-- AS
-- BEGIN
       
--         IF EXISTS (
--             SELECT 1
--             FROM Projects
--             WHERE projectID = @projectID
--         )
--         BEGIN
            
--             DELETE FROM Projects
--             WHERE projectID = @projectID;

--             SELECT 1 AS DeletionResult; 
--         END
--         ELSE
--         BEGIN
--             SELECT -2 AS DeletionResult; 
--         END
-- END

