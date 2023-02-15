import Logger from "../loaders/logger.js";

class ServiceFactory {
  constructor(db, entity) {
    this.db = db;
    this.entity = entity;
  }

  getAll = async () => {
    try {
      return await this.db.findAll();
    } catch (error) {
      Logger.error(`[${this.entity.name} Service] Error obteniendo ${this.entity.plural}`, error.message);
      return next(error);
    }
  };

  getById = async id => {
    try {
      return await this.db.findById(id);
    } catch (error) {
      Logger.error(`[${this.entity.name} Service] Error obteniendo ${this.entity.name} con id %s %o`, id, error.message);
      return next(error);
    }
  };

  create = async data => {
    try {
      return await this.db.create(data);
    } catch (error) {
      Logger.error(`[${this.entity.name} Service] Error creando ${this.entity.name} - %o`, error.message);
      return next(error);
    }
  };

  edit = async (id, data) => {
    try {
      return await this.db.edit(id, data);
    } catch (error) {
      Logger.error(`[${this.entity.name} Service] Error editando ${this.entity.singular} - %o`, error.message);
      return next(error);
    }
  };

  deleteOne = async id => {
    try {
      return await this.db.deleteOne(id);
    } catch (error) {
      Logger.error(`[${entity} Service] Error eliminando ${this.entity.name} - %o`, error.message);
      return next(error);
    }
  };
}

export default ServiceFactory;