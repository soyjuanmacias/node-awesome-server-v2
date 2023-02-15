import { Joi } from 'celebrate';
import { validateBody } from './index.js';

/**
 * Se definen las propiedades que se van a validar
 */
const name = Joi.string();
const nameRequired = Joi.string().required();
const type = Joi.string();
const typeRequired = Joi.string().required();
const web = Joi.string();
const webRequired = Joi.string().required();
const contacts = Joi.array();
const contactsRequired = Joi.array().required();
const mainContactRequired = Joi.number().required();
const editedBy = Joi.string();
const createdByRequired = Joi.string().required();
const photoUrl = Joi.string();

/**
 * Middlewares de validación para cada una de las rutas
 * @returns celebrate middleware with validation rules
 */
const validateCreateEntity = () =>
  validateBody({
    name: nameRequired,
    type: typeRequired,
    web: webRequired,
    contacts: contactsRequired,
    createdBy: createdByRequired,
    mainContact: mainContactRequired,
    photoUrl,
  });

const validateEditEntity = () => validateBody({ name, type, web, contacts, editedBy, photoUrl });

export { validateCreateEntity, validateEditEntity };
