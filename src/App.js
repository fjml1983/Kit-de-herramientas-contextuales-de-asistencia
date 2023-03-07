import React from 'react';
import YesNo from './components/YesNo';
import YesRecognizer from './components/YesRecognizer';
import AppProvider from './context/AppProvider';

import './style.css';

export default function App() {
  return (
      <AppProvider>        
        <YesRecognizer/>
        <br/>
        <YesNo/>
      </AppProvider>
  );
}
