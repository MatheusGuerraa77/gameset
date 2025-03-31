
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // For a real app, we would reverse geocode here
          setLocation('Current location');
        },
        error => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courts, sport types..."
            className="input-field pl-10"
          />
        </div>
        
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="input-field pl-10 pr-32"
          />
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gamesetGreen hover:text-gamesetGreen/80 text-sm font-medium"
          >
            Use current location
          </button>
        </div>
        
        <button type="submit" className="btn-primary">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
