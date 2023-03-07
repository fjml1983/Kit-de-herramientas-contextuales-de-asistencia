import React, { useEffect, useState } from 'react';

import ml5 from 'ml5';
import { AppContext } from '../context/AppProvider';

//Basado en: 
//https://blog.greenroots.info/princess-finder-using-react-ml5js-and-teachable-machine-learning
//https://github.com/atapas/princess-finder/



export default function YesRecognizer() {
  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [classifier, setClassifier] = useState(null);
  const [count, setCount] = useState(0);

  const {shoot, trigger} = React.useContext(AppContext);

  // Options for the SpeechCommands18w model, the default probabilityThreshold is 0
  const options = { probabilityThreshold: 0.75 };

  useEffect(() => {    
    let classifier = ml5.soundClassifier('http://localhost:3000/model/model.json', options, () => {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          setLoaded(true);
          console.log("Classifier loaded an ready to start");
        });
    });
    setClassifier(classifier);

  }, []);

  
  useEffect(() => {
    
    if (classifier){
        if (start) {        
          classifier.classify((error, results) => {
            if (error) {
              console.error(error);
              return;
            }
            
            //counting classifier calls
            setCount((count) => count + 1);
            console.log(results);
            setResult(results);            
          });
        }
        else{
           classifier.model.model.stopListening()
         }
    }

  }, [start]); //Para inicio automatico, cambiar por [loaded]

  useEffect(() => {

    if(result && result.length > 0 && result[0].label==="SI" && result[0].confidence > 0.95) {              
      console.log("SI");
      trigger();
    }

  }, [result]);


  const toggle = () => {
    setStart(previo => !previo);
    setResult([]);
    console.log(start ? 'Stop' : 'Start');
  };

  return (
    <div>
      <h4>Detector de SI</h4>
      {count}
      <p> trigger: {shoot ? "true" : "false"} </p>
      <br />
      {result.length > 0 && (
        <div>
          
          <h1>{result[0].label + "(" + Math.round(result[0].confidence * 100) + ")" }</h1>
        </div>
      )}

      {loaded && (
        <button onClick={() => toggle()}>{start ? 'Stop' : 'Start'}</button>
      )}
    </div>
  );
}
