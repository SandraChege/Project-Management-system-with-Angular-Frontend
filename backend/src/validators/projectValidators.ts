import joi from 'joi';

export const projectAssignmentValidationSchema = joi.object({
    projectName:joi.string().required().min(2).max(30),
    endDate: joi.date().required().min(new Date()),
    projectDescription:joi.string(),
    AssignedUserEmail:joi.string().email({
        minDomainSegments:2,tlds : {
            allow :['ke','com']

        }
    }),
    
    AssignedUserName:joi.string().required().min(2).max(30),

});

