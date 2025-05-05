
import React from 'react';
import SearchBar from '@/components/ui/SearchBar';

interface CourtsHeaderProps {
  onSearch: (query: string, location: string) => void;
}

const CourtsHeader = ({ onSearch }: CourtsHeaderProps) => {
  return (
    <section className="bg-gamesetDark py-8">
      <div className="gameset-container">
        <h1 className="text-3xl font-bold text-white mb-6">Encontre Quadras</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default CourtsHeader;
