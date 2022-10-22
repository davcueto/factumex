import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppRouter } from './config/Layout';
import Header from './components/header/header';

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
