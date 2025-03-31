
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Court } from '../home/CourtCard';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin, Clock, Calendar as CalendarIcon, CreditCard, Users } from 'lucide-react';
import { toast } from 'sonner';

const TIMES = [
  '08:00', '09:00', '10:00', '11:00', 
  '12:00', '13:00', '14:00', '15:00', 
  '16:00', '17:00', '18:00', '19:00', 
  '20:00', '21:00'
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
      toast.error('Por favor, selecione uma data e horário para continuar.');
      return;
    }
    setStep(2);
  };

  const handleBooking = () => {
    toast.success(`Reserva realizada com sucesso! Você reservou ${court.name} no dia ${format(date!, 'dd/MM/yyyy')} às ${time} por ${duration} hora(s).`);
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {step === 1 ? 'Selecione Data e Horário' : 'Confirmar Reserva'}
        </DialogTitle>
      </DialogHeader>

      {step === 1 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-2">Selecione a Data</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              locale={ptBR}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Selecione o Horário</h3>
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
              <h3 className="font-medium mb-2">Duração (horas)</h3>
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
              Continuar
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
              <span>{date && format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <Clock size={18} className="text-gray-500 mt-0.5" />
              <span>{time} ({duration} hora{duration > 1 ? 's' : ''})</span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Resumo do Pagamento</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa da quadra</span>
                <span>R${court.pricePerHour.toFixed(2)}/hora</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Duração</span>
                <span>{duration} hora{duration > 1 ? 's' : ''}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa de serviço</span>
                <span>R${(court.pricePerHour * 0.05).toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>R${((court.pricePerHour * duration) + (court.pricePerHour * 0.05)).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Voltar
            </Button>
            <Button 
              className="flex-1 bg-gamesetGreen hover:bg-gamesetGreen/90"
              onClick={handleBooking}
            >
              Confirmar e Pagar
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <CreditCard size={16} />
            <span>Pagamento seguro</span>
            <span className="mx-2">•</span>
            <Users size={16} />
            <span>Convide amigos após a reserva</span>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default BookingModal;
