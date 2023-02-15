import { Schema, model } from 'mongoose';
import * as factory from '../../factory/index.js';

// modify scheme and routes to your duplicated folder
import schema from './todos.model.js';
import routes from './todos.routes.js';

const schemaConfig = {
  timestamps: true,
}

// modify object values to new entity name
const entity = {
  name: 'Todo',
  mongoName: 'todos',
  plural: 'todos los todos',
  singular: 'el todo',
};


const Model = model(entity.mongoName, new Schema(schema, schemaConfig));
const Db = new factory.DbFactory(Model, entity);
const Service = new factory.ServiceFactory(Db, entity);
const Controller = new factory.ControllerFactory(Service, entity);

export default factory.RoutesFactory(routes, Controller);