
import { useState } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';
import SearchBar from '../ui/SearchBar';

interface HeroSectionProps {
  onSearch: (query: string, location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <div className="relative bg-gradient-to-br from-gamesetDark to-black py-16 md:py-24">
      {/* Background overlay with slight pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="gameset-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Reserve Quadras <span className="text-gamesetGreen">Instantaneamente</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Encontre e reserve sua quadra perfeita em segundos, sem o incômodo de ligações ou comunicação direta.
          </p>

          {/* Feature icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center text-white">
              <Search size={20} className="text-gamesetGreen mr-2" />
              <span>Encontre quadras próximas</span>
            </div>
            <div className="flex items-center text-white">
              <Calendar size={20} className="text-gamesetGreen mr-2" />
              <span>Reserve em poucos cliques</span>
            </div>
            <div className="flex items-center text-white">
              <MapPin size={20} className="text-gamesetGreen mr-2" />
              <span>Navegação GPS</span>
            </div>
          </div>

          {/* Search form */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
