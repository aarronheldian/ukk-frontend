import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

const validate = values => {
  const schema = {
    username: Joi.string()
      .required()
      .min(6)
      .error(() => {
        return {
          message: 'Please fill Username correctly'
        };
      }),
    password: Joi.string()
      .required()
      .min(6)
      .regex(/(?=.*[a-zA-Z])(?=.*[0-9])/)
      .error(() => {
        return {
          message: 'Please fill Password correctly'
        };
      })
  };
  return validateInput({ values, schema });
};

export default validate;
