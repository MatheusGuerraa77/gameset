
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Court } from '../home/CourtCard';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin, Clock, Calendar as CalendarIcon, CreditCard, Users, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto'>('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm({
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      installments: '1'
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

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as 'credit' | 'pix' | 'boleto');
  };

  const handleBooking = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast.success(`Reserva realizada com sucesso! Você reservou ${court.name} no dia ${format(date!, 'dd/MM/yyyy')} às ${time} por ${duration} hora(s).`);
    }, 2000);
  };

  const calculateTotal = () => {
    const basePrice = court.pricePerHour * duration;
    const serviceFee = court.pricePerHour * 0.05;
    return basePrice + serviceFee;
  };

  // Show payment success screen
  if (isComplete) {
    return (
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Reserva Confirmada!</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-gamesetGreen" />
          </div>
          
          <h2 className="text-xl font-bold mb-2">Sua reserva foi confirmada</h2>
          <p className="text-gray-600 text-center mb-6">
            Um e-mail de confirmação foi enviado com os detalhes da sua reserva.
          </p>
          
          <div className="w-full bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-3">{court.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <CalendarIcon size={16} className="text-gray-500 mt-1 shrink-0" />
                <span>{date && format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Clock size={16} className="text-gray-500 mt-1 shrink-0" />
                <span>{time} • {duration} hora{duration > 1 ? 's' : ''}</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-gray-500 mt-1 shrink-0" />
                <span>{court.location}</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gamesetGreen hover:bg-gamesetGreen/90 w-full"
          >
            Voltar para a página inicial
          </Button>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {step === 1 ? 'Selecione Data e Horário' : 'Confirmar e Pagar'}
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
                <span>R${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Method Selection */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">Forma de Pagamento</h3>
            
            <Tabs 
              defaultValue="credit" 
              value={paymentMethod} 
              onValueChange={handlePaymentMethodChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="credit">Cartão</TabsTrigger>
                <TabsTrigger value="pix">PIX</TabsTrigger>
                <TabsTrigger value="boleto">Boleto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="credit">
                <Form {...form}>
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do Cartão</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="0000 0000 0000 0000" 
                              {...field} 
                              className="focus:border-gamesetGreen" 
                            />
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
                            <Input 
                              placeholder="Nome como está no cartão" 
                              {...field} 
                              className="focus:border-gamesetGreen" 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Validade</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="MM/AA" 
                                {...field} 
                                className="focus:border-gamesetGreen" 
                              />
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
                              <Input 
                                placeholder="123" 
                                {...field} 
                                className="focus:border-gamesetGreen" 
                                maxLength={4}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="installments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parcelas</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-2"
                            >
                              <div className="flex items-center">
                                <RadioGroupItem value="1" id="r1" className="peer sr-only" />
                                <FormLabel
                                  htmlFor="r1"
                                  className="flex px-3 py-1.5 border rounded-md peer-data-[state=checked]:border-gamesetGreen peer-data-[state=checked]:bg-gamesetGreen/10 cursor-pointer"
                                >
                                  1x R${calculateTotal().toFixed(2)}
                                </FormLabel>
                              </div>
                              
                              <div className="flex items-center">
                                <RadioGroupItem value="2" id="r2" className="peer sr-only" />
                                <FormLabel
                                  htmlFor="r2"
                                  className="flex px-3 py-1.5 border rounded-md peer-data-[state=checked]:border-gamesetGreen peer-data-[state=checked]:bg-gamesetGreen/10 cursor-pointer"
                                >
                                  2x R${(calculateTotal() / 2).toFixed(2)}
                                </FormLabel>
                              </div>
                              
                              <div className="flex items-center">
                                <RadioGroupItem value="3" id="r3" className="peer sr-only" />
                                <FormLabel
                                  htmlFor="r3"
                                  className="flex px-3 py-1.5 border rounded-md peer-data-[state=checked]:border-gamesetGreen peer-data-[state=checked]:bg-gamesetGreen/10 cursor-pointer"
                                >
                                  3x R${(calculateTotal() / 3).toFixed(2)}
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </Form>
              </TabsContent>
              
              <TabsContent value="pix">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="bg-gray-100 p-4 rounded-lg mb-4 w-48 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">QR Code PIX</p>
                      <p className="text-xs mt-1">Simulado para demonstração</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Escaneie o código QR com o aplicativo do seu banco ou copie o código PIX abaixo
                  </p>
                  <div className="flex w-full mt-4 mb-2">
                    <Input 
                      value="00020126580014BR.GOV.BCB.PIX0136example-payment-key@domain.com5204000053039865802BR5915GameSet Reservas6009Sao Paulo62070503***6304AD5F" 
                      readOnly 
                      className="flex-grow"
                    />
                    <Button variant="outline" className="ml-2">
                      Copiar
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    O pagamento será confirmado automaticamente em até 1 minuto após a transferência
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="boleto">
                <div className="space-y-4 py-2">
                  <p className="text-sm text-gray-600">
                    Ao clicar em "Gerar Boleto", você receberá um boleto bancário que pode ser pago em qualquer banco ou casa lotérica.
                  </p>
                  <div className="border-t border-b py-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor do boleto:</span>
                      <span className="font-bold">R$ {calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-600">Vencimento:</span>
                      <span>{format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 'dd/MM/yyyy')}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Importante: A reserva só será confirmada após a confirmação do pagamento do boleto, que pode levar até 3 dias úteis.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Voltar
            </Button>
            <Button 
              className="flex-1 bg-gamesetGreen hover:bg-gamesetGreen/90"
              onClick={handleBooking}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processando...
                </>
              ) : (
                'Confirmar e Pagar'
              )}
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
