import React, {useEffect, useState} from "react";
import { AppContext } from '../context/AppProvider';

const BigButton = ({texto, selected}) => {
  const bigButtonStyle = {
    color: "white",
    backgroundColor: (selected ? "green" : "lightgray"),
    padding: "50px", 
    fontFamily: "Sans-Serif",
    fontSize: selected ? "250%" : "25%",
  };

  return (
    <button style={bigButtonStyle} >
      {texto}
    </button>
  )
}

export default function ABCDAltButtons() {
  const [optionSelected, setOptionSelected] = useState(1);
  const [count, setCount] = useState(0);
  const [secondCounter, setSecondCounter] = useState(1);


  const intervaloDeCambio = 4; //3 segundos

  
  const {shoot, trigger} = React.useContext(AppContext);

  //Play sound when shoot is true
  useEffect(()=>{
    if(shoot){
      switch(optionSelected){
        case 1:
          console.log("A");
          document.getElementById("audio-a").play();
          break;                  
        case 2:
          console.log("B");
          document.getElementById("audio-b").play();
          break;
        case 3:
          console.log("C");
          document.getElementById("audio-c").play();
          break;          
        case 4:
          console.log("D");
          document.getElementById("audio-d").play();
          break;          
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
      setOptionSelected((previo) => (previo < 4) ? previo + 1 : 1 ); 
    }, intervaloDeCambio*1000);
    return () => clearInterval(id);
 }, []);

  return (
    <div>
      <p>{count} {secondCounter} {optionSelected}</p>
      <BigButton texto="A" selected={optionSelected == 1} /> 
      <BigButton texto="B" selected={optionSelected == 2} /> 
      <BigButton texto="C" selected={optionSelected == 3} /> 
      <BigButton texto="No lo se" selected={optionSelected == 4} /> 
      <br/>
      <audio id="audio-a" src="./media/a.mp3" preload="auto"/>
      <audio id="audio-b" src="./media/b.mp3" preload="auto"/>
      <audio id="audio-c" src="./media/c.mp3" preload="auto"/>
      <audio id="audio-d" src="./media/d.mp3" preload="auto"/>
      <br/>

    </div>
  );
}
