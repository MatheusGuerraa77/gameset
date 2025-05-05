
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Court } from '../home/CourtCard';

// Você precisará obter um token do Mapbox
// Visite https://account.mapbox.com/ para obter seu token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNrbGV4YW1wbGUifQ.example-signature';

interface CourtsMapProps {
  courts: Court[];
  height?: string;
  interactive?: boolean;
}

const CourtsMap: React.FC<CourtsMapProps> = ({ courts, height = '400px', interactive = true }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Função para converter o endereço em coordenadas (simplificada)
  // Em uma aplicação real, você usaria um serviço de geocodificação como o Mapbox Geocoding API
  const getCoordinatesFromLocation = (location: string): [number, number] => {
    // Dados de exemplo - em uma implementação real, você usaria geocodificação
    const coordinates: Record<string, [number, number]> = {
      'Centro': [-46.633308, -23.550520],
      'Zona Oeste': [-46.7287047, -23.5613106],
      'Zona Leste': [-46.5337067, -23.5507343],
      'Área Costeira': [-46.3338547, -23.9837882],
      'Zona Norte': [-46.6250282, -23.4598642],
      'Zona Sul': [-46.6478567, -23.6281523],
      'Praia Grande': [-46.4121176, -24.0063252],
      'Praia do Sol': [-46.3456789, -24.1234567],
    };

    // Extrai a região da string de localização
    for (const [region, coords] of Object.entries(coordinates)) {
      if (location.includes(region)) {
        return coords;
      }
    }
    
    // Coordenada padrão (São Paulo)
    return [-46.633308, -23.550520];
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-46.633308, -23.550520], // São Paulo
      zoom: 11,
      interactive: interactive
    });

    // Adicionar controles de navegação
    if (interactive) {
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Tentar obter localização do usuário
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);

        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 12
          });

          // Adicionar marcador para a localização do usuário
          new mapboxgl.Marker({ color: '#0000FF' })
            .setLngLat([longitude, latitude])
            .addTo(map.current)
            .setPopup(new mapboxgl.Popup().setHTML('<h3>Sua localização</h3>'));
        }
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [interactive]);

  // Efeito para atualizar marcadores quando as quadras ou o mapa mudam
  useEffect(() => {
    if (!map.current) return;

    // Limpar marcadores existentes
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Adicionar novos marcadores
    courts.forEach(court => {
      if (!map.current) return;
      
      // Obter coordenadas a partir da localização (simplificado)
      const coordinates = getCoordinatesFromLocation(court.location);
      
      // Criar elemento personalizado para o marcador
      const el = document.createElement('div');
      el.className = 'court-marker';
      el.style.backgroundColor = '#4CAF50';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';
      
      // Criar e adicionar o marcador
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<div style="max-width: 200px;">
                <h3 style="font-weight: bold; margin-bottom: 5px;">${court.name}</h3>
                <p style="margin-bottom: 5px;">${court.sportType}</p>
                <p style="margin-bottom: 5px;">R$${court.pricePerHour}/hora</p>
                ${court.availableToday ? 
                  '<p style="color: green;">Disponível hoje</p>' : 
                  '<p style="color: grey;">Indisponível hoje</p>'}
              </div>`
            )
        )
        .addTo(map.current);
      
      markers.current.push(marker);
    });

    // Ajustar visibilidade para incluir todos os marcadores
    if (markers.current.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      
      // Incluir localização do usuário nos limites, se disponível
      if (userLocation) {
        bounds.extend(userLocation);
      }
      
      // Incluir todas as quadras nos limites
      courts.forEach(court => {
        bounds.extend(getCoordinatesFromLocation(court.location));
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 14
      });
    }
  }, [courts, userLocation]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0" />
      {!interactive && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <button 
            className="bg-white text-gamesetDark px-4 py-2 rounded-lg shadow-lg font-medium hover:bg-opacity-90 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/courts';
            }}
          >
            Ver Mapa Completo
          </button>
        </div>
      )}
      <style>{`
        .mapboxgl-popup-content {
          padding: 15px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default CourtsMap;
