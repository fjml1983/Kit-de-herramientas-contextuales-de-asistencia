import React from 'react';
import YesNoAltButtons from './components/YesNoAltButtons';
import OkRecognizer from './components/OkRecognizer';
import AppProvider from './context/AppProvider';

import './style.css';
import ABCDAltButtons from './components/ABCDAltButtons';

export default function App() {

  const requestRef = React.useRef()
/*
  const animate = time => {
    // The 'state' will always be the initial value here
    requestRef.current = requestAnimationFrame(animate);
  }
    
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

*/

  return (
      <AppProvider>    


        <OkRecognizer/>
        <br/>        
        <ABCDAltButtons/>   

{/*

     <YesNoAltButtons/>      



*/}
        


      </AppProvider>
  );
}
