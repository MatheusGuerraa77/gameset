
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Court } from '../home/CourtCard';
import { format } from 'date-fns';
import { MapPin, Clock, Calendar as CalendarIcon, CreditCard, Users } from 'lucide-react';
import { toast } from 'sonner';

const TIMES = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', 
  '08:00 PM', '09:00 PM'
];

interface BookingModalProps {
  court: Court;
}

const BookingModal = ({ court }: BookingModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [duration, setDuration] = useState(1);
  const [step, setStep] = useState(1);

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
  };

  const handleContinue = () => {
    if (!date || !time) {
      toast.error('Please select a date and time to continue.');
      return;
    }
    setStep(2);
  };

  const handleBooking = () => {
    toast.success(`Booking successful! You've booked ${court.name} on ${format(date!, 'PP')} at ${time} for ${duration} hour(s).`);
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {step === 1 ? 'Select Date & Time' : 'Confirm Booking'}
        </DialogTitle>
      </DialogHeader>

      {step === 1 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-2">Select Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Select Time</h3>
            <div className="grid grid-cols-3 gap-2 h-[300px] overflow-y-auto p-1">
              {TIMES.map((t) => (
                <button
                  key={t}
                  className={`py-2 px-3 rounded-md text-sm transition-colors ${
                    time === t 
                      ? 'bg-gamesetGreen text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleTimeSelect(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Duration (hours)</h3>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setDuration(Math.max(1, duration - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-800"
                  disabled={duration <= 1}
                >
                  -
                </button>
                <span className="font-medium text-lg">{duration}</span>
                <button 
                  onClick={() => setDuration(Math.min(5, duration + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-800"
                  disabled={duration >= 5}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Button 
              className="w-full bg-gamesetGreen hover:bg-gamesetGreen/90"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-semibold">{court.name}</h3>
            
            <div className="flex items-start space-x-2">
              <MapPin size={18} className="text-gray-500 mt-0.5" />
              <span>{court.location}</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <CalendarIcon size={18} className="text-gray-500 mt-0.5" />
              <span>{date && format(date, 'PPPP')}</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <Clock size={18} className="text-gray-500 mt-0.5" />
              <span>{time} ({duration} hour{duration > 1 ? 's' : ''})</span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Payment Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Court fee</span>
                <span>${court.pricePerHour.toFixed(2)}/hour</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span>{duration} hour{duration > 1 ? 's' : ''}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span>${(court.pricePerHour * 0.05).toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${((court.pricePerHour * duration) + (court.pricePerHour * 0.05)).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button 
              className="flex-1 bg-gamesetGreen hover:bg-gamesetGreen/90"
              onClick={handleBooking}
            >
              Confirm & Pay
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <CreditCard size={16} />
            <span>Secure payment</span>
            <span className="mx-2">•</span>
            <Users size={16} />
            <span>Invite friends after booking</span>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default BookingModal;
