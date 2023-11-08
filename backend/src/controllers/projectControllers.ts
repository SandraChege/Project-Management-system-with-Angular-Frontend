import express, { Request, Response } from 'express'
import mssql from 'mssql'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'

import { sqlConfig } from '../config/sqlConfig'
import { projectAssignmentValidationSchema } from '../validators/projectValidators'

// Admin assigns projects
export const assignProject = async (req: Request, res: Response) => {
    try {
        
        let {projectName, projectDescription, endDate, AssignedUserEmail, AssignedUserName } = req.body;

        const { error } = projectAssignmentValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        let projectID = v4();

        const pool = await mssql.connect(sqlConfig);
        const projectDetails = await pool.request()
            .input("projectID", mssql.VarChar, projectID)
            .input("projectName", mssql.VarChar, projectName)
            .input("projectDescription", mssql.VarChar, projectDescription)
            .input("endDate", mssql.VarChar, endDate)
            .input("AssignedUserEmail", mssql.VarChar, AssignedUserEmail)
            .input("AssignedUserName", mssql.VarChar, AssignedUserName)
            .execute("assignProject");

        
        const assignmentResult = projectDetails.recordset[0].AssignmentResult;
        if (assignmentResult === -1) {
            return res.status(400).json({ error: 'User is unavailable' });
        } else if (assignmentResult === -2) {
            return res.status(400).json({ error: 'User does not exist' });
        } else {

            const assignedProjectID = projectDetails.recordset[0].AssignedProjectID;
            return res.status(200).json({
                message: 'Project assigned successfully',
                assignedProjectID,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}


//delete project
export const deleteProject = async (req:Request, res:Response) => {
    try {
        const { deleteID } = req.body;
        
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input("projectID", mssql.VarChar, deleteID)
            .execute("deleteProject");

        if (result.recordset[0].DeletionResult === 1) {
            return res.status(200).json({
                message: "Project deleted successfully."
            });
        }  else {      
                console.log( "Project with the provided ID does not exist");   
            }

    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}


//fetch All projects
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().execute("fetchAllProjects");

        if (result.recordset && result.recordset.length > 0) {
            const projects = result.recordset;
            return res.status(200).json(projects);
        } else {
            return res.status(200).json([]); 
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}


//fetch single project
export const singleProject = async(req:Request,res:Response)=>{
    try {
       const {AssignedUserEmail}=req.body
       const pool = await mssql.connect(sqlConfig)
       const project = await pool.request()
       .input("AssignedUserEmail",mssql.VarChar,AssignedUserEmail)
       .execute("getSingleProject")
       console.log(project);
       
       return res.status(200).json({
        message:"project retrieved successfully"
    })
        
    } catch (error) {
        return res.status(500).json({
            message:error
        })
        
    }
}


// Mark project Completed
export const projectCompleted = async (req: Request, res: Response) => {
    try {
        const { projectID } = req.body;
        const pool = await mssql.connect(sqlConfig);
        const completedProject = await pool.request()
            .input("projectID", mssql.VarChar, projectID)
            .execute("projectCompleted");
        console.log(completedProject);

        // Check if any rows were affected; if so, consider it a success
        if (completedProject.rowsAffected[0] > 0) {
            return res.status(200).json({
                message: "Project updated successfully",
            });
        } else {
            return res.status(404).json({
                message: "Project not found or already completed",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}



//fetchALl Users
export const getAllUsers = async (req:Request, res:Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const allUsers = await pool.request().execute('GetAllUsers'); 
        res.json(allUsers.recordset);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// user updates project status
export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { AssignedUserEmail, NewStatus } = req.body;
        const pool = await mssql.connect(sqlConfig);
        const updateStatus = await pool.request()
            .input("AssignedUserEmail", mssql.VarChar, AssignedUserEmail)
            .input("NewStatus", mssql.VarChar, NewStatus)
            .execute('UpdateProjectStatus');

        if (updateStatus.rowsAffected[0] > 0) {
            return res.json({
                message: "Project status updated successfully"
            });
        } else {
            return res.status(400).json({
                error: "Project status update failed",
                details: "An error occurred while updating the project status."
            });
        }
    } catch (error) {
        console.error('Error updating project status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get project status
export const getProjectStatus = async (req: Request, res: Response) => {
    try {
        const { AssignedUserEmail} = req.body;
        const pool = await mssql.connect(sqlConfig);
        const getStatus = await pool.request()
            .input("AssignedUserEmail", mssql.VarChar, AssignedUserEmail)
            .execute('getProjectStatus');

        if (getStatus.rowsAffected[0] > 0) {
            
            return res.json({
                message: "Project status fetched successfully"
            });
        } else {
            return res.status(400).json({
                error: "Project status fetching failed",
                details: "An error occurred while fetching the project status."
            });
        }
    } catch (error) {
        console.error('Error fetchin project status:', error);
        res.status(500).json({ error: error });
    }
};

