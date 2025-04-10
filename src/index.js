import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/index.css';
import './css/responsive.css';
import App from './App';
import { Provider } from 'react-redux';
import { Store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';




//const root = ReactDOM.createRoot(document.getElementById('root'));


function RootElements() {

 
  return (

   
    <Provider store={Store} >
    <PersistGate loading={null} persistor={persistor}> 
       <App />
      <ToastContainer autoClose={3000} position="top-right" />
      </PersistGate>
      </Provider>
   
   
  );
};

ReactDOM.render(<RootElements />, document.getElementById('root'));

