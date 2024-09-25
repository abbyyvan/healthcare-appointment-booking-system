import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', { username, password });
            localStorage.setItem('token', response.data.token); // 将 token 存储到 localStorage
            navigate('/appointments'); // 登录成功后跳转到预约页面
        } catch (error) {
            console.error('登录失败', error);
            alert('登录失败，请检查用户名和密码');
        }
    };

    return (
        <div>
            <h2>登录</h2>
            <input 
                type="text" 
                placeholder="用户名" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="密码" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>登录</button>
        </div>
    );
};

export default Login;
