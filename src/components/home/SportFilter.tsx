
import { useState } from 'react';

interface Venue {
  id: string;
  name: string;
  icon: string;
  sports: string[];
}

interface SportFilterProps {
  onFilterChange: (sportId: string) => void;
}

const SportFilter = ({ onFilterChange }: SportFilterProps) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const venues: Venue[] = [
    { id: 'all', name: 'Todas as Quadras', icon: '🏆', sports: ['Todos'] },
    { id: 'Arena Branco', name: 'Arena Branco', icon: '🎾', sports: ['Beach Tennis', 'Vôlei', 'Futevôlei'] },
    { id: 'CT Felipe Roman', name: 'CT Felipe Roman', icon: '🎾', sports: ['Beach Tennis'] },
    { id: 'Rondo Esporte Praia', name: 'Rondo Esporte Praia', icon: '🏐', sports: ['Beach Tennis', 'Vôlei', 'Futevôlei'] },
    { id: 'Arena Baly', name: 'Arena Baly', icon: '🏐', sports: ['Beach Tennis', 'Vôlei', 'Futevôlei'] },
    { id: 'Arena Brasil', name: 'Arena Brasil', icon: '🏐', sports: ['Beach Tennis', 'Vôlei', 'Futevôlei'] },
    { id: '3L', name: '3L', icon: '🎾', sports: ['Beach Tennis', 'Tênis'] },
  ];

  const handleVenueClick = (venueId: string) => {
    setActiveFilter(venueId);
    onFilterChange(venueId);
  };

  const getSportsList = (sports: string[]) => {
    if (sports[0] === 'Todos') return '';
    return sports.join(', ');
  };

  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex space-x-2 min-w-max px-1">
        {venues.map((venue) => (
          <button
            key={venue.id}
            onClick={() => handleVenueClick(venue.id)}
            className={`
              flex flex-col items-center px-4 py-2 rounded-full transition-colors
              ${activeFilter === venue.id
                ? 'bg-gamesetGreen text-white shadow-md'
                : 'bg-white text-gamesetDark border border-gamesetGray/80 hover:bg-gamesetGray/30'
              }
            `}
          >
            <div className="flex items-center">
              <span className="mr-2">{venue.icon}</span>
              <span className="font-medium">{venue.name}</span>
            </div>
            {venue.id !== 'all' && (
              <span className="text-xs mt-1 max-w-48 text-center">
                {getSportsList(venue.sports)}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SportFilter;
