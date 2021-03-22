import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

const validate = values => {
  const schema = {
    username: Joi.string()
      .required()
      .min(6)
      .error(() => {
        return {
          message: 'Masukan Username dengan benar'
        };
      }),
    name: Joi.string()
      .required()
      .error(() => {
        return {
          message: 'Name wajib diisi'
        };
      }),
    telp: Joi.number()
      .required()
      .error(() => {
        return {
          message: 'No Telp wajib diisi'
        };
      }),
    password: Joi.string()
      .min(6)
      .regex(/(?=.*[a-zA-Z])(?=.*[0-9])/)
      .error(() => {
        return {
          message: 'Password minimal 6 karatakter huruf dan angka'
        };
      })
  };
  return validateInput({ values, schema });
};

export default validate;
