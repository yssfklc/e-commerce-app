const dotenv = require('dotenv');
const Pool=require('pg').Pool;
dotenv.config();

const devconfig = {
    user:process.env.user,
    host:process.env.host,
    database:process.env.database,
    password:process.env.password,
    port:process.env.port
}
const proconfig = {
    connectionString: process.env.DATABASE_URL,
}
const pool=new Pool (process.env.NODE_ENV === "production"? proconfig : devconfig);

module.exports = {
    pool
}