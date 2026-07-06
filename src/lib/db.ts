import mysql from "mysql2/promise";


declare global {
  var mysqlPool2: mysql.Pool | undefined;
}

export const db = globalThis.mysqlPool2 || mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 2,
  waitForConnections: true,
  queueLimit: 0,
  connectTimeout: 20000,
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.mysqlPool2 = db;
}