import React, { useEffect, useRef, useState } from 'react';
import ml5 from 'ml5';
import GaugeChart from 'react-gauge-chart';

const Chart = (props) => {
  const data = props.data;
  const label = data.label;
  const confidence = parseFloat(data.confidence.toFixed(2));
  console.log(label, confidence);
  return (
    <div>
      <h3>Classification Confidence: {label}</h3>
      <GaugeChart
        id="gauge-chart3"
        nrOfLevels={3}
        colors={['#FF5F6D', '#FFC371', 'rgb(26 202 26)']}
        arcWidth={0.3}
        percent={confidence}
      />
    </div>
  );
};

export default function YesRecognizer() {
  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Options for the SpeechCommands18w model, the default probabilityThreshold is 0
  const options = { probabilityThreshold: 0.75 };

  useEffect(() => {
    classifier = ml5.soundClassifier('./model/model.json', options, () => {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          setLoaded(true);
        });
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (classifier && start) {
        classifier.classify((error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          setResult(results);
          console.log(results);
        });
      }
    }, 500);
    return () => clearInterval(id);
  }, []);

  const toggle = () => {
    setStart(!start);
    setResult([]);
  };

  return (
    <div>
      <h4>Detector de SI</h4>

      {result.length > 0 && (
        <div>
          <Chart data={result[0]} />
        </div>
      )}

      {loaded && (
        <button onClick={() => toggle()}>{start ? 'Stop' : 'Start'}</button>
      )}
    </div>
  );
}
