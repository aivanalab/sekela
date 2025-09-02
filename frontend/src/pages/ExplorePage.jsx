import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUniversity } from '../contexts/UniversityContext';
import UniversityCard from '../components/UniversityCard';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  XMarkIcon, 
  AdjustmentsHorizontalIcon,
  ArrowsUpDownIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function ExplorePage() {
  const { universities, isLoading, addToComparison, comparisonList } = useUniversity();
  const navigate = useNavigate();
  
  const [searchText, setSearchText] = useState('');
  const [region, setRegion] = useState('All Regions');
  const [type, setType] = useState('All Types');
  const [maxFees, setMaxFees] = useState(10000000);
  const [sortBy, setSortBy] = useState('Name (A-Z)');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  
  // Debounced search for better performance
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const filteredUnis = useMemo(() => {
    let result = [...universities];
    
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(uni => 
        uni.name.toLowerCase().includes(searchLower) ||
        uni.programs.some(p => p.name.toLowerCase().includes(searchLower))
      );
    }
    
    if (region !== 'All Regions') {
      result = result.filter(uni => uni.region === region);
    }
    
    if (type !== 'All Types') {
      result = result.filter(uni => uni.type === type);
    }
    
    result = result.filter(uni => uni.avg_fees <= maxFees);
    
    // Sorting logic
    result.sort((a, b) => {
      switch(sortBy) {
        case 'Name (A-Z)': return a.name.localeCompare(b.name);
        case 'Name (Z-A)': return b.name.localeCompare(a.name);
        case 'Fees (Low-High)': return a.avg_fees - b.avg_fees;
        case 'Fees (High-Low)': return b.avg_fees - a.avg_fees;
        default: return 0;
      }
    });
    
    return result;
  }, [universities, debouncedSearch, region, type, maxFees, sortBy]);

  const regions = useMemo(() => 
    ['All Regions', ...new Set(universities.map(u => u.region))], 
    [universities]
  );
  const types = ['All Types', 'Public', 'Private'];

  const resetFilters = () => {
    setSearchText('');
    setRegion('All Regions');
    setType('All Types');
    setMaxFees(10000000);
    setSortBy('Name (A-Z)');
  };

  const hasActiveFilters = searchText || region !== 'All Regions' || type !== 'All Types' || maxFees < 10000000;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Loading Universities</h3>
            <p className="text-sm text-gray-500">Finding the best options for you...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                Explore Universities
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Discover your perfect academic journey from {universities.length}+ institutions
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex space-x-4">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-white/20">
                <div className="text-2xl font-bold text-blue-600">{filteredUnis.length}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Results</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-white/20">
                <div className="text-2xl font-bold text-green-600">{comparisonList.length}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Comparing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search universities, programs, or keywords..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
                {searchText && (
                  <button
                    onClick={() => setSearchText('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  showFilters || hasActiveFilters
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {['Name (A-Z)', 'Name (Z-A)', 'Fees (Low-High)', 'Fees (High-Low)'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ArrowsUpDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showFilters ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-blue-600" />
                Advanced Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Region Filter */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <BuildingLibraryIcon className="h-4 w-4 mr-2 text-gray-400" />
                  University Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {types.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Fees Range */}
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium text-gray-700">
                  <span className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    Max Annual Fees
                  </span>
                  <span className="text-blue-600 font-semibold">
                    {(maxFees / 1000000).toFixed(1)}M TZS
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1000000"
                    max="10000000"
                    step="500000"
                    value={maxFees}
                    onChange={(e) => setMaxFees(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1M</span>
                    <span>5.5M</span>
                    <span>10M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
                Search Results
              </h2>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredUnis.length} {filteredUnis.length === 1 ? 'university' : 'universities'}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {filteredUnis.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">No universities found</h3>
                <p className="text-gray-500">
                  No universities match your current search criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnis.map((uni, index) => (
                <div
                  key={uni.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <UniversityCard 
                    university={uni}
                    isComparing={comparisonList.includes(uni.id)}
                    onCompare={() => addToComparison(uni.id)}
                    onViewDetails={() => navigate(`/university/${uni.id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for slider styling */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #782cfbff;
          cursor: pointer;
          box-shadow: 0 0 0 0 rgba(149, 59, 246, 0.5);
          transition: box-shadow 0.2s ease-in-out;
        }
        .slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 8px rgba(193, 59, 246, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #bd2cfbff;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 0 rgba(128, 59, 246, 0.5);
        }
      `}</style>
    </div>
  );
}