
import { useState } from 'react';
import { MapPin, Star, Clock, Calendar } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import BookingModal from '../modals/BookingModal';

export interface Court {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  sportType: string;
  rating: number;
  pricePerHour: number;
  availableToday: boolean;
}

interface CourtCardProps {
  court: Court;
}

const CourtCard = ({ court }: CourtCardProps) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <img 
            src={court.imageUrl} 
            alt={court.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
            {court.sportType}
          </div>
          {court.availableToday && (
            <div className="absolute top-2 right-2 bg-gamesetGreen px-2 py-1 rounded-full text-white text-xs font-medium flex items-center">
              <Clock size={12} className="mr-1" />
              Disponível hoje
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{court.name}</h3>
            <div className="flex items-center text-amber-500">
              <Star size={16} fill="currentColor" />
              <span className="ml-1 text-sm">{court.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-2 text-gray-500">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{court.location}</span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="font-bold text-gamesetDark">
              R${court.pricePerHour}/hora
            </span>
            <button 
              onClick={() => setBookingModalOpen(true)}
              className="flex items-center text-sm bg-gamesetGreen text-white px-3 py-1.5 rounded-lg hover:bg-gamesetGreen/90 transition-colors"
            >
              <Calendar size={16} className="mr-1" />
              Reservar agora
            </button>
          </div>
        </div>
      </div>

      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <BookingModal court={court} />
      </Dialog>
    </>
  );
};

export default CourtCard;
