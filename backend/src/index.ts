import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import user_router from './routes/userRoutes'
import project_router from './routes/projectRoutes'



dotenv.config()
const port = process.env.PORT || 4600
const app = express()
app.use(json())
app.use(cors())


app.use('/user',user_router)
app.use('/project',project_router)



app.listen(port,()=>{
    console.log(`Project management running on port ${port}`);
    
});