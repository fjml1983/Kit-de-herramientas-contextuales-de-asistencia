import React, {useEffect} from "react";
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      //setYesNo(!);
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <div>
       <BigYesNoButton tipo="yes" onButtonClick={}/> 
       <BigYesNoButton tipo="No" onButtonClick={}/> 

    </div>
  );
}
