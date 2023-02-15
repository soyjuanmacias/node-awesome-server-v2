/**
 * Loader encargado de la configuración de los headers de las respuestas en la aplicación.
 *
 * Es llamado desde el frameworkLoader.
 */

const setHeaders = (req, res, next) => {
  console.log(req.method);
  
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

export default setHeaders;
