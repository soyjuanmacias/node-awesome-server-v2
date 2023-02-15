import ControllerFactory from "../../factory/controller.factory.js";

class EntitiesController extends ControllerFactory {
  constructor(service, entity) {
    super(service, entity);
    this.service = service;
    this.entity = entity;
  }

  // Reimplementación en la clase hija de la función deleteOne, sobreescribiendo la del padre.
  // No se está usando nunca este método.
  deleteOne = async id => {
    try {
      return {
        message: `Esto es un código de ejemplo como plantilla - Rocket418`,
        error: false,
      };
    } catch (error) {
      Logger.error(`[${entity} DB Data Layer] Error eliminando ${genre} ${collectionName} con id %s - %o`, id, error);
      return error;
    }
  };
}

export default EntitiesController;
