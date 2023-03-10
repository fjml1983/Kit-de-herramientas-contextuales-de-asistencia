import React, {useEffect, useState} from "react";
import { AppContext } from '../context/AppProvider';

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

export default function YesNo() {
  const [yesSelected, setYesSelected] = useState(true);
  const [count, setCount] = useState(0);
  
  const {shoot, trigger} = React.useContext(AppContext);

  useEffect(()=>{
    if(shoot){
      if(yesSelected){
        console.log("SI");
        document.getElementById("audio-si").play();
      }else{
        console.log("NO");
        document.getElementById("audio-no").play();
      }
    }
  },[shoot]);

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
       <BigYesNoButton tipo="yes" selected={yesSelected} /> 
       <BigYesNoButton tipo="No" selected={!yesSelected} /> 
      <br/>
      <audio id="audio-si" src="./media/si.mp3" preload="auto"/>
      <audio id="audio-no" src="./media/no.mp3" preload="auto"/>
      <br/>
      <button onClick={()=>{
          if(yesSelected){
            console.log("SI");
            document.getElementById("audio-si").play();
          }else{
            console.log("NO");
            document.getElementById("audio-no").play();

          }
        }
      }>Seleccionar</button>

    </div>
  );
}
