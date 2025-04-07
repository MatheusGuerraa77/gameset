
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogIn, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import AuthModal from '../auth/AuthModal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  const openAuthModal = (type: 'login' | 'register') => {
    setAuthType(type);
    setAuthModalOpen(true);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="gameset-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 relative">
              <div className="absolute inset-0 bg-gamesetGray rounded-full">
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gamesetGreen rounded-br-full"></div>
              </div>
              <span className="absolute bottom-0 right-0 text-xs font-bold text-white">SET</span>
            </div>
            <span className="font-bold text-2xl text-gamesetDark">GameSet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gamesetDark hover:text-gamesetGreen font-medium transition-colors">Home</Link>
            <Link to="/courts" className="text-gamesetDark hover:text-gamesetGreen font-medium transition-colors">Quadras</Link>
            <Link to="/how-it-works" className="text-gamesetDark hover:text-gamesetGreen font-medium transition-colors">Como funciona</Link>
            <Link to="/proprietario" className="text-gamesetDark hover:text-gamesetGreen font-medium transition-colors flex items-center gap-1">
              <Users size={16} />
              Área do Proprietário
            </Link>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => openAuthModal('login')}>
              <LogIn size={18} />
              Entrar
            </Button>
            <Button className="bg-gamesetGreen hover:bg-gamesetGreen/90 flex items-center gap-2" onClick={() => openAuthModal('register')}>
              <User size={18} />
              Cadastrar
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-3 border-t">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gamesetGray/50 transition-colors">Home</Link>
            <Link to="/courts" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gamesetGray/50 transition-colors">Quadras</Link>
            <Link to="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gamesetGray/50 transition-colors">Como funciona</Link>
            <Link to="/proprietario" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gamesetGray/50 transition-colors flex items-center gap-2">
              <Users size={16} />
              Área do Proprietário
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="w-full justify-center" onClick={() => openAuthModal('login')}>Entrar</Button>
              <Button className="w-full justify-center bg-gamesetGreen hover:bg-gamesetGreen/90" onClick={() => openAuthModal('register')}>Cadastrar</Button>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <AuthModal type={authType} setType={setAuthType} />
      </Dialog>
    </nav>
  );
};

export default Navbar;
