import type { SortStep } from '../types';

interface CompletionStatsProps {
  currentStepData: SortStep;
  arrayLength: number;
}

export function CompletionStats({ currentStepData, arrayLength }: CompletionStatsProps) {
  const stats = [
    {
      value: currentStepData?.metadata?.comparisons || 0,
      label: 'Comparisons',
      icon: '⚖️',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-800'
    },
    {
      value: currentStepData?.metadata?.swaps || 0,
      label: 'Swaps',
      icon: '🔄',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'from-rose-50 to-rose-100',
      textColor: 'text-rose-800'
    },
    {
      value: arrayLength,
      label: 'Array Size',
      icon: '📊',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      textColor: 'text-emerald-800'
    },
    {
      value: currentStepData?.metadata?.executionTime ? 
        `${currentStepData.metadata.executionTime.toFixed(2)}ms` : 
        'N/A',
      label: 'Execution Time',
      icon: '⏱️',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-800'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 mb-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-2xl mb-4 animate-bounce">
            <span className="text-4xl">🎉</span>
          </div>
          <h3 className="text-3xl font-bold text-emerald-800 mb-2">Sorting Complete!</h3>
          <p className="text-emerald-600 text-lg">Algorithm execution finished successfully</p>
        </div>

        {/* Statistics grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`group relative overflow-hidden bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
              
              {/* Value */}
              <div className={`text-3xl font-bold ${stat.textColor} text-center mb-2`}>
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-center">
                <div className={`text-sm font-medium ${stat.textColor} opacity-80 uppercase tracking-wide`}>
                  {stat.label}
                </div>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>
        
        {/* Celebration message */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-emerald-200 shadow-lg">
            <span className="text-2xl animate-pulse">✨</span>
            <span className="text-emerald-700 font-medium">Well done! The array has been successfully sorted.</span>
            <span className="text-2xl animate-pulse">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
