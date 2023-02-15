import bcrypt from 'bcrypt';
import events from '../../events/index.js';
import Logger from '../../loaders/logger.js';
import ErrorApi from '../../services/error.service.js';

class AuthService {
  constructor(db) {
    this.db = db;
  }

  registerUser = async ({ done, ...user }) => {
    try {
      Logger.info('[Solicitud de Registro] email -> %o', user.email);
      const userDB = await this.db.findByEmail(user.email);

      if (userDB instanceof Error) return done(userDB);

      if (userDB) {
        Logger.error('[Registro Fallido] El usuario %o ya existe', user.email);
        const error = ErrorApi(404, 'El usuario ya existe');
        return done(error);
      }

      const saltRounds = 10;
      const encryptedPassword = await bcrypt.hash(user.password, saltRounds);

      const created = await this.db.createUser({ ...user, password: encryptedPassword, role: 'agent' });
      Reflect.deleteProperty(created, 'password');
      Reflect.deleteProperty(created, 'salt');
      Logger.info('[Registro Correcto] Se ha registrado al usuario %o en DB', created.email);
      events.user.register.emit(created);
      return done(null, created, true);
    } catch (error) {
      Logger.error('Error registrando el usuario, %o', error);
      return error;
    }
  };

  loginUser = async ({ done, ...user }) => {
    try {
      Logger.info('[Solicitud de Login] email -> %o', user.email);
      let userDB = await this.db.findByEmailWithPass(user.email);

      if (!userDB) {
        Logger.error('[Login Fallido] El usuario %o no existe', user.email);
        const error = new ErrorApi(400, 'Datos de acceso incorrectos');
        return done(error);
      }

      if (userDB instanceof Error) return done(userDB);

      const isValidUserPassword = await bcrypt.compare(user.password, userDB.password);

      if (!isValidUserPassword) {
        Logger.error('[Login Fallido] Contraseña incorrecta para el usuario %o', user.email);
        const error = new ErrorApi(400, 'Datos de acceso incorrectos');
        return done(error);
      }
      const edited = userDB.toObject();
      Reflect.deleteProperty(edited, 'password');
      Reflect.deleteProperty(edited, 'salt');
      Logger.info('[Login Correcto] email -> %o', edited.email);
      events.user.login.emit(edited);
      return done(null, edited);
    } catch (error) {
      Logger.error('Error logueando el usuario, %o', error);
      return done(error);
    }
  };

  getUserById = async id => {
    try {
      return await this.db.findById(id);
    } catch (error) {
      Logger.error('Error obteniendo el usuario, %o', error);
      return error;
    }
  };
}

export default AuthService;
