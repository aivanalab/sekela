# 🇹🇿 Tanzania University Explorer

<p align="center">
    <a href="https://github.com/zuck30/Tanzania-University-Explorer"><img src="https://img.shields.io/badge/status-updating-brightgreen.svg"></a>
    <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.8+-FF1493.svg"></a>
    <a href="https://github.com/zuck30/Tanzania-University-Explorer/graphs/contributors"><img src="https://img.shields.io/github/contributors/zuck30/Tanzania-University-Explorer?color=blue"></a>
    <a href="https://github.com/zuck30/Tanzania-University-Explorer/stargazers"><img src="https://img.shields.io/github/stars/zuck30/Tanzania-University-Explorer.svg?logo=github"></a>
    <a href="https://github.com/zuck30/Tanzania-University-Explorer/network/members"><img src="https://img.shields.io/github/forks/zuck30/Tanzania-University-Explorer.svg?color=blue&logo=github"></a>
    <img src="https://visitor-badge.laobi.icu/badge?page_id=zuck30.Tanzania-University-Explorer" alt="visitors"/>   
</p>


![Banner](https://capsule-render.vercel.app/api?type=venom&height=200&color=0:43cea2,100:185a9d&text=%20Sekela%&textBg=false&desc=(Empowering%20Education%20Choices)&descAlign=79&fontAlign=50&descAlignY=70&fontColor=f7f5f5)
<p align="center">A comprehensive web application for exploring 30+ universities in Tanzania. Discover, compare, and make informed decisions with a smart wizard, interactive charts, and detailed profiles!</p>

<h3>Quick Links</h3>

<div align="left">
    <a href="mailto:mwalyangashadrack@gmail.com"><img src="https://img.shields.io/badge/Mail%20me-30302f?style=flat-square&logo=gmail" alt="" srcset=""></a>
    <a href="https://sheddysilicon.netlify.app"><img src="https://img.shields.io/badge/Visit%20Project-30302f?style=flat-square&logo=github" alt="" srcset=""></a>
</div>

<br>
<a href="https://github.com/zuck30/Tanzania-University-Explorer"> <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmRkN2V0amFnMW55c2kzeW1jMW9xd3lyeDVhdDRwNHc2b3ZxbGNheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif" width="40%" align="right" style="border-radius:10px; animation: float 6s ease-in-out infinite;" alt="Coding GIF">
  </a>

<ul>
    <li>💻 Explore 30+ Tanzanian Universities</li>
    <li>🔭 Smart Wizard for Personalized Recommendations</li>
    <li>👨‍💻 Built with React, FastAPI, and Tailwind CSS</li>
</ul>

<h2> Features</h2>

- **Homepage**: Engaging landing page with hero section, quick stats, and featured universities.
- **University Explorer**: Browse and filter universities by region, type, fees, and difficulty. Includes detailed profiles and comparison tools.
- **Data Insights**: Interactive charts for university distribution, regional analysis, and admission difficulty using ECharts.
- **Smart Wizard**: Personalized recommendations via a step-by-step preference collection and intelligent matching algorithm.
- **University Comparison**: Compare up to 4 universities side-by-side with detailed program and fee analysis.
- **Detailed Profiles**: Comprehensive university info, including programs, facilities, admission requirements, and fees.

<h2> Tech Stack</h2>

**Frontend**

![technologies](https://skillicons.dev/icons?i=react,vite,tailwind,js,html,css&perline=10)

**Backend**

![technologies](https://skillicons.dev/icons?i=fastapi,python,sqlite&perline=10)

**Tools**

![technologies](https://skillicons.dev/icons?i=npm,vscode,git,github,postman,bash,docker&perline=20)

**Data & Visualization**

![technologies](https://skillicons.dev/icons?i=echarts&perline=10)


<h2> Quick Start</h2>

### Prerequisites
- **Node.js 18+** and npm
- **Python 3.8+** and pip
- **Git**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd stack.uni-repo
   ```

2. **Start Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Start Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Initialize Data**:
   ```bash
   curl -X POST http://127.0.0.1:8000/scrape/refresh
   ```

**Access at: http://localhost:5173**

<h2> Installation</h2>

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Create virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

<h2> Configuration</h2>

### Backend Configuration
**Database** (`backend/app/database.py`):
```python
# Development (SQLite)
DATABASE_URL = "sqlite:///./universities_db.sqlite"
# Production (PostgreSQL example)
# DATABASE_URL = "postgresql://user:password@host:port/database"
```

**CORS** (`backend/app/main.py`):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Frontend Configuration
**API** (`frontend/src/services/api.js`):
```javascript
const API_BASE_URL = 'http://127.0.0.1:8000';
```

**Vite** (`frontend/vite.config.js`):
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
```

<h2> API Documentation</h2>

**Base URL**: `http://127.0.0.1:8000`

### Endpoints
- **Universities**:
  ```http
  GET /universities/              # List all universities
  GET /universities/{id}          # Get university by ID
  ```
- **Insights**:
  ```http
  GET /insights/regions          # Universities by region
  GET /insights/types            # Universities by type
  GET /insights/difficulty       # Universities by admission difficulty
  ```
- **Wizard**:
  ```http
  POST /wizard/recommendations   # Get personalized recommendations
  ```
- **Data Management**:
  ```http
  POST /scrape/                  # Add new universities
  POST /scrape/refresh           # Refresh all university data
  ```

**Interactive Docs**:
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

<h2> University Data</h2>

- **30+ Universities**: Covers 12 public (TCU-regulated) and 18 private (NACTE and others) across 9 regions.
- **Data Sources**: TCU, NACTE, and official university websites.
- **Information**:
  - Basic info (name, acronym, location, type)
  - Financial details (fees)
  - Academic programs (degrees, duration, difficulty)
  - Facilities and campus resources
  - Admission requirements and career prospects
- **Sample Universities**:
  - University of Dar es Salaam (UDSM)
  - Sokoine University of Agriculture (SUA)
  - Aga Khan University (AKU)
  - Muhimbili University of Health and Allied Sciences (MUHAS)
  - St. Augustine University of Tanzania (SAUT)

<h2>Development</h2>

### Backend
- **Run with auto-reload**:
  ```bash
  uvicorn app.main:app --reload
  ```
- **Database Operations**:
  ```bash
  # Refresh data
  curl -X POST http://127.0.0.1:8000/scrape/refresh
  # Add universities
  curl -X POST http://127.0.0.1:8000/scrape/
  # Get insights
  curl http://127.0.0.1:8000/insights/regions
  ```
- **Testing Endpoints**:
  ```bash
  # List universities
  curl http://127.0.0.1:8000/universities/
  # Get university
  curl http://127.0.0.1:8000/universities/1
  # Get recommendations
  curl -X POST http://127.0.0.1:8000/wizard/recommendations \
    -H "Content-Type: application/json" \
    -d '{"region": "Dar es Salaam", "type": "Public"}'
  ```

### Frontend
- **Development server**:
  ```bash
  npm run dev
  ```
- **Build for production**:
  ```bash
  npm run build
  ```
- **Preview production build**:
  ```bash
  npm run preview
  ```
- **Linting**:
  ```bash
  npm run lint
  ```

<h2> Deployment</h2>

### Backend
- **Production WSGI Server**:
  ```bash
  pip install gunicorn
  gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
  ```
- **Environment Variables**:
  ```bash
  export DATABASE_URL="postgresql://user:pass@host:port/db"
  export CORS_ORIGINS="https://yourdomain.com"
  ```

### Frontend
- **Build for production**:
  ```bash
  npm run build
  ```
- **Serve static files**:
  ```bash
  npm install -g serve
  serve -s dist
  ```

### Docker (Optional)
- **Backend Dockerfile**:
  ```dockerfile
  FROM python:3.9
  WORKDIR /app
  COPY requirements.txt .
  RUN pip install -r requirements.txt
  COPY . .
  CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
  ```
- **Frontend Dockerfile**:
  ```dockerfile
  FROM node:18 AS build
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build
  FROM nginx:alpine
  COPY --from=build /app/dist /usr/share/nginx/html
  ```

<h2> Contributing</h2>

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Submit a pull request
5. Follow **Code Style**: ESLint (frontend), PEP 8 (backend), and descriptive commit messages.

**Adding Universities**:
- Update `backend/app/routes/scrape.py`
- Run `POST /scrape/refresh`
- Verify data in frontend

<h2> License</h2>

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

<h2>Support</h2>

- **Frontend not connecting**: Check backend port (8000), CORS, and API base URL.
- **Database errors**: Verify SQLite permissions and run `POST /scrape/refresh`.
- **Empty university list**: Check backend logs and run scraper.
- **Help**: Review API docs at `http://127.0.0.1:8000/docs` or create an issue.


<h2>☕️ Support the Project</h2>
<p>
    <a href="https://www.buymeacoffee.com/zuck30" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" height="30px" ></a>
</p>
