
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
            Book Sports Courts <span className="text-gamesetGreen">Instantly</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Find and reserve your perfect court in seconds, without the hassle of phone calls or direct communication.
          </p>

          {/* Feature icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center text-white">
              <Search size={20} className="text-gamesetGreen mr-2" />
              <span>Find nearby courts</span>
            </div>
            <div className="flex items-center text-white">
              <Calendar size={20} className="text-gamesetGreen mr-2" />
              <span>Book in few clicks</span>
            </div>
            <div className="flex items-center text-white">
              <MapPin size={20} className="text-gamesetGreen mr-2" />
              <span>GPS navigation</span>
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
