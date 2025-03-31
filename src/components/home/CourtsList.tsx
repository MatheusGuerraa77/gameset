
import { useState, useEffect } from 'react';
import CourtCard, { Court } from './CourtCard';

interface CourtsListProps {
  sportFilter: string;
  searchQuery: string;
  searchLocation: string;
}

// Mock data
const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Green Valley Soccer Field',
    location: 'Downtown, 2.5 km away',
    imageUrl: 'https://images.unsplash.com/photo-1600679472829-3044539ce8ed?q=80&w=400',
    sportType: 'Football',
    rating: 4.8,
    pricePerHour: 35,
    availableToday: true
  },
  {
    id: '2',
    name: 'Urban Basketball Court',
    location: 'West District, 1.8 km away',
    imageUrl: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?q=80&w=400',
    sportType: 'Basketball',
    rating: 4.5,
    pricePerHour: 25,
    availableToday: true
  },
  {
    id: '3',
    name: 'Sunshine Tennis Center',
    location: 'East Side, 3.2 km away',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400',
    sportType: 'Tennis',
    rating: 4.9,
    pricePerHour: 40,
    availableToday: false
  },
  {
    id: '4',
    name: 'Beach Volleyball Arena',
    location: 'Coastal Area, 5.1 km away',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400',
    sportType: 'Volleyball',
    rating: 4.7,
    pricePerHour: 30,
    availableToday: true
  },
  {
    id: '5',
    name: 'Indoor Futsal Center',
    location: 'North District, 2.3 km away',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400',
    sportType: 'Futsal',
    rating: 4.6,
    pricePerHour: 45,
    availableToday: true
  },
  {
    id: '6',
    name: 'Community Handball Court',
    location: 'South Area, 1.5 km away',
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=400',
    sportType: 'Handball',
    rating: 4.3,
    pricePerHour: 20,
    availableToday: false
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
    if (searchLocation && searchLocation !== 'Current location') {
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
        <h3 className="text-xl font-medium text-gray-600">No courts found</h3>
        <p className="mt-2 text-gray-500">Try changing your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourts.map(court => (
        <CourtCard key={court.id} court={court} />
      ))}
    </div>
  );
};

export default CourtsList;
