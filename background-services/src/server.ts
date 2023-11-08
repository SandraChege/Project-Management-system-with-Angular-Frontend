import express from 'express'
import cron from 'node-cron'
import { welcomeUser } from './mailservices/welcomeUser';
import { assignedProjectEmail } from './mailservices/useremail';



const app = express();
const run = async()=>{
   
    cron.schedule('*/10 * * * * *', () => {
        console.log('check new user');
         welcomeUser();
         assignedProjectEmail();
         
    });

}
run()

app.listen(4400,async ()=>{
    console.log("mail server running on port 4400");

})