import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/header/header';
import Home from '../pages/home/home';
import Employees from '../pages/employees/employess';
import UploadComponent from '../pages/upload/upload';
import ProtectedRoutes from './ProtectedRoutes';

export const AppRouter = () => {
    return (
        <Router basename="/">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/upload" element={<UploadComponent />} />
                </Route>
                <Route path="*" element={<Home />} />
            </Routes>
        </Router >
    );
};

