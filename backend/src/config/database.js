// Database configuration for Prisma
// This will be used when Prisma is set up

const getDatabaseConfig = () => {
  return {
    url: process.env.DATABASE_URL,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
  };
};

module.exports = {
  getDatabaseConfig
};
