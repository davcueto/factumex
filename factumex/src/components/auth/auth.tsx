import React, { useEffect, useState } from 'react';
import './style.css';
import { Avatar, Popover, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setLogout } from '../../store/actions/factumex.actions';
import { useNavigate } from 'react-router-dom';


const Auth = () => {

    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const estadoSesion = useSelector((state: any) => state.access_token);

    const [isLogin, setIsLogin] = useState(estadoSesion === "" ? false : true);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const handleLogin = () => {
        if (user === "admin" && password === "admin") {
            let data: string = Math.random().toString(36).substr(2);
            dispatch(setAccessToken(data));
            localStorage.setItem("accessToken", data);
            hide();
            setTimeout(() => { setIsLogin(true) }, 500);
        }else {
            alert("Usuario y/o password incorrectos");
        }
    }

    const handleLogout = () => {
        dispatch(setLogout());
        localStorage.clear();
        hide();
        setTimeout(() => { setIsLogin(false) }, 500);
        navigate({
            pathname: "/home",
        });
    }

    const handleChangeUser = (event: any) => {
        setUser(event.target.value);
    }

    const handleChangePass = (event: any) => {
        setPassword(event.target.value);
    }

    const contentLogin = (
        <div>
            <p onClick={handleLogout}>Cerrar sesión</p>
        </div>
    );

    const contentInvited = (
        <div>
            <Input placeholder="Usuario" type='text' onChange={handleChangeUser}
                onPaste={(e) => {
                    e.preventDefault()
                    return false;
                }} onCopy={(e) => {
                    e.preventDefault()
                    return false;
                }} value={user} prefix={<UserOutlined />} className="auth-content-2" />
            <Input placeholder="password" type='password' onChange={handleChangePass}
                onPaste={(e) => {
                    e.preventDefault()
                    return false;
                }} onCopy={(e) => {
                    e.preventDefault()
                    return false;
                }} value={password} prefix={<LockOutlined />} className="auth-content-2" />
            <div style={{ paddingLeft: '2%' }}>
                <Button type="primary" onClick={handleLogin}>Iniciar sesión</Button>
            </div>
        </div>
    );

    return (
        <>
            <Popover
                placement='bottomRight'
                content={isLogin ? contentLogin : contentInvited}
                title={isLogin ? 'Usuario anonimo' : 'Login'}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}>
                {
                    isLogin ? (
                        <Avatar size={40} icon={<UserOutlined />} className="auth-content-1" />
                    ) : (
                        <div className='auth-content-3'>Iniciar sesión</div>
                    )
                }
            </Popover>
        </>
    )

}

export default Auth;