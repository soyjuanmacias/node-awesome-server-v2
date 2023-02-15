import { Joi } from 'celebrate';
import { validateBody } from './index.js';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/;

/**
 * Se definen las propiedades que se van a validar
 */
const name = Joi.string();
const date = Joi.date();
const sent = Joi.number();
const received = Joi.number();
const opened = Joi.number();
const template = Joi.string();
const users = Joi.array().items(Joi.string());

/**
 * Middlewares de validación para cada una de las rutas
 * @returns celebrate middleware with validation rules
 */
const validateCommunication = () => validateBody({ name, date, sent, received, opened, template, users });

export { validateCommunication };
