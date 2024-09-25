import pool from '../db';

export const getUserById = async (id: number) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

// 可以添加更多用户相关的函数
