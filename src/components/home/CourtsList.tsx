
import { useState, useEffect } from 'react';
import CourtCard, { Court } from './CourtCard';
import CourtsMap from '../maps/CourtsMap';
import { MapPin, List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CourtsListProps {
  sportFilter: string;
  searchQuery: string;
  searchLocation: string;
}

// Updated mock data with venue filtering in mind
const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Arena Branco',
    location: 'Praia do Recreio, 3.2 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1623037854588-ef4b366bae51?q=80&w=400',
    sportType: 'Beach Tennis',
    rating: 4.8,
    pricePerHour: 45,
    availableToday: true
  },
  {
    id: '2',
    name: 'Arena Branco',
    location: 'Praia do Recreio, 3.2 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400',
    sportType: 'Vôlei',
    rating: 4.7,
    pricePerHour: 40,
    availableToday: true
  },
  {
    id: '3',
    name: 'Arena Branco',
    location: 'Praia do Recreio, 3.2 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1610805796122-f8e21cd640a6?q=80&w=400',
    sportType: 'Futevôlei',
    rating: 4.9,
    pricePerHour: 50,
    availableToday: true
  },
  {
    id: '4',
    name: 'CT Felipe Roman',
    location: 'Barra da Tijuca, 5.5 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1623037854588-ef4b366bae51?q=80&w=400',
    sportType: 'Beach Tennis',
    rating: 4.6,
    pricePerHour: 55,
    availableToday: false
  },
  {
    id: '5',
    name: 'Rondo Esporte Praia',
    location: 'Ipanema, 7.2 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1623037854588-ef4b366bae51?q=80&w=400',
    sportType: 'Beach Tennis',
    rating: 4.7,
    pricePerHour: 60,
    availableToday: true
  },
  {
    id: '6',
    name: 'Rondo Esporte Praia',
    location: 'Ipanema, 7.2 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400',
    sportType: 'Vôlei',
    rating: 4.5,
    pricePerHour: 55,
    availableToday: true
  },
  {
    id: '7',
    name: 'Rondo Esporte Praia',
    location: 'Ipanema, 7.2 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1610805796122-f8e21cd640a6?q=80&w=400',
    sportType: 'Futevôlei',
    rating: 4.6,
    pricePerHour: 65,
    availableToday: false
  },
  {
    id: '8',
    name: 'Arena Baly',
    location: 'Leblon, 8.4 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1610805796122-f8e21cd640a6?q=80&w=400',
    sportType: 'Futevôlei',
    rating: 4.9,
    pricePerHour: 70,
    availableToday: true
  },
  {
    id: '9',
    name: 'Arena Baly',
    location: 'Leblon, 8.4 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1623037854588-ef4b366bae51?q=80&w=400',
    sportType: 'Beach Tennis',
    rating: 5.0,
    pricePerHour: 75,
    availableToday: true
  },
  {
    id: '10',
    name: 'Arena Baly',
    location: 'Leblon, 8.4 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400',
    sportType: 'Vôlei',
    rating: 4.8,
    pricePerHour: 65,
    availableToday: true
  },
  {
    id: '11',
    name: 'Arena Brasil',
    location: 'Copacabana, 6.7 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1623037854588-ef4b366bae51?q=80&w=400',
    sportType: 'Beach Tennis',
    rating: 4.7,
    pricePerHour: 50,
    availableToday: true
  },
  {
    id: '12',
    name: 'Arena Brasil',
    location: 'Copacabana, 6.7 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1610805796122-f8e21cd640a6?q=80&w=400',
    sportType: 'Futevôlei',
    rating: 4.6,
    pricePerHour: 55,
    availableToday: true
  },
  {
    id: '13',
    name: 'Arena Brasil',
    location: 'Copacabana, 6.7 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400',
    sportType: 'Vôlei',
    rating: 4.5,
    pricePerHour: 50,
    availableToday: false
  },
  {
    id: '14',
    name: '3L',
    location: 'Barra da Tijuca, 4.8 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1623037854588-ef4b366bae51?q=80&w=400',
    sportType: 'Beach Tennis',
    rating: 4.7,
    pricePerHour: 65,
    availableToday: true
  },
  {
    id: '15',
    name: '3L',
    location: 'Barra da Tijuca, 4.8 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400',
    sportType: 'Tênis',
    rating: 4.8,
    pricePerHour: 70,
    availableToday: true
  }
];

const CourtsList = ({ sportFilter, searchQuery, searchLocation }: CourtsListProps) => {
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(mockCourts);
  const [viewType, setViewType] = useState<'list' | 'map'>('list');

  useEffect(() => {
    let filtered = [...mockCourts];
    
    // Apply venue filter
    if (sportFilter && sportFilter !== 'all') {
      filtered = filtered.filter(court => 
        court.name === sportFilter
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
      <Tabs defaultValue="list" onValueChange={(value) => setViewType(value as 'list' | 'map')}>
        <div className="flex justify-end mb-4">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <List size={16} />
              Lista
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-1">
              <MapPin size={16} />
              Mapa
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts.map(court => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="mt-0">
          <CourtsMap courts={filteredCourts} height="600px" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourtsList;
