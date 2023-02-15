import ServiceFactory from "../../factory/service.factory.js";

class EntitiesService extends ServiceFactory {
  constructor(db, entity) {
    super(db, entity);
    this.db = db;
    this.entity = entity;
  }

  // Reimplementación en la clase hija de la función deleteOne, sobreescribiendo la del padre.
  deleteOne = async id => {
    try {
      return {
        message: `Esto es un código de ejemplo como plantilla - Rocket418`,
      }
    } catch (error) {
      Logger.error(`[${entity} Service] Error eliminando ${this.entity.name} - %o`, error);
      return next(error);
    }
  };
}

export default EntitiesService;