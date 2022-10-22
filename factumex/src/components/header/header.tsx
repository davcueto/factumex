import React, { useEffect, useState } from 'react';
import './style.css';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import Auth from '../auth/auth';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {

    const estadoSesion = useSelector((state: any) => state.access_token);
    const navigate = useNavigate();

    let list = [
        { title: "Home", path: "/home", disable: false, protected: false },
        { title: "Employees", path: "/employees", disable: true, protected: true },
        { title: "Upload", path: "/upload", disable: true, protected: true }
    ];

    const [listMenu, setListMenu] = useState(list);

    const handleRedirect = (path: string) => {
        navigate({
            pathname: path,
        });
    }

    const verifyMenu = () => {
        let listTemp = list.map((element) => {
            var obj = Object.assign({}, element);
            if (estadoSesion !== "") {
                if (element.protected) {
                    obj.disable = false;
                }
            } else {
                if (element.protected) {
                    obj.disable = true;
                }
            }
            return obj;
        })
        setListMenu(listTemp);
    }

    useEffect(() => {
        verifyMenu();
    }, [estadoSesion]);

    useEffect(() => {
        verifyMenu();
    }, []);

    return (
        <>
            <Row className='header-content-1'>
                <Col span={20}>
                    <div className='header-content-3'>
                        {
                            listMenu.map((element, index) => {
                                return (
                                    <div
                                        className='header-content-4'
                                        key={index}
                                        onClick={() => { handleRedirect(element.path) }}>{element.disable ? '' : element.title}</div>
                                )
                            })
                        }
                    </div>
                </Col>
                <Col span={4}>
                    <div style={{ textAlign: 'right', paddingRight: '15%' }}>
                        <Auth />
                    </div>
                </Col>
            </Row>
        </>
    )

}

export default Header;