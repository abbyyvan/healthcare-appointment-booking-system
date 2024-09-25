import { Pool } from 'pg';

const pool = new Pool({
    user: 'jingyuan',
    host: 'localhost',
    database: 'healthcare',
    password: 'admin',
    port: 5432,
});

export default pool;
