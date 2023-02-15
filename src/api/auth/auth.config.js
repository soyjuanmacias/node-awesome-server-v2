import { Schema, model } from 'mongoose';
import RoutesFactory from '../../factory/routes.factory.js';


import AuthDb from './auth.db.js';
import AuthService from './auth.service.js';
import AuthController from './auth.controller.js';

// modify scheme and routes to your duplicated folder
import schema from './auth.model.js';
import routes from './auth.routes.js';

const schemaConfig = {
  timestamps: true,
};

// modify object values to new entity name
const entity = {
  name: 'User',
  mongoName: 'users',
  plural: 'todos los usuarios',
  singular: 'el usuario',
};

const authSchema = new Schema(schema, schemaConfig)

authSchema.virtual('fullName').get(function () { return `${this.name} ${this.lastName}` });
authSchema.pre('save', function (next) {
  this.increment();
  return next();
});

export const Model = model(entity.mongoName, authSchema);
const Db = new AuthDb(Model, entity);
export const authService = new AuthService(Db, entity);
const Controller = new AuthController();

export default RoutesFactory(routes, Controller);
