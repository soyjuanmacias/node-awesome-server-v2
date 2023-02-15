import Logger from '../loaders/logger.js';
import ErrorApi from '../services/error.service.js';

class ControllerFactory {
  constructor(service, entity) {
    this.service = service;
    this.entity = entity;
  }

  getAll = async (req, res, next) => {
    try {
      const allItems = await this.service.getAll();
      return res.status(200).json(allItems);
    } catch (error) {
      Logger.error(`[${this.entity.name} Controller] Error obteniendo ${this.entity.plural}`, error.message);
      return next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);

      return item ? res.status(200).json(item) : next(new ErrorApi(400, `No se encuentra ${this.entity.name} con esa ID`));
    } catch (error) {
      Logger.error(`[${this.entity.name} Controller] Error obteniendo ${this.entity.name} con id %s %o`, id, error.message);
      return next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const { body } = req;
      const created = await this.service.create(body);

      return created ? res.status(201).json(created) : next(new ErrorApi(400, `No se ha podido crear ${this.entity.singular}`));
    } catch (error) {
      Logger.error(`[${this.entity.name} Controller] Error creando ${this.entity.name} - %o`, error.message);
      return next(error);
    }
  };

  edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      if (body.password) delete body.password;
      if (body.email) delete body.email;
      const edited = await this.service.edit(id, body);

      return edited ? res.status(200).json(edited) : next(new ErrorApi(400, 'No existe el elemento con esa ID'));
    } catch (error) {
      Logger.error(`[${this.entity.name} Controller] Error editando ${this.entity.singular} - %o`, error.message);
      return next(error);
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.deleteOne(id);

      return deleted
        ? res.status(200).json(`Eliminado ${this.entity.name} correctamente`)
        : next(new ErrorApi(400, `No se encuentra ${this.entity.name} con esa ID`));
    } catch (error) {
      Logger.error(`[${entity} Controller] Error eliminando ${this.entity.name} - %o`, error.message);
      return next(error);
    }
  };
}

export default ControllerFactory;