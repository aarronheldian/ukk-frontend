import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

const validate = values => {
  const schema = {
    nik: Joi.number()
      .required()
      .min(6)
      .error(() => {
        return {
          message: 'Please fill out this field'
        };
      }),
    username: Joi.string()
      .required()
      .min(6)
      .error(() => {
        return {
          message: 'Please fill out this field'
        };
      }),
    name: Joi.string()
      .required()
      .error(() => {
        return {
          message: 'Please fill out this field'
        };
      }),
    password: Joi.string()
      .required()
      .min(6)
      .regex(/(?=.*[a-zA-Z])(?=.*[0-9])/)
      .error(() => {
        return {
          message: 'Password must be 6 characters and include both numbers and letters'
        };
      })
  };
  return validateInput({ values, schema });
};

export default validate;
