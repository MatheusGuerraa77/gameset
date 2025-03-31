
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CourtsList from '@/components/home/CourtsList';
import SportFilter from '@/components/home/SportFilter';

const Index = () => {
  const [sportFilter, setSportFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    // In a real app, this could trigger an API call
    console.log(`Searching for "${query}" in "${location}"`);
  };

  const handleSportFilter = (sportId: string) => {
    setSportFilter(sportId);
    // In a real app, this could trigger an API call
    console.log(`Filtering by sport: ${sportId}`);
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
              <h2 className="text-3xl font-bold">Find Your Perfect Court</h2>
              <p className="text-gray-600">
                {sportFilter === 'all' 
                  ? 'Discover courts for all sports near you' 
                  : `Showing ${sportFilter} courts`}
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
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="gameset-container">
            <h2 className="text-3xl font-bold text-center mb-12">How GameSet Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gamesetGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gamesetGreen">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Find a Court</h3>
                <p className="text-gray-600">
                  Search for courts by location, sport type, or facilities. Filter results to match your preferences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gamesetGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gamesetGreen">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Book Instantly</h3>
                <p className="text-gray-600">
                  Select your preferred date and time. Confirm your booking with secure online payment.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gamesetGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gamesetGreen">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Play & Enjoy</h3>
                <p className="text-gray-600">
                  Receive confirmation and directions. Arrive at the court and enjoy your game without any hassle.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gamesetDark">
          <div className="gameset-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Play?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of players who are already booking courts through GameSet. Fast, reliable, and hassle-free.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Get Started Now
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
