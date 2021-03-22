import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

const validate = values => {
  const schema = {
    title: Joi.string()
      .required()
      .error(() => {
        return {
          message: 'Judul Wajib di Isi'
        };
      }),
    description: Joi.string()
      .required()
      .error(() => {
        return {
          message: 'Deskripsi Wajib di Isi'
        };
      })
  };
  return validateInput({ values, schema });
};

export default validate;
