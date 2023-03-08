import loggerApp from "../utils/logger.utils.js";

export const logger = (req, res, next) => {
  loggerApp.info(`ruta ${req.baseUrl} ${req.url} metodo ${req.method}`);
  next();
};
