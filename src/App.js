import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map'
import Sidebar from './Drawer'

function App() {
  return (
    <div>
      <div><Sidebar /></div>
      <div><Map /></div>
    </div>
  );
}

export default App;
