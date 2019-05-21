import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { ToastContainer } from 'react-toastify';

import NavBar from '../containers/NavBar';
import Routes from '../containers/Routes';

const App = () => {
  return (
    <Router basename="/">
      <LastLocationProvider>
        <div className="container-relative ui">
          <NavBar />
          <ToastContainer />
          <Routes />
        </div>
      </LastLocationProvider>
    </Router>
  );
};

export default App;
