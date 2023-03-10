import React from 'react';
import YesNoAltButtons from './components/YesNoAltButtons';
import OkRecognizer from './components/OkRecognizer';
import AppProvider from './context/AppProvider';

import './style.css';

export default function App() {
  return (
      <AppProvider>        
        <OkRecognizer/>
        <br/>
        <YesNoAltButtons/>
      </AppProvider>
  );
}
