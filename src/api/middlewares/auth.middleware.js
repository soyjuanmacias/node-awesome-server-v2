import ErrorApi from "../../services/error.service.js";

const loginError = new ErrorApi(401, 'Debes loguearte');
const permissionDeniedError = new ErrorApi(403, 'No tienes permiso para realizar esta acción');

export const isAuth = (req, res, next) => {
  if (!req.user) return next(loginError);
  return next();
};

export const isAdmin = (req, res, next) => {
  if (!req.user) next(error);
  if (req.user.role !== 'admin') return next(permissionDeniedError);
  return next();
};

export const hasRole = roles => (req, res, next) => {
  if (!req.user) return next(loginError);
  if (!roles.includes(req.user.role)) return next(permissionDeniedError);
  return next();
};
