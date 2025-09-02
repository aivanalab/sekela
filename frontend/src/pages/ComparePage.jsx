import { useUniversity } from '../contexts/UniversityContext';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { 
  TrashIcon, 
  PlusIcon, 
  ScaleIcon, 
  StarIcon, 
  MapPinIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function ComparePage() {
  const { universities, comparisonList, addToComparison, clearComparison } = useUniversity();
  const navigate = useNavigate();
  const [selectedFeatures, setSelectedFeatures] = useState(new Set(['region', 'type', 'avg_fees', 'difficulty']));
  const [isAnimating, setIsAnimating] = useState(false);
  const tableRef = useRef(null);
  
  const comparisonUnis = universities.filter(u => comparisonList.includes(u.id));
  
  const allFeatures = [
    { 
      name: "Location", 
      key: "region", 
      icon: MapPinIcon,
      category: "Basic Info",
      format: (val) => val,
      priority: "high"
    },
    { 
      name: "Institution Type", 
      key: "type", 
      icon: BuildingLibraryIcon,
      category: "Basic Info",
      format: (val) => val,
      priority: "high"
    },
    { 
      name: "Average Fees", 
      key: "avg_fees", 
      icon: CurrencyDollarIcon,
      category: "Financial",
      format: (val) => `${val.toLocaleString()} TZS`,
      priority: "high"
    },
    { 
      name: "Difficulty Level", 
      key: "difficulty", 
      icon: ChartBarIcon,
      category: "Academic",
      format: (val) => val,
      priority: "high"
    },
    { 
      name: "Programs Offered", 
      key: "programs", 
      icon: AcademicCapIcon,
      category: "Academic",
      format: (val) => `${val.length} Programs`,
      priority: "medium"
    },
    { 
      name: "Campus Facilities", 
      key: "facilities", 
      icon: StarIcon,
      category: "Campus Life",
      format: (val) => val.join(", "),
      priority: "medium"
    },
    { 
      name: "Admission Requirements", 
      key: "admission_requirements", 
      icon: CheckCircleIcon,
      category: "Admission",
      format: (val) => val,
      priority: "low"
    }
  ];

  const categories = [...new Set(allFeatures.map(f => f.category))];

  const toggleFeature = (featureKey) => {
    const newSelected = new Set(selectedFeatures);
    if (newSelected.has(featureKey)) {
      newSelected.delete(featureKey);
    } else {
      newSelected.add(featureKey);
    }
    setSelectedFeatures(newSelected);
  };

  const handleClearAll = () => {
    setIsAnimating(true);
    setTimeout(() => {
      clearComparison?.() || addToComparison(comparisonList[0]);
      setIsAnimating(false);
      navigate('/explore');
    }, 300);
  };

  const removeFromComparison = (uniId) => {
    setIsAnimating(true);
    setTimeout(() => {
      addToComparison(uniId);
      setIsAnimating(false);
    }, 200);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'public': return 'text-blue-600 bg-blue-50';
      case 'private': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  useEffect(() => {
    if (tableRef.current && comparisonUnis.length > 0) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [comparisonUnis.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <ScaleIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  University Comparison
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Compare {comparisonUnis.length} universities side by side
                </p>
              </div>
            </div>
            
            {comparisonList.length > 0 && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/explore')}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add More
                </button>
                <button
                  onClick={handleClearAll}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl text-sm font-medium text-white hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Feature Filter */}
          {comparisonUnis.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-blue-500" />
                Customize Comparison
              </h3>
              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {allFeatures.filter(f => f.category === category).map(feature => (
                        <button
                          key={feature.key}
                          onClick={() => toggleFeature(feature.key)}
                          className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedFeatures.has(feature.key)
                              ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                              : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <feature.icon className="h-4 w-4 mr-2" />
                          {feature.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {comparisonUnis.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl border border-gray-100 p-12 shadow-sm max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ScaleIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Universities Selected</h3>
              <p className="text-gray-600 mb-6">
                Start comparing by adding universities from the explore page.
              </p>
              <button 
                onClick={() => navigate('/explore')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Explore Universities
              </button>
            </div>
          </div>
        ) : (
          <div ref={tableRef} className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            {/* Mobile Cards View */}
            <div className="block lg:hidden space-y-6">
              {comparisonUnis.map((uni, idx) => (
                <div key={uni.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{uni.acronym[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{uni.acronym}</h3>
                        <p className="text-sm text-gray-500">{uni.name}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromComparison(uni.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {allFeatures.filter(f => selectedFeatures.has(f.key)).map(feature => (
                      <div key={feature.key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <feature.icon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-lg ${
                          feature.key === 'difficulty' ? getDifficultyColor(uni[feature.key]) :
                          feature.key === 'type' ? getTypeColor(uni[feature.key]) :
                          'text-gray-600'
                        }`}>
                          {feature.format ? feature.format(uni[feature.key]) : uni[feature.key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4">
                        Feature
                      </th>
                      {comparisonUnis.map((uni, idx) => (
                        <th key={uni.id} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{uni.acronym[0]}</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{uni.acronym}</div>
                                <div className="text-xs text-gray-500 normal-case">{uni.name}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromComparison(uni.id)}
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {allFeatures.filter(f => selectedFeatures.has(f.key)).map((feature, idx) => (
                      <tr key={feature.key} className={`transition-colors duration-200 hover:bg-gray-50/50 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      }`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <feature.icon className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{feature.name}</div>
                              <div className="text-xs text-gray-500">{feature.category}</div>
                            </div>
                          </div>
                        </td>
                        {comparisonUnis.map(uni => (
                          <td key={`${uni.id}-${feature.key}`} className="px-6 py-4">
                            <div className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                              feature.key === 'difficulty' ? getDifficultyColor(uni[feature.key]) :
                              feature.key === 'type' ? getTypeColor(uni[feature.key]) :
                              'text-gray-700'
                            }`}>
                              {feature.format ? feature.format(uni[feature.key]) : uni[feature.key]}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Action Footer */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  Comparing <span className="font-semibold">{comparisonUnis.length}</span> universities across{' '}
                  <span className="font-semibold">{selectedFeatures.size}</span> features
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
                  >
                    Print Comparison
                  </button>
                  <button
                    onClick={() => navigate('/explore')}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
                  >
                    Add More Universities
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}