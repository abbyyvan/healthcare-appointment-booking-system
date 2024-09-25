import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';

const router = express.Router();


// 用户注册
router.post('/register', async (req, res) => {

    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body); // 添加这一行来调试

    const result = await pool.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
        [username, hashedPassword, role]
    );

    res.status(201).json(result.rows[0]);
});

// 用户登录
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length > 0) {
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (validPassword) {
            const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, 'your_jwt_secret');
            res.json({ token });
        } else {
            res.status(400).json({ message: 'Invalid password' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

export default router;
