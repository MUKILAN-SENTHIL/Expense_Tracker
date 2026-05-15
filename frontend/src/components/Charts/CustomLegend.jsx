import React from "react";

const CustomLegend = ({ payload }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload.map((entry, index) => ( // Fixed: Replaced brackets with implicit parenthetical return
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          {/* Fixed: Corrected 'roudend-full' spelling to 'rounded-full' */}
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {/* Fixed: Corrected 'font-meduim' typo to 'font-medium' */}
          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
