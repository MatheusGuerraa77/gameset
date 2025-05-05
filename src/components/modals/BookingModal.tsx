
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Court } from '../home/CourtCard';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin, Clock, Calendar as CalendarIcon, CreditCard, Users, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

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
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const form = useForm({
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
      cpf: '',
    }
  });

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

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const handleContinueToPayment = () => {
    setStep(3);
  };

  const handleBooking = () => {
    setLoading(true);
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      toast.success(`Reserva realizada com sucesso! Você reservou ${court.name} no dia ${format(date!, 'dd/MM/yyyy')} às ${time} por ${duration} hora(s).`);
    }, 2000);
  };

  // Renderizar confirmação de pagamento
  if (completed) {
    return (
      <DialogContent className="sm:max-w-[600px]">
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pagamento Confirmado!</h2>
          <p className="text-gray-600 mb-6">
            Sua reserva para {court.name} foi confirmada com sucesso.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CalendarIcon size={18} className="text-gray-500 mt-0.5" />
                <span className="text-gray-800">{date && format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Clock size={18} className="text-gray-500 mt-0.5" />
                <span className="text-gray-800">{time} ({duration} hora{duration > 1 ? 's' : ''})</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-gray-500 mt-0.5" />
                <span className="text-gray-800">{court.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-gray-500">
              Um e-mail de confirmação com os detalhes da sua reserva foi enviado.
            </p>
            <Button className="bg-gamesetGreen hover:bg-gamesetGreen/90 mt-4">
              Visualizar Minhas Reservas
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {step === 1 ? 'Selecione Data e Horário' : 
           step === 2 ? 'Confirmar Reserva' : 
           'Realizar Pagamento'}
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
      ) : step === 2 ? (
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
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Voltar
            </Button>
            <Button 
              className="flex-1 bg-gamesetGreen hover:bg-gamesetGreen/90"
              onClick={handleContinueToPayment}
            >
              Continuar para Pagamento
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
      ) : (
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Selecione o método de pagamento</h3>
            <RadioGroup 
              defaultValue="credit-card" 
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>Cartão de Crédito</span>
                    <div className="flex space-x-1">
                      <div className="w-8 h-6 bg-blue-600 rounded"></div>
                      <div className="w-8 h-6 bg-red-600 rounded"></div>
                      <div className="w-8 h-6 bg-green-600 rounded"></div>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>PIX</span>
                    <div className="w-8 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">PIX</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="boleto" id="boleto" />
                <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>Boleto Bancário</span>
                    <div className="w-8 h-6 border rounded flex items-center justify-center text-xs font-medium">
                      <ArrowDown size={14} />
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === 'credit-card' && (
            <div className="space-y-4">
              <h3 className="font-medium">Detalhes do Cartão</h3>
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do Cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="0000 0000 0000 0000" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome no Cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validade</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/AA" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-48 h-48 bg-gray-100 mx-auto flex items-center justify-center">
                <span className="text-sm text-gray-500">QR Code do PIX</span>
              </div>
              <p className="text-sm text-gray-600">
                Escaneie o QR code acima com o app do seu banco para pagar. O pagamento será confirmado automaticamente em segundos.
              </p>
            </div>
          )}

          {paymentMethod === 'boleto' && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700">
                <p>Importante: O boleto será gerado após a confirmação e levará até 3 dias úteis para ser compensado.</p>
              </div>
            </div>
          )}

          <div className="border rounded-lg p-3 bg-gray-50">
            <h3 className="text-sm font-medium mb-2">Total a pagar</h3>
            <p className="text-xl font-bold">
              R${((court.pricePerHour * duration) + (court.pricePerHour * 0.05)).toFixed(2)}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Voltar
            </Button>
            <Button 
              className="flex-1 bg-gamesetGreen hover:bg-gamesetGreen/90"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </>
              ) : (
                "Confirmar e Pagar"
              )}
            </Button>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default BookingModal;
