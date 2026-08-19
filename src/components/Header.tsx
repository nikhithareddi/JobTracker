import React from 'react';

interface HeaderProps {
  onAddClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm rounded-lg">
      <h1 className="text-xl font-bold text-gray-800">JobTracker</h1>
      <button
        onClick={onAddClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
      >
        + Add Application
      </button>
    </header>
  );
};