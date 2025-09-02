 # 🇹🇿 Tanzania University Explorer

A comprehensive web application for exploring universities and higher education institutions in Tanzania. This platform helps prospective students discover, compare, and make informed decisions about their university choices.

![Tanzania University Explorer](https://img.shields.io/badge/Tanzania-University%20Explorer-blue?style=for-the-badge&logo=graduation-cap)
![Universities](https://img.shields.io/badge/Universities-30+-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [University Data](#-university-data)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🏠 **Homepage**
- Beautiful landing page with hero section
- Quick stats and featured universities
- Easy navigation to all features

### 🔍 **University Explorer**
- Browse 30+ Tanzanian universities
- Advanced search and filtering system
- Filter by region, type, fees, and difficulty
- Detailed university profiles with programs and facilities
- Interactive university cards with comparison features

### 📊 **Data Insights**
- Interactive charts showing university distribution
- Regional analysis across Tanzania
- Public vs Private institution breakdown
- Admission difficulty statistics
- Real-time data visualization with ECharts

### 🧙‍♀️ **Smart Wizard**
- Personalized university recommendations
- Step-by-step preference collection
- Intelligent matching algorithm
- Results ranked by compatibility
- Detailed match explanations

### ⚖️ **University Comparison**
- Side-by-side university comparison
- Compare up to 4 universities simultaneously
- Detailed program and facility comparison
- Fee structure analysis
- Easy comparison management

### 🏛️ **Detailed University Profiles**
- Comprehensive university information
- Program listings with duration and prospects
- Facility information and campus details
- Admission requirements and procedures
- Fee structures and financial information

## 🛠 Tech Stack

### **Frontend**
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **ECharts & echarts-for-react** - Interactive data visualization
- **React Hot Toast** - Beautiful notifications
- **Heroicons** - Beautiful SVG icons

### **Backend**
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Python SQL toolkit and ORM
- **SQLite** - Lightweight database (development)
- **Pydantic** - Data validation using Python type hints
- **BeautifulSoup4** - Web scraping library
- **Requests** - HTTP library for Python
- **PyPDF2** - PDF processing for data extraction
- **Uvicorn** - ASGI web server

### **Development Tools**
- **ESLint** - JavaScript linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
stack.uni-repo/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── UniversityCard.jsx
│   │   ├── contexts/         # React context providers
│   │   │   └── UniversityContext.jsx
│   │   ├── pages/            # Main page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ExplorePage.jsx
│   │   │   ├── InsightsPage.jsx
│   │   │   ├── WizardPage.jsx
│   │   │   ├── ComparePage.jsx
│   │   │   └── UniversityDetailPage.jsx
│   │   ├── services/         # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies and scripts
│   └── vite.config.js        # Vite configuration
├── backend/                  # FastAPI backend application
│   ├── app/
│   │   ├── routes/           # API route handlers
│   │   │   ├── universities.py
│   │   │   ├── wizard.py
│   │   │   ├── insights.py
│   │   │   └── scrape.py
│   │   ├── models.py         # Database models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── database.py       # Database configuration
│   │   ├── crud.py           # Database operations
│   │   ├── utils.py          # Utility functions
│   │   └── main.py           # FastAPI app entry point
│   └── requirements.txt      # Python dependencies
├── README.md                 # Project documentation
└── architecture.txt         # System architecture notes
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Python 3.8+** and pip
- **Git**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd stack.uni-repo
```

### 2. Start Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Initialize Data
```bash
curl -X POST http://127.0.0.1:8000/scrape/refresh
```

**🌐 Access the application at: http://localhost:5173**

## 📦 Installation

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### Backend Configuration

**Database Configuration** (`backend/app/database.py`):
```python
# Development (SQLite)
DATABASE_URL = "sqlite:///./universities_db.sqlite"

# Production (PostgreSQL example)
# DATABASE_URL = "postgresql://user:password@host:port/database"
```

**CORS Configuration** (`backend/app/main.py`):
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

**API Configuration** (`frontend/src/services/api.js`):
```javascript
const API_BASE_URL = 'http://127.0.0.1:8000';
```

**Vite Configuration** (`frontend/vite.config.js`):
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

## 📚 API Documentation

### Base URL
```
http://127.0.0.1:8000
```

### Authentication
No authentication required for current endpoints.

### Endpoints

#### **Universities**
```http
GET /universities/              # List all universities
GET /universities/{id}          # Get university by ID
```

#### **Insights**
```http
GET /insights/regions          # Universities by region
GET /insights/types            # Universities by type (Public/Private)
GET /insights/difficulty       # Universities by admission difficulty
```

#### **Wizard**
```http
POST /wizard/recommendations   # Get personalized recommendations
```

#### **Data Management**
```http
POST /scrape/                  # Add new universities (incremental)
POST /scrape/refresh           # Clear and refresh all university data
```

### Interactive API Docs
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

## 🏛️ University Data

### Current Database
- **30+ Tanzanian Universities**
- **12 Public Universities** (TCU regulated)
- **18 Private Universities** (NACTE and private institutions)
- **9 Regions** covered across Tanzania

### Data Sources
- **Tanzania Commission for Universities (TCU)** - Public universities
- **National Council for Technical and Vocational Education and Training (NACTE)** - Private institutions
- **Official university websites and documentation**

### University Information Includes:
- Basic information (name, acronym, location, type)
- Financial details (fee structures)
- Academic programs (degrees, duration, difficulty)
- Facilities and campus resources
- Admission requirements
- Career prospects for graduates

### Sample Universities:
- **University of Dar es Salaam (UDSM)** - Public
- **Sokoine University of Agriculture (SUA)** - Public
- **Aga Khan University (AKU)** - Private
- **Muhimbili University of Health and Allied Sciences (MUHAS)** - Public
- **St. Augustine University of Tanzania (SAUT)** - Private

## 🧪 Development

### Backend Development

**Run with auto-reload:**
```bash
uvicorn app.main:app --reload
```

**Database Operations:**
```bash
# Refresh university data
curl -X POST http://127.0.0.1:8000/scrape/refresh

# Add new universities
curl -X POST http://127.0.0.1:8000/scrape/

# Get insights
curl http://127.0.0.1:8000/insights/regions
```

**Testing API Endpoints:**
```bash
# List all universities
curl http://127.0.0.1:8000/universities/

# Get specific university
curl http://127.0.0.1:8000/universities/1

# Get recommendations (POST with JSON)
curl -X POST http://127.0.0.1:8000/wizard/recommendations \
  -H "Content-Type: application/json" \
  -d '{"region": "Dar es Salaam", "type": "Public"}'
```

### Frontend Development

**Development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Linting:**
```bash
npm run lint
```

### Common Development Tasks

**Adding New Universities:**
1. Update the university data in `backend/app/routes/scrape.py`
2. Run the refresh endpoint: `POST /scrape/refresh`
3. Verify data in frontend

**Adding New Features:**
1. Create backend endpoint in appropriate route file
2. Add API service method in `frontend/src/services/api.js`
3. Update frontend components to use new functionality

## 🚀 Deployment

### Backend Deployment

**Production WSGI Server:**
```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

**Environment Variables:**
```bash
export DATABASE_URL="postgresql://user:pass@host:port/db"
export CORS_ORIGINS="https://yourdomain.com"
```

### Frontend Deployment

**Build for production:**
```bash
npm run build
```

**Serve static files:**
```bash
npm install -g serve
serve -s dist
```

### Docker Deployment (Optional)

**Backend Dockerfile:**
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Frontend Dockerfile:**
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

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- **Frontend**: Follow ESLint configuration
- **Backend**: Follow PEP 8 Python style guide
- **Commits**: Use descriptive commit messages

### Adding Universities
To add more universities to the database:
1. Update the data arrays in `backend/app/routes/scrape.py`
2. Ensure data follows the existing schema
3. Test with the refresh endpoint

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Frontend not connecting to backend:**
- Ensure backend is running on port 8000
- Check CORS configuration in backend
- Verify API base URL in frontend configuration

**Database errors:**
- Check database file permissions
- Ensure SQLite is available
- Run database refresh: `POST /scrape/refresh`

**Empty university list:**
- Run the data scraper: `POST /scrape/refresh`
- Check backend logs for errors
- Verify database connection

### Getting Help
- Check the [API documentation](http://127.0.0.1:8000/docs)
- Review the project structure above
- Create an issue for bugs or feature requests

## 🌟 Acknowledgments

- **Tanzania Commission for Universities (TCU)** - Official university data source
- **National Council for Technical and Vocational Education and Training (NACTE)** - Private institution data
- **React Community** - Frontend framework and ecosystem
- **FastAPI Community** - Backend framework and tools

---

**Built with ❤️ for Tanzanian students and educators**

*Empowering educational choices through technology* 🇹🇿
