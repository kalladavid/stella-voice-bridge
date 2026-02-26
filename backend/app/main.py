from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import whisper
from googletrans import Translator
from gtts import gTTS
import os

app = FastAPI(title="STELLA Voice Bridge")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = whisper.load_model("base")
translator = Translator()

@app.get("/")
def root():
    return {"message": "STELLA backend running"}

@app.post("/translate-voice/")
async def translate_voice(file: UploadFile = File(...)):
    
    audio_path = f"/tmp/{file.filename}"
    
    with open(audio_path, "wb") as f:
        f.write(await file.read())

    # Speech to Text
    result = model.transcribe(audio_path)
    text = result["text"]

    # Translate (to Hindi example)
    translated = translator.translate(text, dest="hi").text

    # Text to Speech
    output_audio = "/tmp/output.mp3"
    tts = gTTS(translated)
    tts.save(output_audio)

    return {
        "original_text": text,
        "translated_text": translated,
        "audio_file": "generated"
    }
