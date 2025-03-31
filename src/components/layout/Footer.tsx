
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gamesetDark text-white pt-12 pb-8">
      <div className="gameset-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 relative">
                <div className="absolute inset-0 bg-gamesetGray rounded-full">
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gamesetGreen rounded-br-full"></div>
                </div>
                <span className="absolute bottom-0 right-0 text-xs font-bold text-white">SET</span>
              </div>
              <span className="font-bold text-2xl text-white">GameSet</span>
            </div>
            <p className="text-gray-300 mb-4">
              Reserve quadras esportivas instantaneamente sem o incômodo da comunicação direta.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gamesetGreen transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gamesetGreen transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gamesetGreen transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gamesetGreen">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/courts" className="text-gray-300 hover:text-white transition-colors">Encontrar Quadras</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">Como Funciona</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Sobre Nós</Link></li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gamesetGreen">Esportes</h3>
            <ul className="space-y-2">
              <li><Link to="/courts?sport=football" className="text-gray-300 hover:text-white transition-colors">Futebol</Link></li>
              <li><Link to="/courts?sport=basketball" className="text-gray-300 hover:text-white transition-colors">Basquete</Link></li>
              <li><Link to="/courts?sport=tennis" className="text-gray-300 hover:text-white transition-colors">Tênis</Link></li>
              <li><Link to="/courts?sport=volleyball" className="text-gray-300 hover:text-white transition-colors">Vôlei</Link></li>
              <li><Link to="/courts?sport=futsal" className="text-gray-300 hover:text-white transition-colors">Futsal</Link></li>
              <li><Link to="/courts?sport=beachtennis" className="text-gray-300 hover:text-white transition-colors">Beach Tennis</Link></li>
              <li><Link to="/courts?sport=footvolley" className="text-gray-300 hover:text-white transition-colors">Futevôlei</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gamesetGreen">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gamesetGreen" />
                <a href="mailto:contato@gameset.com.br" className="text-gray-300 hover:text-white transition-colors">contato@gameset.com.br</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gamesetGreen" />
                <a href="tel:+5511999999999" className="text-gray-300 hover:text-white transition-colors">(11) 99999-9999</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} GameSet. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
