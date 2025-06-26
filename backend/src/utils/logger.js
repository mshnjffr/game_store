const fs = require('fs');
const path = require('path');

const logLevels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

const formatLogMessage = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta
  };
  return JSON.stringify(logEntry);
};

const writeToFile = (logEntry) => {
  if (process.env.NODE_ENV === 'production') {
    const logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, logEntry + '\n');
  }
};

const log = (level, message, meta = {}) => {
  const logEntry = formatLogMessage(level, message, meta);
  
  // Console output
  console.log(logEntry);
  
  // File output in production
  writeToFile(logEntry);
};

const logger = {
  error: (message, meta) => log(logLevels.ERROR, message, meta),
  warn: (message, meta) => log(logLevels.WARN, message, meta),
  info: (message, meta) => log(logLevels.INFO, message, meta),
  debug: (message, meta) => {
    if (process.env.NODE_ENV === 'development') {
      log(logLevels.DEBUG, message, meta);
    }
  }
};

module.exports = logger;
