import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

function App() {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });

      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      try {
        const res = await axios.post("/api/translate-voice/", formData);
        setResult(res.data);
      } catch (err) {
        alert("Upload failed");
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🎤 STELLA Voice Bridge</h1>

      {!recording ? (
        <button onClick={startRecording}>🎙 Start Recording</button>
      ) : (
        <button onClick={stopRecording}>⏹ Stop Recording</button>
      )}

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Original:</h3>
          <p>{result.original_text}</p>

          <h3>Translated:</h3>
          <p>{result.translated_text}</p>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
