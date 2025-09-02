// frontend/src/contexts/UniversityContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { universityService } from '../services/api';

const UniversityContext = createContext();

export function UniversityProvider({ children }) {
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonList, setComparisonList] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardPreferences, setWizardPreferences] = useState({});

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await universityService.fetchUniversities();
        setUniversities(data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUniversities();
  }, []);

  const addToComparison = (id) => {
    if (comparisonList.includes(id)) {
      setComparisonList(comparisonList.filter(item => item !== id));
    } else if (comparisonList.length < 4) {
      setComparisonList([...comparisonList, id]);
    }
  };

  const updateData = async () => {
    try {
      setIsLoading(true);
      await universityService.updateData();
      const data = await universityService.fetchUniversities();
      setUniversities(data);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UniversityContext.Provider value={{
      universities,
      isLoading,
      comparisonList,
      addToComparison,
      updateData,
      currentView,
      setCurrentView,
      wizardStep,
      setWizardStep,
      wizardPreferences,
      setWizardPreferences
    }}>
      {children}
    </UniversityContext.Provider>
  );
}

export const useUniversity = () => useContext(UniversityContext);