import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern( 
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$"
      )
    )
    .required(),
});

export const activateUserSchema = Joi.object({
  activation_code: Joi.string().min(4).max(4).required().messages({
    "string.empty": "Activation code is required",
  }),
  activation_token: Joi.string().required().messages({
    "string.empty": "Activation Token is required",
  }),
});


export const loginUserSchema = Joi.object({
  email:Joi.string().email(),
  password: Joi.string().required()
}); 

