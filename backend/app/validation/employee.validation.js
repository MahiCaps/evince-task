const Joi = require("joi");

const createEmployeeValidation = Joi.object({
  name: Joi.string().min(2).max(128).required(),
  email: Joi.string().email().required(),
  employeeId: Joi.string().alphanum().length(10).required(),
  mobileNumber: Joi.string()
    .pattern(/^\+91[6-9]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Please enter a valid Indian mobile number starting with +91",
    }),
  gender: Joi.string().valid("male", "female", "other").required(),
  age: Joi.number().integer().min(18).max(60).required(),
  anotherMobileNumber: Joi.string()
    .allow("")
    .pattern(/^\+91[6-9]\d{9}$/),
});

const updateEmployeeValidation = Joi.object({
  name: Joi.string().min(2).max(128).empty(""),
  email: Joi.string().email().empty(""),
  employeeId: Joi.string().alphanum().length(10).empty(""),
  mobileNumber: Joi.string()
    .pattern(/^\+91[6-9]\d{9}$/)
    .empty("")
    .messages({
      "string.pattern.base":
        "Please enter a valid Indian mobile number starting with +91",
    }),
  gender: Joi.string().valid("male", "female", "other").required(),
  age: Joi.number().integer().min(18).max(60).empty(""),
  anotherMobileNumber: Joi.string()
    .allow("")
    .pattern(/^\+91[6-9]\d{9}$/),
});

module.exports = {
  "/api/employee/": createEmployeeValidation,
  "/api/employee/:id": updateEmployeeValidation,
};
