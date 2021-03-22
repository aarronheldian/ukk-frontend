import Joi from 'joi-browser';
import validateInput from '../../../utils/validateInput';

const validate = values => {
  const schema = {
    note: Joi.string()
      .required()
      .error(() => {
        return {
          message: 'Alasan Wajib di Isi'
        };
      }),
  };
  return validateInput({ values, schema });
};

export default validate;
