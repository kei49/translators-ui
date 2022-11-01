import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import MainPage from './screens/MainPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        HuggingFace Translators
      </header>
      <MainPage />
      <ToastContainer />
    </div>
  );
}

export default App;
