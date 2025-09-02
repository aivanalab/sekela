// frontend/src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UniversityProvider } from './contexts/UniversityContext';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import ComparePage from './pages/ComparePage';
import InsightsPage from './pages/InsightsPage';
import WizardPage from './pages/WizardPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UniversityProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/university/:id" element={<UniversityDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/wizard" element={<WizardPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </BrowserRouter>
    </UniversityProvider>
  );
}

export default App;