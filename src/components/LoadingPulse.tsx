import React from 'react';
import { BookOpen } from 'lucide-react';

export function LoadingPulse() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="rounded-full bg-gray-200 h-10 w-10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-6 w-20 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <div className="mt-4">
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}