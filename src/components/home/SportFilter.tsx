
import { useState } from 'react';

interface Sport {
  id: string;
  name: string;
  icon: string;
}

interface SportFilterProps {
  onFilterChange: (sportId: string) => void;
}

const SportFilter = ({ onFilterChange }: SportFilterProps) => {
  const [activeSport, setActiveSport] = useState('all');

  const sports: Sport[] = [
    { id: 'all', name: 'All Sports', icon: '🏆' },
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' },
    { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
    { id: 'futsal', name: 'Futsal', icon: '⚽' },
    { id: 'handball', name: 'Handball', icon: '🤾' },
  ];

  const handleSportClick = (sportId: string) => {
    setActiveSport(sportId);
    onFilterChange(sportId);
  };

  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex space-x-2 min-w-max px-1">
        {sports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => handleSportClick(sport.id)}
            className={`
              flex items-center px-4 py-2 rounded-full transition-colors
              ${activeSport === sport.id
                ? 'bg-gamesetGreen text-white shadow-md'
                : 'bg-white text-gamesetDark border border-gamesetGray/80 hover:bg-gamesetGray/30'
              }
            `}
          >
            <span className="mr-2">{sport.icon}</span>
            <span className="font-medium">{sport.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SportFilter;
