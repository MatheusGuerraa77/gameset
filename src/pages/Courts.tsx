
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import SportFilter from '@/components/home/SportFilter';
import CourtsList from '@/components/home/CourtsList';
import CourtsMap from '@/components/maps/CourtsMap';
import { MapPin, Filter, Map } from 'lucide-react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Courts = () => {
  const [sportFilter, setSportFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    console.log(`Buscando por "${query}" em "${location}"`);
  };

  const handleSportFilter = (sportId: string) => {
    setSportFilter(sportId);
    console.log(`Filtrando por esporte: ${sportId}`);
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
              
              <div className="mt-4 md:mt-0 flex space-x-3 items-center">
                <Tabs 
                  defaultValue="list" 
                  value={viewMode}
                  onValueChange={(value) => setViewMode(value as "list" | "map")}
                  className="mr-2"
                >
                  <TabsList>
                    <TabsTrigger value="list">Lista</TabsTrigger>
                    <TabsTrigger value="map">Mapa</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={18} />
                      Filtros
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
            
            {/* Sport Filter */}
            <div className="mb-6">
              <SportFilter onFilterChange={handleSportFilter} />
            </div>
            
            {/* Views based on selected mode */}
            {viewMode === "list" ? (
              <CourtsList 
                sportFilter={sportFilter} 
                searchQuery={searchQuery} 
                searchLocation={searchLocation} 
              />
            ) : (
              <div className="mb-8">
                <CourtsMap 
                  courts={[]} // Here we should pass the filtered courts
                />
                <p className="text-sm text-center text-gray-500 mt-2">
                  Quadras próximas à sua localização atual
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courts;
