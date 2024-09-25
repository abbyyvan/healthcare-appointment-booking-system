import express from 'express';
import { createAppointment, deleteAppointment, getAppointmentsByPatientId, updateAppointment } from '../models/appointment';
import { authenticateToken,authorizeRole } from '../middleware/auth';


const router = express.Router();
// 在预约路由之前添加以下行
router.use(authenticateToken);

// 创建预约
router.post('/', async (req, res) => {
    const { patientId, providerId, date } = req.body;
    const appointment = await createAppointment(patientId, providerId, date);
    res.status(201).json(appointment);
});


// 获取患者的所有预约
router.get('/:patientId', async (req, res) => {
    const { patientId } = req.params;
    const appointments = await getAppointmentsByPatientId(parseInt(patientId));
    res.json(appointments);
});

// 更新预约
router.put('/:patientId', authenticateToken, authorizeRole(['patient', 'provider']), async (req, res) => {
    const { patientId } = req.params;
    const { date } = req.body;
    const updatedAppointment = await updateAppointment(parseInt(patientId), date);
    res.json(updatedAppointment);
});

// 删除预约
router.delete('/:patientId', authenticateToken, authorizeRole(['patient', 'provider']), async (req, res) => {
    const { patientId } = req.params;
    const deletedAppointment = await deleteAppointment(Number(patientId));
    res.json(deletedAppointment);
});


// 添加身份验证和授权中间件
router.post('/', authenticateToken, authorizeRole(['patient']), async (req, res) => {
    const { patientId, providerId, date } = req.body;
    const appointment = await createAppointment(patientId, providerId, date);
    res.status(201).json(appointment);
});

// 其他路由也可以根据需要限制角色
router.get('/:patientId', authenticateToken, authorizeRole(['patient', 'provider']), async (req, res) => {
    const { patientId } = req.params;
    const appointments = await getAppointmentsByPatientId(Number(patientId));
    res.json(appointments);
});

export default router;

