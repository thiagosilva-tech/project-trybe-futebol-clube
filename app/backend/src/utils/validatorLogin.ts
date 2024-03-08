import Joi = require('joi');

function validatorEmail(email: string) {
  const emailSchema = Joi.string().email().lowercase();

  const { error } = emailSchema.validate(email);

  if (error) return false;

  return true;
}

function validatorPassword(password: string) {
  const passwordSchema = Joi.string().min(6);

  const { error } = passwordSchema.validate(password);

  if (error) return false;

  return true;
}

export default { validatorEmail, validatorPassword };
