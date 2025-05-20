
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CourtsList from '@/components/home/CourtsList';
import SportFilter from '@/components/home/SportFilter';
import CourtsMap from '@/components/maps/CourtsMap';
import { Court } from '@/components/home/CourtCard';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Updated featured courts for the home page map
const featuredCourts: Court[] = [
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
    id: '9',
    name: 'Arena Baly',
    location: 'Leblon, 8.4 km de distância',
    imageUrl: 'https://images.unsplash.com/photo-1623037854588-ef4b366bae51?q=80&w=400',
    sportType: 'Beach Tennis',
    rating: 5.0,
    pricePerHour: 75,
    availableToday: true
  }
];

const Index = () => {
  const [sportFilter, setSportFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    // In a real app, this could trigger an API call
    console.log(`Buscando por "${query}" em "${location}"`);
  };

  const handleSportFilter = (sportId: string) => {
    setSportFilter(sportId);
    // In a real app, this could trigger an API call
    console.log(`Filtrando por esporte: ${sportId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Search */}
        <HeroSection onSearch={handleSearch} />
        
        {/* Main Content */}
        <section className="py-12 bg-gray-50">
          <div className="gameset-container">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Encontre Sua Quadra Perfeita</h2>
              <p className="text-gray-600">
                {sportFilter === 'all' 
                  ? 'Descubra quadras para todos os esportes perto de você' 
                  : `Mostrando quadras de ${sportFilter}`}
              </p>
            </div>
            
            {/* Sport Filter */}
            <SportFilter onFilterChange={handleSportFilter} />
            
            {/* Courts List */}
            <CourtsList 
              sportFilter={sportFilter} 
              searchQuery={searchQuery} 
              searchLocation={searchLocation} 
            />
            
            {/* Map Preview Section */}
            <div className="mt-16">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quadras Perto de Você</h2>
                <Link to="/courts">
                  <Button variant="outline" className="flex items-center gap-2 mt-2 md:mt-0">
                    <MapPin size={16} />
                    Ver todas no mapa
                  </Button>
                </Link>
              </div>
              
              <CourtsMap 
                courts={featuredCourts} 
                height="400px"
                interactive={false}
              />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="gameset-container">
            <h2 className="text-3xl font-bold text-center mb-12">Como o GameSet Funciona</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gamesetGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gamesetGreen">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Encontre uma Quadra</h3>
                <p className="text-gray-600">
                  Busque quadras por localização, tipo de esporte ou instalações. Filtre os resultados de acordo com suas preferências.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gamesetGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gamesetGreen">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Reserve Instantaneamente</h3>
                <p className="text-gray-600">
                  Selecione sua data e horário preferidos. Confirme sua reserva com pagamento online seguro.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gamesetGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gamesetGreen">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Jogue & Divirta-se</h3>
                <p className="text-gray-600">
                  Receba confirmação e indicações. Chegue na quadra e aproveite seu jogo sem qualquer complicação.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gamesetDark">
          <div className="gameset-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para Jogar?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de jogadores que já estão reservando quadras através do GameSet. Rápido, confiável e sem complicações.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Comece Agora
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
