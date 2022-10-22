import React, { useEffect, useState } from 'react';
import './style.css';
import { GetEmpleados, PostEmpleados } from '../../services/factumex-service';
import { Space, Table, Tag, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

const Employees = () => {

    const columns: ColumnsType<any> = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Apellido',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Cumpleaños',
            dataIndex: 'birthday',
            key: 'birthday',
        }
    ];
    const data: any[] = [];

    const [dataTable, setDataTable] = useState([]);
    const [search, setSearch] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cumpleanios, setCumpleanios] = useState("");

    const obtenerEmpleados = () => {
        GetEmpleados()
            .then((response) => {
                console.log("Response", response);
                setDataTable(response.data.data.employees);
            })
            .catch(() => {

            });
    }

    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    }

    const handleNombre = (event: any) => {
        setNombre(event.target.value);
    }

    const handleApellido = (event: any) => {
        setApellido(event.target.value);
    }

    const onChangeCumpleanios: DatePickerProps['onChange'] = (date, dateString) => {
        //console.log(date, dateString);
        setCumpleanios(dateString)
    };

    const nuevoEmpleado = () => {
        if (nombre === "" && apellido === "" && cumpleanios === "") {
            alert("debes llenar todos los campos");
            return;
        }
        let formData = {
            name: nombre,
            last_name: apellido,
            birthday: cumpleanios
        }
        PostEmpleados(formData)
            .then((response) => {
                console.log("Response", response);
                obtenerEmpleados();
                limpiarCampos();
            })
            .catch(() => {

            });
    }

    const limpiarCampos = () => {
        setNombre("");
        setApellido("");
        setCumpleanios("");
    }

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    return (
        <>
            <div style={{ margin: '2%' }}>
                <span style={{ margin: '0 2% 0 0' }}>Nombre: <Input placeholder="Ingresa un nombre" style={{ width: '20%' }} onChange={handleNombre} value={nombre} /></span>
                <span style={{ margin: '0 2% 0 0' }}>Apellido: <Input placeholder="Ingresa un apellido" style={{ width: '20%' }} onChange={handleApellido} value={apellido} /></span>
                <span style={{ margin: '0 2% 0 0' }}>Cumpleaños: <DatePicker onChange={onChangeCumpleanios} placeholder="Ingresa una fecha" /></span>
                <Button type="primary" onClick={nuevoEmpleado}>Agregar empleado</Button>
            </div>
            <div>
                <div style={{ margin: '2%' }}>
                    <span>Buscar: <Input placeholder="Buscar" style={{ width: '50%' }} onChange={handleSearch} value={search} /></span>
                </div>
                <Table columns={columns} dataSource={dataTable} />
            </div>
        </>
    )

}

export default Employees;