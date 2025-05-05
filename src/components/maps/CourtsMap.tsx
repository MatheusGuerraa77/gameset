
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Court } from '../home/CourtCard';
import { useToast } from '@/components/ui/use-toast';

// You'll need to provide your own Mapbox access token
// Get a free token at https://mapbox.com
const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN"; // Replace with your Mapbox token

interface CourtsMapProps {
  courts: Court[];
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const CourtsMap = ({ courts }: CourtsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(MAPBOX_TOKEN);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Function to get user's current location
  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          toast({
            title: "Localização encontrada",
            description: "Mostrando quadras próximas a você",
          });
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Erro de localização",
            description: "Não foi possível obter sua localização. Usando localização padrão.",
            variant: "destructive"
          });
          // Set default location (São Paulo)
          setUserLocation({ latitude: -23.5505, longitude: -46.6333 });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        title: "Geolocalização não suportada",
        description: "Seu navegador não suporta geolocalização. Usando localização padrão.",
        variant: "destructive"
      });
      // Set default location (São Paulo)
      setUserLocation({ latitude: -23.5505, longitude: -46.6333 });
      setIsLoading(false);
    }
  };

  // Token input handler for users without Mapbox token set
  const handleTokenInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapboxToken') as string;
    if (token) {
      setMapboxToken(token);
      localStorage.setItem('mapboxToken', token);
    }
  };

  useEffect(() => {
    // Check for stored token in localStorage
    const storedToken = localStorage.getItem('mapboxToken');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
    
    // Get user location
    getUserLocation();
  }, []);

  useEffect(() => {
    // Only initialize map once we have both the token and user location
    if (!mapContainer.current || !userLocation || mapboxToken === "YOUR_MAPBOX_TOKEN") return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [userLocation.longitude, userLocation.latitude],
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user marker
    new mapboxgl.Marker({ color: '#3898ff' })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Sua localização</h3>'))
      .addTo(map.current);

    // Add court markers
    courts.forEach(court => {
      // In a real app, you would have proper lat/lng for each court
      // Here we're creating random positions near the user for demonstration
      const courtLat = userLocation.latitude + (Math.random() - 0.5) * 0.05;
      const courtLng = userLocation.longitude + (Math.random() - 0.5) * 0.05;
      
      // Create a court marker
      const element = document.createElement('div');
      element.className = 'court-marker';
      element.style.backgroundColor = court.availableToday ? '#22c55e' : '#ef4444';
      element.style.width = '30px';
      element.style.height = '30px';
      element.style.borderRadius = '50%';
      element.style.cursor = 'pointer';
      element.style.border = '2px solid white';
      
      // Add popup for court info
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div style="max-width: 200px;">
            <img src="${court.imageUrl}" alt="${court.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${court.name}</h3>
            <p style="margin-bottom: 4px; color: #666;">
              ${court.sportType} • R$${court.pricePerHour}/hora
            </p>
            <p style="font-size: 0.9em; color: #888;">${court.location}</p>
            ${court.availableToday ? '<p style="color: #22c55e; font-weight: bold;">Disponível hoje</p>' : ''}
          </div>
        `);

      // Add marker to map
      new mapboxgl.Marker(element)
        .setLngLat([courtLng, courtLat])
        .setPopup(popup)
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [userLocation, mapboxToken, courts]);

  // Show a form to input Mapbox token if not provided
  if (mapboxToken === "YOUR_MAPBOX_TOKEN") {
    return (
      <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-white shadow-md">
        <h3 className="text-xl font-semibold mb-4">Token do Mapbox necessário</h3>
        <p className="text-gray-600 mb-4">
          Para mostrar o mapa, por favor insira seu token público do Mapbox.
          Você pode obter um gratuitamente em <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
        </p>
        <form onSubmit={handleTokenInput} className="w-full max-w-md">
          <div className="flex flex-col gap-2">
            <input 
              type="text" 
              name="mapboxToken" 
              placeholder="pk.ey..." 
              className="border p-2 rounded"
              required 
            />
            <button 
              type="submit"
              className="bg-gamesetGreen text-white py-2 px-4 rounded hover:bg-gamesetGreen/90"
            >
              Salvar Token
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gamesetGreen"></div>
          <p className="mt-2 text-gray-500">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[500px] relative border rounded-lg overflow-hidden shadow-md">
      <div ref={mapContainer} className="absolute top-0 left-0 right-0 bottom-0" />
      <style jsx>{`
        .mapboxgl-popup-content {
          padding: 12px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default CourtsMap;
