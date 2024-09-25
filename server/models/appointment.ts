import pool from '../db';

export const createAppointment = async (patientId: number, providerId: number, date: string) => {
    const result = await pool.query(
        'INSERT INTO appointments (patient_id, provider_id, appointment_date) VALUES ($1, $2, $3) RETURNING *',
        [patientId, providerId, date]
    );
    return result.rows[0];
};

export const getAppointmentsByPatientId = async (patientId: number) => {
    const result = await pool.query('SELECT * FROM appointments WHERE patient_id = $1', [patientId]);
    return result.rows;
};

// 可以添加更多与预约相关的函数
export const updateAppointment = async (id: number, date: string) => {
    console.log(`Updating appointment ID: ${id} with new date: ${date}`); // 添加日志
    const result = await pool.query(
        `UPDATE appointments SET appointment_date = $1 WHERE patient_id = $2 RETURNING *`,
        [date, id]
    );
    console.log(result.rows[0]); // 输出更新后的行
    return result.rows[0];
};

export const deleteAppointment = async (id: number) => {
    const result = await pool.query(
        'DELETE FROM appointments WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};
