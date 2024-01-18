import React, { useEffect, useState } from 'react';
import ml5 from 'ml5';
import { AppContext } from '../context/AppProvider';

//Basado en: 
//https://blog.greenroots.info/princess-finder-using-react-ml5js-and-teachable-machine-learning
//https://github.com/atapas/princess-finder/



export default function OkRecognizer() {
  const [running, setRunning] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [classifier, setClassifier] = useState(null);
  const [count, setCount] = useState(0);

  const { shoot, trigger } = React.useContext(AppContext);


  //let model_url = window.location.href + 'models/fjml-ok-model/model.json';
  let model_url = window.location.href + 'models/isidro-model/model.json';

  const targetLabel = "OK";
  const targetPrecision = 0.90;

  // Options for the SpeechCommands18w model, the default probabilityThreshold is 0
  const options = { probabilityThreshold: 0.7 }; //0.5 is recommended in teachable machine

  //effect to load the classifier
  useEffect(() => {

    let classifier = ml5.soundClassifier(model_url, options, () => {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          setLoaded(true);
          console.log("Classifier loaded an ready to start");
          //setRunning(true); //Quitar esta linea si se desea iniciar manualmente con el boton Start.
        });
    });
    setClassifier(classifier);

  }, []);


  //effect to start/stop the classifier
  useEffect(() => {

    let classifierCalls = 0;
    console.log(running ? 'Started' : 'Stopped');
    if (classifier) {
      if (running) {
        classifier.classify((error, results) => {
          if (error) {
            console.error(error);
            return;
          }

          //counting classifier calls
          classifierCalls++;
          setCount(classifierCalls);
          setResultados(results);
          console.log("Classifier call: " + classifierCalls);
          console.log(results);

        });
      }
      else {
        classifier.model.model.stopListening()
      }
    }

  }, [running]); //Para inicio automatico, cambiar por [loaded]

  //effect to trigger the shoot
  useEffect(() => {

    if (resultados && resultados.length > 0 && resultados[0].label === targetLabel && resultados[0].confidence >= targetPrecision) {
      console.log("OK detected");
      trigger();
    }

  }, [resultados]);


  //function to toggle the running state
  const toggle = () => {
    setRunning(previo => !previo);
    setResultados([]);
  };

  return (
    <div>
      <h4>Ok Recognizer</h4>
      {count}
      <p> trigger status: <b>{shoot ? "true" : "false"}</b> </p>

      {loaded ?
        (<>

          {(resultados.length > 0 && running) ? (
            <>
              <p>The recognizer is RUNNING:&nbsp;
                <b>{resultados[0].label + "(" + Math.round(resultados[0].confidence * 100) + ")"}</b>
              </p>
            </>
          ) :
            (
              <p>The recognizer is PAUSED, click start if you want.</p>
            )
          }
          <button onClick={() => toggle()}>{running ? 'Pause' : 'Start'}</button>
        </>)
        :
        (<>
          <p>Please wait, recongnizer is loading...</p>
        </>
        )
      }



    </div>
  );
}
