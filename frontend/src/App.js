import React, { useState } from "react";

function App() {
  const [recording, setRecording] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Microphone requires HTTPS or localhost");
        return;
      }

      setRecording(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      let audioChunks = [];

      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob, "voice.wav");

        const response = await fetch(
          "http://YOUR_EC2_PUBLIC_IP:8000/translate-voice/",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setTranslatedText(data.translated_text);
      };

      window.stopRecording = () => {
        mediaRecorder.stop();
        setRecording(false);
      };
    } catch (err) {
      console.error(err);
      alert("Mic access failed");
      setRecording(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎙️ STELLA Voice Bridge</h1>

      {!recording ? (
        <button onClick={startRecording}>Start Speaking</button>
      ) : (
        <button onClick={() => window.stopRecording()}>Stop</button>
      )}

      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
}

export default App;
