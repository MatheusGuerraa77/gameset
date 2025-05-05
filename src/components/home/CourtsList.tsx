
import { useState, useEffect } from 'react';
import CourtCard, { Court } from './CourtCard';
import CourtsMap from '../maps/CourtsMap';

interface CourtsListProps {
  sportFilter: string;
  searchQuery: string;
  searchLocation: string;
}

// Mock data
const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Campo de Futebol Vale Verde',
    location: 'Centro, 2.5 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1600679472829-3044539ce8ed?q=80&w=400',
    sportType: 'Futebol',
    rating: 4.8,
    pricePerHour: 35,
    availableToday: true
  },
  {
    id: '2',
    name: 'Quadra de Basquete Urbana',
    location: 'Zona Oeste, 1.8 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?q=80&w=400',
    sportType: 'Basquete',
    rating: 4.5,
    pricePerHour: 25,
    availableToday: true
  },
  {
    id: '3',
    name: 'Centro de Tênis Sunshine',
    location: 'Zona Leste, 3.2 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400',
    sportType: 'Tênis',
    rating: 4.9,
    pricePerHour: 40,
    availableToday: false
  },
  {
    id: '4',
    name: 'Arena de Vôlei de Praia',
    location: 'Área Costeira, 5.1 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400',
    sportType: 'Vôlei',
    rating: 4.7,
    pricePerHour: 30,
    availableToday: true
  },
  {
    id: '5',
    name: 'Centro de Futsal Indoor',
    location: 'Zona Norte, 2.3 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400',
    sportType: 'Futsal',
    rating: 4.6,
    pricePerHour: 45,
    availableToday: true
  },
  {
    id: '6',
    name: 'Quadra de Handebol Comunitária',
    location: 'Zona Sul, 1.5 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=400',
    sportType: 'Handebol',
    rating: 4.3,
    pricePerHour: 20,
    availableToday: false
  },
  {
    id: '7',
    name: 'Arena de Beach Tennis',
    location: 'Praia Grande, 4.2 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1623037854588-ef4b366bae51?q=80&w=400',
    sportType: 'Beach Tennis',
    rating: 4.7,
    pricePerHour: 50,
    availableToday: true
  },
  {
    id: '8',
    name: 'Centro de Futevôlei',
    location: 'Praia do Sol, 3.8 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1610805796122-f8e21cd640a6?q=80&w=400',
    sportType: 'Futevôlei',
    rating: 4.6,
    pricePerHour: 40,
    availableToday: true
  }
];

const CourtsList = ({ sportFilter, searchQuery, searchLocation }: CourtsListProps) => {
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(mockCourts);

  useEffect(() => {
    let filtered = [...mockCourts];
    
    // Apply sport filter
    if (sportFilter && sportFilter !== 'all') {
      filtered = filtered.filter(court => 
        court.sportType.toLowerCase() === sportFilter.toLowerCase()
      );
    }
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(court => 
        court.name.toLowerCase().includes(query) || 
        court.sportType.toLowerCase().includes(query)
      );
    }
    
    // Apply location filter (simplified for demo)
    if (searchLocation && searchLocation !== 'Localização atual') {
      const location = searchLocation.toLowerCase();
      filtered = filtered.filter(court => 
        court.location.toLowerCase().includes(location)
      );
    }
    
    setFilteredCourts(filtered);
  }, [sportFilter, searchQuery, searchLocation]);

  if (filteredCourts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">Nenhuma quadra encontrada</h3>
        <p className="mt-2 text-gray-500">Tente alterar seus filtros ou critérios de busca</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Map View */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Mapa de Quadras</h3>
        <CourtsMap courts={filteredCourts} height="400px" interactive={true} />
      </div>

      {/* List View */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Lista de Quadras</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map(court => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourtsList;
