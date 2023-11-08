import Router from "express";
import { assignProject, deleteProject, getAllProjects, getAllUsers, getProjectStatus, projectCompleted, singleProject, updateStatus } from "../controllers/projectControllers";



const project_router = Router()

project_router.post('/assignProject',assignProject)
project_router.delete('/deleteProject',deleteProject)
project_router.get('/',getAllProjects)
project_router.get('/singleProject',singleProject)
project_router.post('/updateProject',projectCompleted)
project_router.get('/getUsers',getAllUsers)
project_router.post('/projectStatus',updateStatus)
project_router.get('/getStatus',getProjectStatus)


export default project_router