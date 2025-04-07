
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MapPin, Upload, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Esquema de validação para o formulário de cadastro de quadra
const courtSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome da quadra deve ter pelo menos 3 caracteres',
  }),
  description: z.string().min(10, {
    message: 'A descrição deve ter pelo menos 10 caracteres',
  }),
  address: z.string().min(5, {
    message: 'Endereço inválido',
  }),
  city: z.string().min(2, {
    message: 'Cidade inválida',
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'O preço deve ser um número positivo',
  }),
  sports: z.array(z.string()).min(1, {
    message: 'Selecione pelo menos um esporte',
  }),
  hasLighting: z.boolean().default(false),
  hasCovering: z.boolean().default(false),
  hasShowers: z.boolean().default(false),
  hasLockerRoom: z.boolean().default(false),
  hasParking: z.boolean().default(false),
});

type CourtFormValues = z.infer<typeof courtSchema>;

const sports = [
  { id: 'futsal', label: 'Futsal' },
  { id: 'futebol', label: 'Futebol' },
  { id: 'tenis', label: 'Tênis' },
  { id: 'volei', label: 'Vôlei' },
  { id: 'basquete', label: 'Basquete' },
  { id: 'beachtenis', label: 'Beach Tennis' },
  { id: 'futvoley', label: 'Futevôlei' },
];

const CourtRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  
  // Configuração do formulário com React Hook Form e Zod
  const form = useForm<CourtFormValues>({
    resolver: zodResolver(courtSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      city: '',
      price: '',
      sports: [],
      hasLighting: false,
      hasCovering: false,
      hasShowers: false,
      hasLockerRoom: false,
      hasParking: false,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CourtFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulação de envio para API
      // Aqui viria a integração com o backend
      console.log('Dados enviados:', data);
      console.log('Imagens:', images);
      
      // Simulando um tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Quadra cadastrada com sucesso!');
      form.reset();
      setImages([]);
    } catch (error) {
      console.error('Erro ao cadastrar quadra:', error);
      toast.error('Erro ao cadastrar quadra. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cadastrar Nova Quadra</CardTitle>
        <CardDescription className="text-center">
          Preencha os detalhes abaixo para registrar sua quadra no GameSet
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Quadra</FormLabel>
                    <FormControl>
                      <Input placeholder="Arena Esportiva Central" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva sua quadra, condições, horários de funcionamento, etc." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <Input placeholder="Rua, número, bairro" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço por hora (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="150"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Valor para uma hora de uso da quadra
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Esportes disponíveis</FormLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {sports.map((sport) => (
                    <FormField
                      key={sport.id}
                      control={form.control}
                      name="sports"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(sport.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, sport.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== sport.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {sport.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage>
                  {form.formState.errors.sports && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.sports.message}</p>
                  )}
                </FormMessage>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium">Comodidades</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hasLighting"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Iluminação
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasCovering"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Quadra Coberta
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasShowers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Chuveiros
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasLockerRoom"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Vestiário
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasParking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Estacionamento
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <FormLabel>Fotos da Quadra</FormLabel>
                <div className="mt-2">
                  <label 
                    htmlFor="courtImages" 
                    className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gamesetGreen focus:outline-none"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-6 h-6 text-gray-500" />
                      <span className="font-medium text-gray-600">
                        Arraste as imagens ou clique para selecionar
                      </span>
                      <span className="text-xs text-gray-500">
                        (Máximo: 5 imagens)
                      </span>
                    </div>
                    <input
                      id="courtImages"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={images.length >= 5}
                    />
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Prévia ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <CardFooter className="flex justify-end px-0">
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-gamesetGreen hover:bg-gamesetGreen/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Quadra'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourtRegistrationForm;
