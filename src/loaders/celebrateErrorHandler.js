import { isCelebrateError } from "celebrate";
import Logger from "./logger.js";

const validationErrors = (err, req, res, next) => {
  if (!isCelebrateError(err)) return next(err);

  const errorBody = err.details.get('body');
  const { details: [details] } = errorBody;

  Logger.info('Error celebrate: %o', errorBody);
  
  const error = {
    status: 400,
    error: true,
    message: details.message,
    validation: {
      path: details.path.toString(),
    },
  };

  return next(error);
}

export default validationErrors;