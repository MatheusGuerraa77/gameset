
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import SportFilter from '@/components/home/SportFilter';
import CourtsList from '@/components/home/CourtsList';
import CourtsMap from '@/components/maps/CourtsMap';
import { Court } from '@/components/home/CourtCard';
import { MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock data for the courts map
const allCourts: Court[] = [
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
];

const Courts = () => {
  const [sportFilter, setSportFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(allCourts);
  
  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    console.log(`Buscando por "${query}" em "${location}"`);
    
    // Simple filtering for demonstration
    let filtered = [...allCourts];
    
    if (query) {
      const queryLower = query.toLowerCase();
      filtered = filtered.filter(court => 
        court.name.toLowerCase().includes(queryLower) || 
        court.sportType.toLowerCase().includes(queryLower)
      );
    }
    
    if (location && location !== 'Current location') {
      const locationLower = location.toLowerCase();
      filtered = filtered.filter(court => 
        court.location.toLowerCase().includes(locationLower)
      );
    }
    
    setFilteredCourts(filtered);
  };

  const handleSportFilter = (sportId: string) => {
    setSportFilter(sportId);
    console.log(`Filtrando por esporte: ${sportId}`);
    
    // Simple sport filtering for demonstration
    if (sportId === 'all') {
      setFilteredCourts(allCourts);
    } else {
      const filtered = allCourts.filter(
        court => court.sportType.toLowerCase() === sportId.toLowerCase()
      );
      setFilteredCourts(filtered);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Search Header */}
        <section className="bg-gamesetDark py-8">
          <div className="gameset-container">
            <h1 className="text-3xl font-bold text-white mb-6">Encontre Quadras</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-8 bg-gray-50">
          <div className="gameset-container">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Quadras Disponíveis</h2>
                {searchQuery || searchLocation ? (
                  <p className="text-gray-600">
                    Resultados para {searchQuery ? `"${searchQuery}"` : ""} 
                    {searchLocation ? ` em ${searchLocation}` : ""}
                  </p>
                ) : (
                  <p className="text-gray-600">
                    {sportFilter === 'all' 
                      ? 'Todas as quadras disponíveis' 
                      : `Quadras de ${sportFilter}`}
                  </p>
                )}
              </div>
              
              <div className="mt-4 md:mt-0">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={18} />
                      Filtros Avançados
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                      <SheetDescription>
                        Ajuste os filtros para encontrar a quadra ideal
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Faixa de Preço</h3>
                        <div className="px-2">
                          <Slider 
                            defaultValue={[50, 200]} 
                            max={500} 
                            step={10}
                            onValueChange={(value) => setPriceRange(value as number[])} 
                          />
                          <div className="flex justify-between mt-2 text-sm">
                            <span>R$ {priceRange[0]}</span>
                            <span>R$ {priceRange[1]}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Comodidades</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="estacionamento" />
                            <Label htmlFor="estacionamento">Estacionamento</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="vestiario" />
                            <Label htmlFor="vestiario">Vestiário</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="lanchonete" />
                            <Label htmlFor="lanchonete">Lanchonete</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="chuveiro" />
                            <Label htmlFor="chuveiro">Chuveiro</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="cobertura" />
                            <Label htmlFor="cobertura">Quadra Coberta</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Disponibilidade</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="manha" />
                            <Label htmlFor="manha">Manhã (6h - 12h)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="tarde" />
                            <Label htmlFor="tarde">Tarde (12h - 18h)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="noite" />
                            <Label htmlFor="noite">Noite (18h - 23h)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="finsemana" />
                            <Label htmlFor="finsemana">Fins de semana</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button className="w-full bg-gamesetGreen hover:bg-gamesetGreen/90">
                          Aplicar Filtros
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            {/* Map View - Added directly below the title */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Mapa de Quadras</h3>
              <CourtsMap courts={filteredCourts} height="400px" interactive={true} />
            </div>
            
            {/* Sport Filter */}
            <div className="mb-6">
              <SportFilter onFilterChange={handleSportFilter} />
            </div>
            
            {/* Courts List */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Lista de Quadras</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourts.map(court => (
                  <CourtCard key={court.id} court={court} />
                ))}
              </div>
              {filteredCourts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600">Nenhuma quadra encontrada</h3>
                  <p className="mt-2 text-gray-500">Tente alterar seus filtros ou critérios de busca</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courts;
