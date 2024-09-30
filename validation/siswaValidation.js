const Joi = require("joi");

const siswaValidation = (data) => {
  const schema = Joi.object({
    nim: Joi.string().required(),
    namaLengkap: Joi.string().min(3).required(),
    kelas: Joi.string().required(),
    alamat: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = { siswaValidation };
