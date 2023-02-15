import passport from "passport";
import { doneFn } from "../../config/auth/index.js";
import ErrorApi from "../../services/error.service.js";

class AuthController {
  status = (req, res, next) => res.status(200).json('[API] Auth routes working');

  session = (req, res, next) => {
    if (req.user) {
      return res.status(200).json(req.user);
    }
    const error = new ErrorApi(400, 'No se han podido verificar las credenciales del usuario. Por favor, inicie sesión de nuevo');
    return next(error);
  }

  login = (req, res, next) => {
    passport.authenticate('login', doneFn(req, res, next))(req);
  };

  register = (req, res, next) => {
    passport.authenticate('register', doneFn(req, res, next))(req);
  };

  logout = async (req, res, next) => {
    try {
      if (req.user) {
        req.logout();

        req.session.destroy(() => {
          res.clearCookie('connect.sid');

          return res.status(200).json('Deslogueado correctamente');
        });
      } else {
        return next(new ErrorApi(400, 'No hay usuario logueado'));
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default AuthController;