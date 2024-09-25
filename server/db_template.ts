import { Pool } from 'pg';

const pool = new Pool({
    user: 'username',
    host: 'localhost',
    database: 'dbname',
    password: 'dbpassword',
    port: 5432,
});

export default pool;
