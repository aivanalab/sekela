// frontend/src/pages/InsightsPage.js
import { useUniversity } from '../contexts/UniversityContext';
import ReactECharts from 'echarts-for-react';

export default function InsightsPage() {
  const { universities } = useUniversity();
   
  // Prepare data for charts
  const regionData = universities.reduce((acc, uni) => {
    acc[uni.region] = (acc[uni.region] || 0) + 1;
    return acc;
  }, {});
   
  const typeData = universities.reduce((acc, uni) => {
    acc[uni.type] = (acc[uni.type] || 0) + 1;
    return acc;
  }, {});
   
  const difficultyOrder = ['Low', 'Medium', 'High', 'Very High'];
  const difficultyData = universities.reduce((acc, uni) => {
    acc[uni.difficulty] = (acc[uni.difficulty] || 0) + 1;
    return acc;
  }, {});

  // Enhanced chart options with professional styling
  const regionOptions = {
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 12,
      textStyle: { color: '#374151', fontSize: 12 }
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { 
      type: 'category',
      data: Object.keys(regionData),
      axisLabel: { 
        interval: 0, 
        rotate: 45,
        color: '#6b7280',
        fontSize: 11
      },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisTick: { lineStyle: { color: '#e5e7eb' } }
    },
    yAxis: { 
      type: 'value', 
      name: 'Universities',
      nameTextStyle: { color: '#6b7280', fontSize: 12 },
      axisLabel: { color: '#6b7280', fontSize: 11 },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: [{
      data: Object.values(regionData),
      type: 'bar',
      itemStyle: { 
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#1d4ed8' }
          ]
        },
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: { itemStyle: { color: '#2563eb' } }
    }]
  };

  const typeOptions = {
    tooltip: { 
      trigger: 'item', 
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 12,
      textStyle: { color: '#374151', fontSize: 12 }
    },
    legend: { 
      bottom: '5%', 
      left: 'center',
      textStyle: { color: '#6b7280', fontSize: 12 },
      itemGap: 20
    },
    series: [{
      name: 'University Type',
      type: 'pie',
      radius: ['45%', '75%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: { 
        label: { 
          show: true, 
          fontSize: 16, 
          fontWeight: 'bold',
          color: '#111827'
        },
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.3)' }
      },
      labelLine: { show: false },
      data: Object.entries(typeData).map(([name, value]) => ({
        value, name,
        itemStyle: {
          color: name === 'Public' ? 
            { type: 'linear', x: 0, y: 0, x2: 1, y2: 1, colorStops: [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#1e40af' }
            ]} :
            { type: 'linear', x: 0, y: 0, x2: 1, y2: 1, colorStops: [
              { offset: 0, color: '#22c55e' },
              { offset: 1, color: '#15803d' }
            ]}
        }
      }))
    }]
  };

  const difficultyOptions = {
    tooltip: { 
      trigger: 'axis', 
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 12,
      textStyle: { color: '#374151', fontSize: 12 }
    },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: { 
      type: 'category',
      data: difficultyOrder,
      axisLabel: { 
        interval: 0, 
        color: '#6b7280',
        fontSize: 11
      },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisTick: { lineStyle: { color: '#e5e7eb' } }
    },
    yAxis: { 
      type: 'value', 
      name: 'Universities',
      nameTextStyle: { color: '#6b7280', fontSize: 12 },
      axisLabel: { color: '#6b7280', fontSize: 11 },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: [{
      data: difficultyOrder.map(d => difficultyData[d] || 0),
      type: 'bar',
      itemStyle: { 
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#f97316' },
            { offset: 1, color: '#ea580c' }
          ]
        },
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: { itemStyle: { color: '#dc2626' } }
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Data Analytics
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              University Data Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive analysis and trends of the university landscape in Tanzania, 
              providing data-driven insights for informed decision making.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Universities</p>
                <p className="text-2xl font-bold text-gray-900">{universities.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-green-50 border border-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Regions Covered</p>
                <p className="text-2xl font-bold text-gray-900">{Object.keys(regionData).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Institution Types</p>
                <p className="text-2xl font-bold text-gray-900">{Object.keys(typeData).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Regional Distribution */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Universities by Region</h3>
                  <p className="text-sm text-gray-600">Geographic distribution across Tanzania</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ReactECharts option={regionOptions} style={{ height: '400px' }} />
            </div>
          </div>

          {/* Institution Types */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-100">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Institution Types</h3>
                  <p className="text-sm text-gray-600">Public vs private distribution</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ReactECharts option={typeOptions} style={{ height: '400px' }} />
            </div>
          </div>
        </div>

        {/* Difficulty Distribution - Full Width */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-orange-100">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">Admission Difficulty Distribution</h3>
                <p className="text-sm text-gray-600">University entry requirements analysis</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ReactECharts option={difficultyOptions} style={{ height: '400px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}