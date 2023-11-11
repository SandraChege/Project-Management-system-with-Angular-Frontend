-- use projectManagementSystem
-- select * from Projects
-- CREATE TABLE Projects (
--     projectID VARCHAR(300) PRIMARY KEY,
--     projectName VARCHAR(250),
--     projectDescription VARCHAR(500),
--     endDate DATE,
--     AssignedUserEmail VARCHAR(250) UNIQUE,
--     AssignedUserName VARCHAR(250),
--     createdDateTime DATETIME DEFAULT GETDATE(),
--     isCompleted BIT DEFAULT 0,
--      projectStatus varchar(250) DEFAULT 'pending',
-- )
SELECT * FROM Projects
ALTER TABLE Projects
ADD isAssigned BIT DEFAULT 0;


-- UPDATE Projects
-- SET projectStatus = 'pending'
-- WHERE projectStatus IS NULL;


alter table Projects
drop COLUMN projectStatus

ALTER TABLE Projects DROP CONSTRAINT [DF__Projects__projec__19AACF41];








-- drop table Projects
-- projectID
-- projectName
-- projectDescription
-- endDate
-- AssignedUserID
-- AssignedUser

-- drop table Projects