import Logger from "../loaders/logger.js";

class DbFactory {
  constructor(model, entity) {
    this.model = model;
    this.entity = entity;
  }
  
  findAll = async () => {
    try {
      return await this.model.find().lean();
    } catch (error) {
      Logger.error(`[${this.entity.name} DB] Error buscando ${this.entity.name} en DB`, error.message);
      return error;
    }
  };

  findById = async id => {
    try {
      return await this.model.findById(id).lean();
    } catch (error) {
      Logger.error(`[${this.entity.name} DB] Error obteniendo ${this.entity.name} con id %s %o`, id, error.message);
      return error;
    }
  };

  create = async data => {
    try {
      const newDocument = new this.model(data);
      const created = await newDocument.save();
      return created.toJSON();
    } catch (error) {
      Logger.error(`[${this.entity.name} DB] Error creando ${this.entity.name} - %o`, error.message);
      return error;
    }
  };

  edit = async (id, data) => {
    try {
      const filter = { _id: id };
      const update = { $set: { ...data } };
      const options = { new: true };
      return await this.model.findOneAndUpdate(filter, update, options);
    } catch (error) {
      Logger.error(`[${this.entity.name} DB] Error editando ${this.entity.singular} - %o`, error.message);
      return error;
    }
  };

  deleteOne = async id => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
       Logger.error(`[${entity} DB] Error eliminando ${this.entity.name} - %o`, error.message);
      return error;
    }
  };
}

export default DbFactory;