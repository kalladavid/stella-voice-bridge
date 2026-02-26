import React, { useState } from "react";

function App() {
  const [recording, setRecording] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Microphone requires HTTPS or localhost");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      setRecording(true);
      audioChunks = [];

      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", audioBlob, "voice.wav");

        const response = await fetch("/api/translate-voice/", {
          method: "POST",
          body: formData,
        });

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
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>🎙️ STELLA Voice Bridge</h1>

      {!recording ? (
        <button
          onClick={startRecording}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Start Speaking
        </button>
      ) : (
        <button
          onClick={() => window.stopRecording()}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Stop
        </button>
      )}

      <h2 style={{ marginTop: "40px" }}>Translated Text:</h2>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
        {translatedText}
      </p>
    </div>
  );
}

export default App;
