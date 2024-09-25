
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import appointmentRoutes from './routes/appointment';


// 创建一个 Express 应用
const app = express();
// 让服务器监听指定的端口
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // 解析请求体


app.get('/', (req, res) => {
    res.send('Welcome to the Healthcare Appointment Booking System API');
});
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// 设置一个基本的路由
// app.get('/', (req, res) => {
//     res.send('Healthcare Appointment Booking System API-this is a test');
  
// });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
