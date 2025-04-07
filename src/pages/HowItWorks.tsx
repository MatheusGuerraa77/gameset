
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Calendar, MapPin, CreditCard, Clock, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: "Encontre sua Quadra",
      description: "Busque por localização, tipo de esporte ou instalações disponíveis. Filtre os resultados para encontrar a quadra perfeita para você.",
      icon: <MapPin className="h-8 w-8 text-gamesetGreen" />,
    },
    {
      id: 2,
      title: "Verifique Disponibilidade",
      description: "Confira a disponibilidade em tempo real e escolha o melhor horário para sua prática esportiva.",
      icon: <Calendar className="h-8 w-8 text-gamesetGreen" />,
    },
    {
      id: 3,
      title: "Faça sua Reserva",
      description: "Em poucos cliques, confirme sua reserva. Sem ligações, sem complicações.",
      icon: <Check className="h-8 w-8 text-gamesetGreen" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gamesetDark text-white py-16">
          <div className="gameset-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Como o GameSet Funciona</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubra como é fácil encontrar e reservar quadras esportivas de forma instantânea, sem complicações.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-white">
          <div className="gameset-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Três Passos Simples</h2>

              <div className="relative">
                {/* Progress line */}
                <div className="hidden md:block absolute left-[45px] top-0 bottom-0 w-1 bg-gray-200" />

                {/* Steps */}
                <div className="space-y-12">
                  {steps.map((step) => (
                    <div 
                      key={step.id}
                      className={`flex flex-col md:flex-row items-start md:items-center gap-6 relative ${
                        activeStep === step.id ? 'opacity-100' : 'opacity-70'
                      }`}
                      onClick={() => setActiveStep(step.id)}
                    >
                      <div className="flex-shrink-0 w-[90px] h-[90px] rounded-full bg-gamesetGreen/10 flex items-center justify-center z-10 border-2 border-gamesetGreen cursor-pointer">
                        {step.icon}
                      </div>
                      <div className="md:pt-0">
                        <h3 className="text-2xl font-semibold flex items-center">
                          <span className="mr-2">{step.id}.</span> {step.title}
                        </h3>
                        <p className="text-gray-600 mt-2 text-lg">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-12">
                <Button className="bg-gamesetGreen hover:bg-gamesetGreen/90" size="lg" asChild>
                  <Link to="/courts">Encontrar Quadras Agora</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="gameset-container">
            <h2 className="text-3xl font-bold text-center mb-12">Recursos que Facilitam sua Experiência</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Clock className="h-10 w-10 text-gamesetGreen mb-4" />
                <h3 className="text-xl font-semibold mb-2">Reservas Instantâneas</h3>
                <p className="text-gray-600">
                  Reserve quadras em tempo real sem precisar aguardar confirmação ou fazer ligações.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <CreditCard className="h-10 w-10 text-gamesetGreen mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pagamento Seguro</h3>
                <p className="text-gray-600">
                  Diversas opções de pagamento disponíveis, todas processadas com segurança.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Star className="h-10 w-10 text-gamesetGreen mb-4" />
                <h3 className="text-xl font-semibold mb-2">Avaliações Verificadas</h3>
                <p className="text-gray-600">
                  Veja opiniões de outros jogadores para escolher a melhor quadra.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <MapPin className="h-10 w-10 text-gamesetGreen mb-4" />
                <h3 className="text-xl font-semibold mb-2">Localização GPS</h3>
                <p className="text-gray-600">
                  Encontre quadras próximas e receba indicações precisas para chegar ao local.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Calendar className="h-10 w-10 text-gamesetGreen mb-4" />
                <h3 className="text-xl font-semibold mb-2">Lembretes Automáticos</h3>
                <p className="text-gray-600">
                  Receba notificações sobre suas reservas para nunca perder um jogo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Shield className="h-10 w-10 text-gamesetGreen mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cancelamento Flexível</h3>
                <p className="text-gray-600">
                  Políticas claras de cancelamento e remarcação para sua tranquilidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="gameset-container">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Como faço para reservar uma quadra?</AccordionTrigger>
                  <AccordionContent>
                    Basta buscar por quadras disponíveis, selecionar o horário desejado e confirmar sua reserva. Todo o processo leva menos de 2 minutos e não requer contato direto com o estabelecimento.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Posso cancelar minha reserva?</AccordionTrigger>
                  <AccordionContent>
                    Sim, você pode cancelar sua reserva conforme a política de cancelamento de cada quadra. Geralmente, cancelamentos com mais de 24 horas de antecedência são reembolsados integralmente.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Como funciona o pagamento?</AccordionTrigger>
                  <AccordionContent>
                    Oferecemos diversas opções de pagamento, incluindo cartão de crédito, PIX, boleto bancário e carteiras digitais. Todos os pagamentos são processados de forma segura através da nossa plataforma.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Preciso criar uma conta para fazer reservas?</AccordionTrigger>
                  <AccordionContent>
                    Sim, é necessário criar uma conta gratuita para fazer reservas. Isso permite que você gerencie suas reservas, receba confirmações e mantenha um histórico de suas atividades.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Como cadastro minha quadra no GameSet?</AccordionTrigger>
                  <AccordionContent>
                    Se você é proprietário de quadras, pode cadastrá-las facilmente através da nossa Área do Proprietário. Basta criar uma conta, fornecer as informações das suas quadras e começar a receber reservas online.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gamesetDark text-white">
          <div className="gameset-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para simplificar sua experiência esportiva?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Junte-se a milhares de esportistas que já utilizam o GameSet para encontrar e reservar quadras sem complicação.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button className="bg-gamesetGreen hover:bg-gamesetGreen/90" size="lg" asChild>
                <Link to="/courts">Buscar Quadras</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg" asChild>
                <Link to="/proprietario">Sou Proprietário</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
