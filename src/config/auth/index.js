import passport from 'passport';
import registerStrategy from './register.strategy.js';
import loginStrategy from './login.strategy.js';
import Logger from '../../loaders/logger.js';
import { authService } from '../../api/auth/auth.config.js';
import ErrorApi from '../../services/error.service.js';

/**
 *
 * @param {*} req Viene proporcionado por el controlador user.controller.js Necesario para el req.logIn
 * @param {*} res Viene proporcionado por el controlador user.controller.js Necesario para dar respuesta al usuario
 * @returns
 */
export const doneFn = (req, res, next) => (error, user, isRegister) => {
  if (error) return next(error || new ErrorApi(400, 'Error en la autenticación'));
  if (isRegister) return res.status(201).json(user);
  
  req.logIn(user, error => {
    if (error) return next(error);
    return res.status(200).json(user);
  });
};

/**
 * Middleware para el manejo de sesiones de passport
 */
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    done(null, await authService.getUserById(id));
  } catch (error) {
    Logger.error('Error en deserializeUser %o', error);
    return done(error);
  }
});

const config = () => {
  try {
    passport.use('login', loginStrategy);
    passport.use('register', registerStrategy);
    Logger.info('Passport configurado correctamente');
  } catch (error) {
    Logger.error('Error en la configuración de passport %o', error);
  }
};

export default { config };
