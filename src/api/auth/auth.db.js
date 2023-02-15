import Logger from "../../loaders/logger.js";

class AuthDb {
  constructor(model) {
    this.model = model;
  };

  findById = async id => {
    try {
      return await this.model.findById(id).lean();
    } catch (error) {
      Logger.error('Error obteniendo el usuario %o', error);
      Logger.error('Error obteniendo el usuario', id);
      return null;
    }
  };

  findByEmailWithPass = async email => {
    try {
      return await this.model.findOne({ email }).select('+password');
    } catch (error) {
      Logger.error('Error obteniendo el usuario', email);
      return error;
    }
  };

  findByEmail = async email => {
    try {
      return await this.model.findOne({ email }).lean();
    } catch (error) {
      Logger.error('Error obteniendo el usuario', error.message);
      return error;
    }
  };

  createUser = async data => {
    try {
      const newDocument = new this.model(data);
      const created = await newDocument.save();
      return created.toJSON();
    } catch (error) {
      Logger.error('Error creando el usuario %o', error);
      return error;
    }
  };
}

export default AuthDb;