import React , {useState, useEffect }from 'react';
import './App.css';

function App() {

  const [recognition, setRecognition] = useState()

  useEffect(() => {
    // Update the document title using the browser API
    if ('webkitSpeechRecognition' in window){
      window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      var finalTranscript = '';
      var obj = new window.SpeechRecognition();
      obj.interimResults = true;
      obj.maxAlternatives = 10;
      obj.continuous = true;
      obj.onresult = (event) => {
        var interimTranscript = '';
        for (var i = event.resultIndex, len = event.results.length; i < len; i++) {
          var transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        document.querySelector('.text-box').innerHTML = finalTranscript + interimTranscript + '</>';
      }
      setRecognition(obj);
    }
      else{
        document.querySelector('.text-box').innerHTML = 'The browser doesnot support Google WebSpeech API' + '<i style="color:#fff;">'+'</n>';
      }
  });

  function handleStart() {
    recognition.start();
  }

  function handleStop() {
    recognition.abort();
  }

  return (
    <div className="App-header"> 
      <div class="container">
        <div class="text-box" id="transcipts" contenteditable="true"></div>
        <div class="footer-container">
          <button class="startButton" onClick = {handleStart}>Start</button>
          <button class="stopButton" onClick = {handleStop}>Stop</button>
        </div>
        
      </div>
    </div>
  );
}

export default App;
