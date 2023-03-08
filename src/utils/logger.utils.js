import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger = winston.format;

let styleWinston = logger.combine(
  logger.label({
    label: "[ LOGGER ]",
  }),
  logger.timestamp({
    format: "YY-MM-DD HH:mm:ss",
  }),
  logger.printf((info) => `${info.label}  ${info.timestamp}  [${info.level.toLocaleUpperCase()}] : ${info.message}`),
  logger.colorize({
    all: true,
  })
);

const loggerApp = (env) => {
  if (env === "PROD") {
    return winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: "./logs/warn.log",
          level: "warn",
          format: logger.combine(styleWinston, logger.uncolorize()),
        }),
        new winston.transports.File({
          filename: "./logs/error.log",
          level: "error",
          format: logger.combine(styleWinston, logger.uncolorize()),
        }),
        new winston.transports.Console({
          format: logger.combine(styleWinston, logger.colorize()),
        }),
      ],
    });
  } else {
    return winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: logger.combine(styleWinston, logger.colorize()),
        }),
      ],
    });
  }
};

export default loggerApp(process.env.LOGGER_MOD);
