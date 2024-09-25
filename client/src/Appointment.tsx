import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Appointment: React.FC = () => {
    const [appointments, setAppointments] = useState<any[]>([])
    const [date, setDate] = useState<string>('')
    const [providerId, setProviderId] = useState<number | undefined>(undefined)

    // const temp_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE3MjY5OTk0MjF9.jX2ThBAwnO5rzXQ0kF7rMQvsxCd6Jc5lNE-Xkk-FDOs'
    // localStorage.setItem('token', temp_token);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate('/'); // 如果没有token，跳转到登录页面
        } else {
            fetchAppointments();
        }
    }, [token]);

    const fetchAppointments = async () => {
        const response = await axios.get('http://localhost:5001/api/appointments/1', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
    };

    const createAppointment = async () => {
        const response = await axios.post('http://localhost:5001/api/appointments', {
            patientId: 1, // 替换为实际患者ID
            providerId,
            date
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments([...appointments, response.data]);
    };
    
    const updateAppointment = async (id: number) => {
        const response = await axios.put(`http://localhost:5001/api/appointments/${id}`, { date }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(appointments.map(app => app.id === id ? response.data : app));
    };

    const deleteAppointment = async (id: number) => {
        await axios.delete(`http://localhost:5001/api/appointments/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(appointments.filter(app => app.id !== id));
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return(
        <div>
            <h2>预约管理</h2>
            <input type="text" placeholder="医生ID" onChange={(e) => setProviderId(Number(e.target.value))} />
            <input type="datetime-local" onChange={(e) => setDate(e.target.value)} />
            <button onClick={createAppointment}>创建预约</button>
            <ul>
                {appointments.map(app => (
                    <li key={app.id}>
                        <span>{app.appointment_date}</span>
                        <button onClick={() => updateAppointment(app.id)}>更新</button>
                        <button onClick={() => deleteAppointment(app.id)}>删除</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Appointment;