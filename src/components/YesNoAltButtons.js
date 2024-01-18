import React, {useEffect, useState} from "react";
import { AppContext } from '../context/AppProvider';

const BigYesNoButton = ({tipo, selected}) => {
  const bigButtonStyle = {
    color: "white",
    backgroundColor: (tipo==="yes" ? 
                          selected ? "green" : "lightgray" 
                          : 
                          selected ? "red" : "lightgray" ),
    padding: "50px", 
    fontFamily: "Sans-Serif",
    fontSize: selected ? "250%" : "25%",
  };

  return (
    <button style={bigButtonStyle} >
      {(tipo==="yes" ? "SI":"NO")}
    </button>
  )
}

export default function YesNoAltButtons() {
  const [yesSelected, setYesSelected] = useState(true);
  const [count, setCount] = useState(0);
  const [secondCounter, setSecondCounter] = useState(1);


  const intervaloDeCambio = 4; //4 segundos

  
  const {shoot, trigger} = React.useContext(AppContext);

  //Play sound when shoot is true
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


  //Count every second
  useEffect(() => {
     const id = setInterval(() => {
       setCount((count) => count + 1);
              
       setSecondCounter((count) => { //reset counter every 4 seconds
              if(count >= intervaloDeCambio){
                return 1;
              }else{
                return count + 1;
              }
            });

     }, 1000);
     return () => clearInterval(id);
  }, []);
  
  //Toggle yes/no every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setYesSelected((preVal) => !preVal);     
    }, intervaloDeCambio*1000);
    return () => clearInterval(id);
 }, []);

  return (
    <div>
      <p>{count}</p>
      <p>{secondCounter}</p>
      <BigYesNoButton tipo="yes" selected={yesSelected} /> 
      <BigYesNoButton tipo="No" selected={!yesSelected} /> 
      <br/>
      <audio id="audio-si" src="./media/si.mp3" preload="auto"/>
      <audio id="audio-no" src="./media/no.mp3" preload="auto"/>
      <br/>
      
      {/* Descomenter si se desea mostrar un boton para activar la voz. 
        Ahorita se activa con el trigger.

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
    */}

    </div>
  );
}
