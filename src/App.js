import React, {useEffect, useState} from "react";
import P5 from 'p5'

import "./style.css";

const BigYesNoButton = ({tipo, selected, onButtonClick}) => {
  const bigButtonStyle = {
    color: "white",
    backgroundColor: (tipo==="yes" ? 
                          selected ? "green" : "lightgreen" 
                          : 
                          selected ? "red" : "lightcoral" ),
    padding: "50px",
    fontFamily: "Sans-Serif",
    fontSize: selected ? "250%" : "100%" 
  };

  return (
    <button style={bigButtonStyle} >
      {(tipo==="yes" ? "SI":"NO")}
    </button>
  )
}

export default function App() {
  const [yesSelected, setYesSelected] = useState(true);
  const [count, setCount] = useState(0);

  new P5(function (p5) {
    p5.setup = () => {
    }
  
    p5.draw = () => {  
    }
  })

  useEffect(() => {
     const id = setInterval(() => {
       setCount((count) => count + 1);
     }, 1000);
     return () => clearInterval(id);
  }, []);
  
  useEffect(() => {
    const id = setInterval(() => {
      setYesSelected((preVal) => !preVal);     
    }, 3000);
    return () => clearInterval(id);
 }, []);

  return (
    <div>
      <div>{count}</div>
       <BigYesNoButton tipo="yes" selected={yesSelected} onButtonClick={}/> 
       <BigYesNoButton tipo="No" selected={!yesSelected} onButtonClick={}/> 
      <br/>
      <br/>
      <button onClick={()=>{console.log("Seleccionado")}}>Seleccionar</button>

    </div>
  );
}
