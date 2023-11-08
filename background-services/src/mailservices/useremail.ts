import express from 'express'
import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../config/sqlConfig'
import { sendMail } from '../helpers/emailHelpers'

dotenv.config()

export const assignedProjectEmail = async () => {
        const pool = await mssql.connect(sqlConfig);
        const projects = (await pool.request().query('SELECT * FROM Projects WHERE isAssigned = 0')).recordset
       
        console.log(projects);
        for (let project of projects){
          let dates = new Date(project.endDate);
          const formattedEndDate = dates.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
          });
            ejs.renderFile('templates/useremail.ejs',{Name:project.AssignedUserName,EndDate:formattedEndDate, detail:project.projectDescription},async(error,data)=>{
                let mailOptions = {
                    from:process.env.EMAIL as string,
                    to:project.AssignedUserEmail,
                    subject:"Check on your project",
                    html:data
                }
                try {
                    await sendMail(mailOptions)
                    await pool.request().query('UPDATE Projects SET isAssigned = 1 WHERE isAssigned  = 0')
                    console.log('Email sent to new users');
                } catch (error) {
                    console.log(error);
                    
                }
        }   )}
   
};
    



