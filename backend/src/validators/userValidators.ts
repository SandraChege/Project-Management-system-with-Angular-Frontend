import joi from 'joi';

export const userRegisterValidationSchema = joi.object({
    userName:joi.string().required().min(2).max(30),
    email:joi.string().email({
        minDomainSegments:2,tlds : {
            allow :['ke','com']

        }
    }),
    phone_no:joi.string().required().min(10).max(10),
    password:joi.string().required().pattern(
        new RegExp ('^[a-zA-Z0-9!@#%$&*()]{0,30}$')
    )

});

export const userLoginValidationSchema = joi.object({
    email:joi.string().email({
        minDomainSegments:2,tlds : {
            allow :['ke','com']

        }
    }),
    password:joi.string().required().pattern(
        new RegExp ('^[a-zA-Z0-9!@#%$&*()]{0,30}$')
    )

});