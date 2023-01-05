module.exports = {
  dev: {
    connectionString: "postgresql://postgres:docker@127.0.0.1:5432/",
    port: "3003",
  },
  production: {
    connectionString: process.env.POSTGRES_CONNECTION_STRING ,
    port: process.env.PORT,
  },
};
