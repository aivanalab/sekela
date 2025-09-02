// frontend/src/components/UniversityCard.js
export default function UniversityCard({ university, isComparing, onCompare, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5 h-full flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {university.name} 
          <span className="text-indigo-400"> ({university.acronym})</span>
        </h3>
        <p className="text-sm text-gray-500 mb-3">{university.region}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {university.type}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            {university.difficulty} Difficulty
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {university.description}
        </p>
        
        <div className="mt-auto flex justify-between">
          <button 
            onClick={onViewDetails}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Details
          </button>
          <button
            onClick={onCompare}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              isComparing 
                ? 'bg-gray-200 text-gray-700' 
                : 'bg-red-400 text-white hover:bg-red-500'
            }`}
          >
            {isComparing ? 'Remove' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
}