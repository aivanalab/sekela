// frontend/src/pages/WizardPage.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUniversity } from '../contexts/UniversityContext';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SparklesIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CheckIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    title: "Preferred region?",
    subtitle: "Where would you like to study?",
    icon: MapPinIcon
  },
  {
    title: "University type?",
    subtitle: "What kind of institution interests you?",
    icon: BuildingOfficeIcon
  },
  {
    title: "Annual budget (TZS)?",
    subtitle: "What's your comfortable budget range?",
    icon: BanknotesIcon
  },
  {
    title: "Academic interest?",
    subtitle: "What field excites you most?",
    icon: AcademicCapIcon
  },
  {
    title: "Preferred difficulty?",
    subtitle: "How challenging do you want your studies?",
    icon: ChartBarIcon
  }
];

export default function WizardPage() {
  const { universities, setCurrentView } = useUniversity();
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  
  const regions = ['Any', ...new Set(universities.map(u => u.region))];
  const types = ['Any', 'Public', 'Private'];
  const interests = ['Any', 'STEM', 'Humanities', 'Business', 'Health Sciences', 'Agriculture', 'Law', 'Education'];
  const difficulties = ['Any', 'Low', 'Medium', 'High', 'Very High'];
  
  const handleNext = async () => {
    if (step < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setShowResults(true);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const resetWizard = () => {
    setShowResults(false);
    setStep(0);
    setPreferences({});
  };
  
  const getRecommendations = () => {
    let results = [...universities];
    
    if (preferences.region && preferences.region !== 'Any') {
      results = results.filter(u => u.region === preferences.region);
    }
    
    if (preferences.type && preferences.type !== 'Any') {
      results = results.filter(u => u.type === preferences.type);
    }
    
    if (preferences.max_fees) {
      results = results.filter(u => u.avg_fees <= preferences.max_fees);
    }
    
    if (preferences.difficulty && preferences.difficulty !== 'Any') {
      results = results.filter(u => u.difficulty === preferences.difficulty);
    }
    
    if (preferences.academic_interest && preferences.academic_interest !== 'Any') {
      const interestLower = preferences.academic_interest.toLowerCase();
      results = results.filter(u => 
        u.programs.some(p => 
          p.name.toLowerCase().includes(interestLower) ||
          (interestLower === 'stem' && 
           (p.name.toLowerCase().includes('science') || 
            p.name.toLowerCase().includes('technology') ||
            p.name.toLowerCase().includes('engineering') ||
            p.name.toLowerCase().includes('math'))) ||
          (interestLower === 'health sciences' && 
           (p.name.toLowerCase().includes('medicine') || 
            p.name.toLowerCase().includes('health') ||
            p.name.toLowerCase().includes('nursing')))
        )
      );
    }
    
    return results.sort((a, b) => {
      if (a.difficulty === b.difficulty) return 0;
      const order = ['Low', 'Medium', 'High', 'Very High'];
      return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
    });
  };
  
  const recommendations = showResults ? getRecommendations() : [];
  const progress = ((step + 1) / steps.length) * 100;
  const currentStep = steps[step];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Low': 'bg-green-100 text-green-700 border-green-200',
      'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'High': 'bg-orange-100 text-orange-700 border-orange-200',
      'Very High': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <SparklesIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Perfect University</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Answer a few questions and get personalized recommendations tailored just for you
          </p>
        </div>

        {!showResults ? (
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">
                  Step {step + 1} of {steps.length}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(progress)}% complete
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>

            {/* Question Card */}
            <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
              isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
            }`}>
              <div className="p-8">
                {/* Question Header */}
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-blue-100 rounded-xl mr-4">
                    <currentStep.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentStep.title}</h2>
                    <p className="text-gray-600 mt-1">{currentStep.subtitle}</p>
                  </div>
                </div>

                {/* Question Content */}
                <div className="mb-8">
                  {step === 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {regions.map(region => (
                        <button
                          key={region}
                          onClick={() => setPreferences({...preferences, region})}
                          className={`group relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                            preferences.region === region 
                              ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-102'
                          }`}
                        >
                          <span className={`font-medium ${
                            preferences.region === region ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {region}
                          </span>
                          {preferences.region === region && (
                            <CheckIcon className="absolute top-3 right-3 h-5 w-5 text-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {step === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {types.map(type => (
                        <button
                          key={type}
                          onClick={() => setPreferences({...preferences, type})}
                          className={`group relative p-6 rounded-2xl border-2 text-center transition-all duration-200 ${
                            preferences.type === type 
                              ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-102'
                          }`}
                        >
                          <div className={`text-lg font-semibold ${
                            preferences.type === type ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {type}
                          </div>
                          {preferences.type === type && (
                            <CheckIcon className="absolute top-3 right-3 h-5 w-5 text-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="relative">
                        <input
                          type="range"
                          min="1000000"
                          max="10000000"
                          step="500000"
                          value={preferences.max_fees || 3000000}
                          onChange={(e) => setPreferences({
                            ...preferences, 
                            max_fees: Number(e.target.value)
                          })}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                          <BanknotesIcon className="h-6 w-6 text-green-600 mr-3" />
                          <div>
                            <div className="text-2xl font-bold text-gray-900">
                              {(preferences.max_fees || 3000000).toLocaleString()} TZS
                            </div>
                            <div className="text-sm text-gray-600">per year</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step === 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {interests.map(interest => (
                        <button
                          key={interest}
                          onClick={() => setPreferences({
                            ...preferences, 
                            academic_interest: interest
                          })}
                          className={`group relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                            preferences.academic_interest === interest 
                              ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-102'
                          }`}
                        >
                          <span className={`font-medium ${
                            preferences.academic_interest === interest ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {interest}
                          </span>
                          {preferences.academic_interest === interest && (
                            <CheckIcon className="absolute top-3 right-3 h-5 w-5 text-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {step === 4 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {difficulties.map(difficulty => (
                        <button
                          key={difficulty}
                          onClick={() => setPreferences({
                            ...preferences, 
                            difficulty
                          })}
                          className={`group relative p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                            preferences.difficulty === difficulty 
                              ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-102'
                          }`}
                        >
                          <span className={`font-medium ${
                            preferences.difficulty === difficulty ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                            {difficulty}
                          </span>
                          {preferences.difficulty === difficulty && (
                            <CheckIcon className="absolute top-3 right-3 h-5 w-5 text-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBack}
                    disabled={step === 0}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      step === 0 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <ChevronLeftIcon className="h-5 w-5 mr-2" />
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    {step === steps.length - 1 ? (
                      <>
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Get My Matches
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRightIcon className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className={`transition-all duration-500 ${showResults ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Matches</h2>
              <p className="text-gray-600">We found {recommendations.length} universities that match your preferences</p>
            </div>

            {recommendations.length === 0 ? (
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 text-center">
                  <div className="mb-4">
                    <MagnifyingGlassIcon className="h-12 w-12 text-yellow-500 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">No matches found</h3>
                  <p className="text-yellow-700 mb-6">
                    Try adjusting your preferences to see more options
                  </p>
                  <button
                    onClick={resetWizard}
                    className="flex items-center justify-center w-full px-6 py-3 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors duration-200"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-2" />
                    Start Over
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 mb-8">
                {recommendations.slice(0, 5).map((uni, index) => (
                  <div 
                    key={uni.id} 
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-102"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {uni.name}
                        </h3>
                        <span className="text-blue-600 font-semibold">({uni.acronym})</span>
                        <p className="text-gray-600 mt-2 flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {uni.region} • {uni.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          #{index + 1}
                        </div>
                        <div className="text-sm text-gray-500">Match</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(uni.difficulty)}`}>
                        {uni.difficulty} Difficulty
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                        {uni.avg_fees.toLocaleString()} TZS/year
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        navigate(`/university/${uni.id}`);
                        setCurrentView('explore');
                      }}
                      className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105"
                    >
                      View Details
                      <ChevronRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={resetWizard}
                className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Start Over
              </button>
              
              <button
                onClick={() => navigate('/explore')}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Explore All
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #6366f1);
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #6366f1);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}