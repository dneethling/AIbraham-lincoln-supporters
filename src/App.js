import React, { useState, useMemo } from 'react';

const AnimatedStar = ({ isNew }) => (
  <div className={isNew ? 'animate-bounce' : ''}>
    <span className="inline-block animate-pulse" style={{color: 'white'}}>★</span>
  </div>
);

const USAFlag = () => {
  const [supporters, setSupporters] = useState(0);
  const targetPopulation = 332000000;

  const addSupporter = () => setSupporters(prev => Math.min(prev + 1, targetPopulation));
  const removeSupporter = () => setSupporters(prev => Math.max(prev - 1, 0));
  const reset = () => setSupporters(0);

  const starField = useMemo(() => {
    const totalStars = supporters;
    const baseFontSize = Math.max(0.1, 4 - (Math.log10(totalStars) * 0.4));
    const gridWidth = Math.ceil(Math.sqrt(totalStars * (4/3)));
    const gridHeight = Math.ceil(Math.sqrt(totalStars * (3/4)));
    
    return (
      <div 
        className="grid w-full h-full place-items-center"
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
          gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
          fontSize: `${baseFontSize}px`
        }}
      >
        {Array(totalStars).fill().map((_, i) => (
          <AnimatedStar 
            key={i} 
            isNew={i === totalStars - 1}
          />
        ))}
      </div>
    );
  }, [supporters]);

  const renderStripes = () => (
    Array(13).fill().map((_, i) => (
      <div key={i} className={`h-4 w-full ${i % 2 === 0 ? 'bg-red-600' : 'bg-white'}`} />
    ))
  );

  const progress = ((supporters / targetPopulation) * 100).toFixed(6);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="aspect-[1.9] border border-gray-300 overflow-hidden">
        <div className="flex h-full">
          <div className="w-2/5 bg-blue-800 p-1">
            <div className="h-full">{starField}</div>
          </div>
          <div className="w-3/5">{renderStripes()}</div>
        </div>
      </div>
      
      <div className="mt-6 text-center space-y-4">
        <div className="space-x-2">
          <button
            onClick={addSupporter}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={supporters >= targetPopulation}>
            Add Supporter
          </button>
          <button
            onClick={removeSupporter}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            disabled={supporters <= 0}>
            Remove Supporter
          </button>
          <button
            onClick={reset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
            Reset
          </button>
        </div>
        <p>Progress: {progress}%</p>
        <p>Supporters: {supporters.toLocaleString()} / {targetPopulation.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default USAFlag;
