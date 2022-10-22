import clientAxios from "../config/ClientAxios";

export const GetEmpleados = async () => {
    return await clientAxios.get('/v1/examen/employees/:david_cueto');
};

export const PostEmpleados = async (body: any) => {
    return await clientAxios.post('/v1/examen/employees/:david_cueto', body);
};