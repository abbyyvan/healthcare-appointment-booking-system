import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 定义 JwtPayload 类型
export interface JwtPayload {
    id: number;
    role: string;
}

// 身份验证中间件
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user as JwtPayload;  // 设置 req.user
        next();
    });
};

// 基于角色的授权中间件
export const authorizeRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {  // 检查 req.user
            return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
        }
        next();
    };
};


