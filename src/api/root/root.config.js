import { Schema, model } from 'mongoose';
import { RoutesFactory } from '../../factory/index.js';

// modify scheme and routes to your duplicated folder
import schema from './root.model.js';
import routes from './root.routes.js';

const schemaConfig = {
  timestamps: true,
}

// modify object values to new entity name
const entity = {
  name: 'Root',
  mongoName: 'todos',
  plural: 'todos los todos',
  singular: 'el todo',
};


// const Model = model(entity.mongoName, new Schema(schema, schemaConfig));
// const Db = new DbFactory(Model, entity);
// const Service = new ServiceFactory(Db, entity);
// const Controller = new ControllerFactory(Service, entity);

export default RoutesFactory(routes);