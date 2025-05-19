const Joi = require("joi");

exports.visitorValidation = (body) => {
  const schema = Joi.object({
    ip: Joi.string().required(),
    os: Joi.string().allow(null, ""),
    device: Joi.string().allow(null, ""),
    browser: Joi.string().allow(null, ""),
    registration_date: Joi.date().default(Date.now),
  });

  return schema.validate(body, { abortEarly: false });
};
