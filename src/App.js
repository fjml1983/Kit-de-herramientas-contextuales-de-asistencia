import React, {useEffect, useState} from "react";
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

  const alternarBoton = () =>{
    console.log(yesSelected)
    setYesSelected(!yesSelected);
    setTimeout(alternarBoton,3000);
  }

  useEffect(() => {
     setTimeout(alternarBoton,3000);
  }, []);
  

  return (
    <div>
       <BigYesNoButton tipo="yes" selected={yesSelected} onButtonClick={}/> 
       <BigYesNoButton tipo="No" selected={!yesSelected} onButtonClick={}/> 

    </div>
  );
}
