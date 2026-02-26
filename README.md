# 🎤 STELLA Voice Bridge

**STELLA Voice Bridge** is a production-style, full-stack AI voice translation platform that converts spoken audio into text, translates it, and returns results in real time.

Built with a modern DevOps approach using Docker, Nginx reverse proxy, and cloud deployment on AWS EC2.

---

## 🚀 Live Features

* 🎙️ **Live microphone recording** from browser
* 📁 **Audio file upload** support
* 🧠 **Speech-to-Text** using OpenAI Whisper
* 🌍 **Automatic translation** (multi-language ready)
* ⚡ **FastAPI high-performance backend**
* ⚛️ **React frontend UI**
* 🐳 **Fully Dockerized microservices**
* 🌐 **Nginx reverse proxy with clean `/api` routing**
* ☁️ **AWS EC2 deployment ready**

---

## 🏗️ Architecture

```
Browser (Mic/File)
        │
        ▼
   Nginx (Reverse Proxy)
        │
   ┌────┴────┐
   ▼         ▼
Frontend   Backend (FastAPI)
 (React)        │
                ▼
            Whisper STT
                │
                ▼
            Translation
```

---

## 🛠️ Tech Stack

### Frontend

* React 18
* Axios
* MediaRecorder API
* Nginx (static serving)

### Backend

* FastAPI
* Uvicorn
* OpenAI Whisper
* googletrans
* gTTS
* FFmpeg

### DevOps & Infra

* Docker & Docker Compose
* Nginx Reverse Proxy
* AWS EC2 (Amazon Linux)
* Linux CLI

---

## 📦 Project Structure

```
stella-voice-bridge/
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
├── nginx/
│   └── default.conf
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Local Development Setup

### 🔹 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/stella-voice-bridge.git
cd stella-voice-bridge
```

---

### 🔹 2. Run with Docker

```bash
docker compose up -d --build
```

---

### 🔹 3. Open in browser

```
http://localhost
```

---

## 🎤 How to Use

### Option A — Live Mic

1. Click **Start Recording**
2. Allow microphone permission
3. Speak
4. Click **Stop Recording**
5. View transcription + translation

---

### Option B — File Upload

1. Choose audio file (`.wav`, `.mp3`, `.m4a`)
2. Click **Upload & Translate**
3. View results

---

## 🔧 Production Deployment (AWS EC2)

High-level steps:

1. Launch EC2 (Amazon Linux 2023)
2. Install Docker & Docker Compose
3. Clone repository
4. Run:

```bash
docker compose up -d --build
```

5. Access via:

```
http://<EC2-PUBLIC-IP>
```

---

## 🔐 Recommended Production Improvements

* [ ] Enable HTTPS (Let’s Encrypt)
* [ ] Add health checks
* [ ] Add CI/CD pipeline
* [ ] Add domain name
* [ ] Add monitoring (Prometheus + Grafana)
* [ ] GPU acceleration for Whisper
* [ ] Multi-language selector

---

## 🧠 Key DevOps Highlights

✅ Multi-container architecture
✅ Reverse proxy routing
✅ Clean `/api` separation
✅ Production React build
✅ Containerized AI workload
✅ Cloud-ready deployment

---

## 📸 Screenshots

> Add your app screenshots here for better GitHub presentation.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Noe**
DevOps Engineer | Cloud & AI Enthusiast

---

⭐ If you like this project, consider giving it a star on GitHub!

