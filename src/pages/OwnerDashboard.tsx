
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourtRegistrationForm from '@/components/owner/CourtRegistrationForm';
import { PlusCircle, ListChecks, BarChart3, CalendarDays, MessageSquare } from 'lucide-react';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="gameset-container py-8">
          <h1 className="text-3xl font-bold text-gamesetDark mb-6">Área do Proprietário</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
              <TabsTrigger value="register" className="flex items-center gap-2 py-3">
                <PlusCircle size={18} />
                <span className="hidden sm:inline">Cadastrar</span>
                <span className="inline sm:hidden">Nova</span>
              </TabsTrigger>
              <TabsTrigger value="myCourts" className="flex items-center gap-2 py-3">
                <ListChecks size={18} />
                <span className="hidden sm:inline">Minhas Quadras</span>
                <span className="inline sm:hidden">Quadras</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2 py-3">
                <CalendarDays size={18} />
                <span className="hidden sm:inline">Reservas</span>
                <span className="inline sm:hidden">Reservas</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 py-3">
                <BarChart3 size={18} />
                <span className="hidden sm:inline">Relatórios</span>
                <span className="inline sm:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2 py-3">
                <MessageSquare size={18} />
                <span className="hidden sm:inline">Mensagens</span>
                <span className="inline sm:hidden">Chat</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="register" className="mt-0">
                <CourtRegistrationForm />
              </TabsContent>
              
              <TabsContent value="myCourts" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h2 className="text-xl font-semibold mb-4">Minhas Quadras</h2>
                  <p className="text-gray-600">
                    Cadastre sua primeira quadra para visualizar seus espaços aqui.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h2 className="text-xl font-semibold mb-4">Gerenciar Reservas</h2>
                  <p className="text-gray-600">
                    Aqui você poderá visualizar e gerenciar as reservas das suas quadras.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h2 className="text-xl font-semibold mb-4">Relatórios e Estatísticas</h2>
                  <p className="text-gray-600">
                    Acompanhe o desempenho das suas quadras com gráficos e relatórios detalhados.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="messages" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h2 className="text-xl font-semibold mb-4">Centro de Mensagens</h2>
                  <p className="text-gray-600">
                    Converse com os clientes e responda dúvidas sobre suas quadras.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
