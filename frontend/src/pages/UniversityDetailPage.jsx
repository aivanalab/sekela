// frontend/src/pages/UniversityDetailPage.js
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUniversity } from '../contexts/UniversityContext';
import { 
  ChevronLeftIcon, 
  MapPinIcon, 
  AcademicCapIcon,
  CurrencyDollarIcon,
  ClockIcon,
  StarIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  UsersIcon,
  CheckCircleIcon,
  PlusIcon,
  MinusIcon,
  ShareIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

export default function UniversityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { universities, addToComparison, comparisonList } = useUniversity();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState(new Set());
  
  const university = universities.find(u => u.id === parseInt(id));
  
  if (!university) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <BuildingLibraryIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">University not found</h2>
          <p className="text-gray-600 mb-6">The university you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/explore')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const isComparing = comparisonList.includes(university.id);
  
  const toggleProgramExpansion = (index) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPrograms(newExpanded);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'text-green-600 bg-green-50 border-green-200',
      'Medium': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'Hard': 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpenIcon },
    { id: 'programs', label: 'Programs', icon: AcademicCapIcon },
    { id: 'admissions', label: 'Admissions', icon: CheckCircleIcon },
    { id: 'facilities', label: 'Facilities', icon: BuildingLibraryIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="py-4">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>

          {/* University Header */}
          <div className="pb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {university.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {university.name}
                    </h1>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{university.location}, {university.region}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(university.difficulty)}`}>
                        {university.difficulty}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        {university.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  {isBookmarked ? (
                    <HeartSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                <button className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                  <ShareIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => addToComparison(university.id)}
                  className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isComparing 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isComparing ? (
                    <>
                      <MinusIcon className="w-4 h-4 mr-2" />
                      Remove from Compare
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add to Compare
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <CurrencyDollarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-blue-600">Average Fees</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {university.avg_fees.toLocaleString()} TZS
                    </p>
                    <p className="text-sm text-blue-600">per year</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-600 rounded-xl">
                    <AcademicCapIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-green-600">Programs</p>
                    <p className="text-2xl font-bold text-green-900">
                      {university.programs.length}
                    </p>
                    <p className="text-sm text-green-600">available</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-600 rounded-xl">
                    <BuildingLibraryIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600">Facilities</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {university.facilities.length}
                    </p>
                    <p className="text-sm text-purple-600">available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="h-5 w-5 mr-2" />
                  {label}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About {university.name}</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {university.description}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Programs Offered</h2>
              {university.programs.length > 0 ? (
                <div className="space-y-4">
                  {university.programs.map((program, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="inline-flex items-center text-sm text-gray-600">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {program.duration} years
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.program_difficulty)}`}>
                                {program.program_difficulty}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleProgramExpansion(index)}
                            className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            {expandedPrograms.has(index) ? (
                              <MinusIcon className="h-5 w-5 text-gray-600" />
                            ) : (
                              <PlusIcon className="h-5 w-5 text-gray-600" />
                            )}
                          </button>
                        </div>
                        
                        {expandedPrograms.has(index) && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="bg-gray-50 rounded-xl p-4">
                              <h4 className="font-medium text-gray-900 mb-2">Career Prospects</h4>
                              <p className="text-gray-700">{program.prospects}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No program details available.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'admissions' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admission Requirements</h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 leading-relaxed">{university.admission_requirements}</p>
                  <div className="mt-4 p-4 bg-blue-600 rounded-lg">
                    <p className="text-blue-100 text-sm font-medium">
                      Pro Tip: Always check the university's official website for the most current and specific requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Facilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {university.facilities.map((facility, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 font-medium">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}