
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourtRegistrationForm from '@/components/owner/CourtRegistrationForm';
import { 
  PlusCircle, 
  ListChecks, 
  BarChart3, 
  CalendarDays, 
  MessageSquare,
  Clipboard,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("register");

  // Dados de exemplo para o dashboard
  const mockCourts = [
    { 
      id: 1, 
      name: "Quadra de Tênis - Unidade A", 
      type: "tennis",
      location: "São Paulo, SP",
      bookingsToday: 3,
      totalBookings: 38,
      revenue: 1280,
      status: "active"
    },
    { 
      id: 2, 
      name: "Quadra de Beach Tennis", 
      type: "beachtennis",
      location: "São Paulo, SP",
      bookingsToday: 1,
      totalBookings: 12,
      revenue: 480,
      status: "active"
    },
    { 
      id: 3, 
      name: "Quadra de Futevôlei", 
      type: "footvolley",
      location: "São Paulo, SP",
      bookingsToday: 0,
      totalBookings: 5,
      revenue: 200,
      status: "maintenance"
    }
  ];

  const mockBookings = [
    { 
      id: 1, 
      courtName: "Quadra de Tênis - Unidade A", 
      date: "07/04/2025", 
      time: "15:00 - 16:00",
      userName: "Bruno Almeida", 
      status: "confirmed", 
      price: 120 
    },
    { 
      id: 2, 
      courtName: "Quadra de Beach Tennis", 
      date: "08/04/2025", 
      time: "19:00 - 20:00",
      userName: "Carla Santos", 
      status: "pending", 
      price: 80 
    },
    { 
      id: 3, 
      courtName: "Quadra de Tênis - Unidade A", 
      date: "09/04/2025", 
      time: "18:00 - 19:00",
      userName: "Ricardo Oliveira", 
      status: "confirmed", 
      price: 120 
    }
  ];

  const mockMessages = [
    { 
      id: 1, 
      userName: "Mariana Silva", 
      message: "A quadra tem vestiário com chuveiro?", 
      time: "Hoje, 14:30",
      avatar: "",
      unread: true 
    },
    { 
      id: 2, 
      userName: "João Pereira", 
      message: "É possível agendar para o próximo sábado?", 
      time: "Hoje, 11:15",
      avatar: "",
      unread: true 
    },
    { 
      id: 3, 
      userName: "Camila Nunes", 
      message: "Obrigada pelo excelente atendimento ontem!", 
      time: "Ontem, 20:45",
      avatar: "",
      unread: false 
    }
  ];

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
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Minhas Quadras</h2>
                    <Button className="bg-gamesetGreen hover:bg-gamesetGreen/90">
                      <PlusCircle size={18} className="mr-2" /> Nova Quadra
                    </Button>
                  </div>

                  {mockCourts.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {mockCourts.map((court) => (
                        <Card key={court.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle>{court.name}</CardTitle>
                              <Badge variant={court.status === 'active' ? "outline" : "destructive"}>
                                {court.status === 'active' ? 'Ativa' : 'Em Manutenção'}
                              </Badge>
                            </div>
                            <CardDescription className="flex items-center mt-1">
                              <MapPin size={14} className="mr-1" /> {court.location}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4 py-2">
                              <div>
                                <p className="text-sm text-gray-500">Reservas hoje</p>
                                <p className="text-2xl font-semibold">{court.bookingsToday}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Total de reservas</p>
                                <p className="text-2xl font-semibold">{court.totalBookings}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm text-gray-500">Faturamento</p>
                                <p className="text-2xl font-semibold">R$ {court.revenue}</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" className="w-full">Gerenciar Quadra</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clipboard size={48} className="mx-auto text-gray-400 mb-3" />
                      <h3 className="text-xl font-semibold mb-2">Nenhuma quadra cadastrada</h3>
                      <p className="text-gray-600 mb-6">
                        Você ainda não possui quadras cadastradas. Cadastre sua primeira quadra para começar a receber reservas.
                      </p>
                      <Button className="bg-gamesetGreen hover:bg-gamesetGreen/90">
                        <PlusCircle size={18} className="mr-2" /> Cadastrar Quadra
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Gerenciar Reservas</h2>
                    <div className="flex items-center">
                      <div className="relative mr-2">
                        <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
                        <input 
                          type="text" 
                          placeholder="Buscar reservas..." 
                          className="pl-8 h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gamesetGreen/50"
                        />
                      </div>
                      <Button variant="outline">
                        <Clock size={18} className="mr-2" /> Histórico
                      </Button>
                    </div>
                  </div>

                  {/* Status da reserva cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <CheckCircle size={18} className="text-green-500 mr-2" /> Confirmadas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">2</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Clock size={18} className="text-amber-500 mr-2" /> Pendentes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">1</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <XCircle size={18} className="text-red-500 mr-2" /> Canceladas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">0</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Lista de reservas */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3 font-medium">Quadra</th>
                          <th className="pb-3 font-medium">Data</th>
                          <th className="pb-3 font-medium">Horário</th>
                          <th className="pb-3 font-medium">Cliente</th>
                          <th className="pb-3 font-medium">Valor</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockBookings.map((booking) => (
                          <tr key={booking.id} className="border-b">
                            <td className="py-4 pr-4">{booking.courtName}</td>
                            <td className="py-4 pr-4">{booking.date}</td>
                            <td className="py-4 pr-4">{booking.time}</td>
                            <td className="py-4 pr-4">{booking.userName}</td>
                            <td className="py-4 pr-4">R$ {booking.price}</td>
                            <td className="py-4 pr-4">
                              <Badge 
                                variant={booking.status === 'confirmed' ? 'default' : 'outline'}
                                className={booking.status === 'confirmed' ? 'bg-green-500 hover:bg-green-600' : ''}
                              >
                                {booking.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                              </Badge>
                            </td>
                            <td className="py-4">
                              <Button variant="ghost" size="sm">
                                <ChevronRight size={18} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Relatórios e Estatísticas</h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Semanal</Button>
                      <Button variant="outline" size="sm" className="bg-gamesetGreen/10">Mensal</Button>
                      <Button variant="outline" size="sm">Anual</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-gray-600">Reservas Totais</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">55</p>
                        <p className="text-xs text-green-600 mt-1 flex items-center">
                          +12% em relação ao mês anterior
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-gray-600">Faturamento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">R$ 1.960</p>
                        <p className="text-xs text-green-600 mt-1 flex items-center">
                          +8% em relação ao mês anterior
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-gray-600">Taxa de Ocupação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">68%</p>
                        <Progress value={68} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Tendência de Reservas</h3>
                    <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">Gráfico de tendências será exibido aqui</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Esportes mais populares</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-base">Tênis</p>
                            <p className="text-3xl font-bold mt-2">38</p>
                            <p className="text-sm text-gray-500">reservas</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-base">Beach Tennis</p>
                            <p className="text-3xl font-bold mt-2">12</p>
                            <p className="text-sm text-gray-500">reservas</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-base">Futevôlei</p>
                            <p className="text-3xl font-bold mt-2">5</p>
                            <p className="text-sm text-gray-500">reservas</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-base">Outros</p>
                            <p className="text-3xl font-bold mt-2">0</p>
                            <p className="text-sm text-gray-500">reservas</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="messages" className="mt-0">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="border-b p-4">
                    <h2 className="text-xl font-semibold">Centro de Mensagens</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                    {/* Sidebar de conversas */}
                    <div className="border-r">
                      <div className="p-4 border-b">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="Buscar conversas..." 
                            className="pl-8 h-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gamesetGreen/50"
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto" style={{ height: 'calc(600px - 65px)' }}>
                        {mockMessages.map((message) => (
                          <div 
                            key={message.id} 
                            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${message.unread ? 'bg-gamesetGreen/5' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <Avatar>
                                <AvatarFallback>{message.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <p className="font-medium truncate">{message.userName}</p>
                                  <p className="text-xs text-gray-500">{message.time}</p>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{message.message}</p>
                              </div>
                              {message.unread && (
                                <div className="w-2 h-2 rounded-full bg-gamesetGreen flex-shrink-0"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Area de chat */}
                    <div className="col-span-2 flex flex-col">
                      <div className="p-4 border-b flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>MS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Mariana Silva</p>
                            <p className="text-xs text-gray-500">Online agora</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Phone size={18} className="mr-2" /> Ligar
                        </Button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-4">
                          <div className="flex items-end gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>MS</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                              <p>Olá! Gostaria de saber se a quadra tem vestiário com chuveiro?</p>
                              <p className="text-xs text-gray-500 mt-1">14:30</p>
                            </div>
                          </div>

                          <div className="flex flex-row-reverse items-end gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>EU</AvatarFallback>
                            </Avatar>
                            <div className="bg-gamesetGreen/10 rounded-lg p-3 max-w-[80%]">
                              <p>Olá Mariana! Sim, temos vestiários completos com chuveiros quentes.</p>
                              <p className="text-xs text-gray-500 mt-1">14:32</p>
                            </div>
                          </div>

                          <div className="flex items-end gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>MS</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                              <p>Perfeito! E preciso levar a minha própria raquete ou vocês alugam?</p>
                              <p className="text-xs text-gray-500 mt-1">14:35</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t p-4">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Digite sua mensagem..." 
                            className="flex-1 h-10 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-gamesetGreen/50"
                          />
                          <Button className="bg-gamesetGreen hover:bg-gamesetGreen/90">
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
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
