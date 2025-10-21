import { useUniversity } from '../contexts/UniversityContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  AcademicCapIcon, 
  ChartBarIcon, 
  SparklesIcon, 
  ArrowRightIcon,
  CloudArrowDownIcon,
  CheckCircleIcon,
  MapPinIcon,
  UsersIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const { updateData } = useUniversity();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleUpdateData = async () => {
    setIsUpdating(true);
    try {
      await updateData();
    } finally {
      setIsUpdating(false);
    }
  };

  const features = [
    {
      icon: AcademicCapIcon,
      title: "Smart University Discovery",
      description: "Algorithimic recommendations based on your academic goals and preferences"
    },
    {
      icon: ChartBarIcon,
      title: "Comprehensive Comparisons",
      description: "Compare universities across multiple dimensions with interactive visualizations"
    },
    {
      icon: SparklesIcon,
      title: "Personalized Matching",
      description: "Find your perfect university match with our intelligent wizard"
    }
  ];

  const stats = [
    { label: "Universities", value: "50+", icon: AcademicCapIcon },
    { label: "Programs", value: "500+", icon: BookOpenIcon },
    { label: "Students Helped", value: "5K", icon: UsersIcon },
    { label: "Regions Covered", value: "26", icon: MapPinIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.1 - 100,
            top: mousePosition.y * 0.1 - 100,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-bounce" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-blue-700 text-sm font-medium border border-blue-200/50 backdrop-blur-sm">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Discover Your Academic Future
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block bg-gradient-to-r from-emerald-600 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                  sekela
                </span>
                <span className="block text-gray-900 mt-2">
                  University Guide
                </span>
              </h1>
              
              <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-600 leading-relaxed">
                Your intelligent guide to Tanzanian universities. Discover, compare, and make 
                <span className="text-blue-600 font-semibold"> data-driven decisions</span> about your academic future.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button 
                onClick={() => navigate('/wizard')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Find Your Perfect Match
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
              
              <button 
                onClick={() => navigate('/explore')}
                className="group px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center">
                  <AcademicCapIcon className="w-5 h-5 mr-2" />
                  Explore All Universities
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose sekela?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with comprehensive data to help you make the best educational decisions
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group relative p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop&crop=center"
              alt="Students studying at university in Tanzania" 
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1200x600/4f46e5/ffffff?text=Tanzanian+Universities';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">
                  <br></br><br></br><br></br>
                  Empowering Tanzanian Students</h3>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Data Section */}
      <div className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 rounded-3xl border border-blue-200/50 shadow-lg backdrop-blur-sm">
            <div className="absolute top-4 right-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl text-white mb-6">
                <CloudArrowDownIcon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Stay Up-to-Date
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Get the latest university information directly from the Tanzania Commission for Universities (TCU). 
                Fresh data means better decisions for your future.
              </p>
              
              <button 
                onClick={handleUpdateData}
                disabled={isUpdating}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isUpdating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Updating Data...
                  </>
                ) : (
                  <>
                    <CloudArrowDownIcon className="w-5 h-5 mr-2" />
                    Refresh University Data
                    <CheckCircleIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}