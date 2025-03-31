
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User, Facebook, Github } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  type: 'login' | 'register';
  setType: (type: 'login' | 'register') => void;
}

const AuthModal = ({ type, setType }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Login functionality will be implemented soon!');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Registration functionality will be implemented soon!');
  };

  const handleSocialAuth = (provider: string) => {
    toast.success(`${provider} authentication will be implemented soon!`);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-bold">
          {type === 'login' ? 'Welcome Back' : 'Create an Account'}
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue={type} onValueChange={(value) => setType(value as 'login' | 'register')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded text-gamesetGreen focus:ring-gamesetGreen" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
              </div>
              <a href="#" className="text-sm text-gamesetGreen hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full bg-gamesetGreen hover:bg-gamesetGreen/90">
              Login
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="register">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded text-gamesetGreen focus:ring-gamesetGreen" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-gamesetGreen hover:underline">Terms of Service</a> and <a href="#" className="text-gamesetGreen hover:underline">Privacy Policy</a>
              </label>
            </div>

            <Button type="submit" className="w-full bg-gamesetGreen hover:bg-gamesetGreen/90">
              Create Account
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => handleSocialAuth('Google')}
          className="flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            />
          </svg>
          Google
        </Button>
        <Button 
          variant="outline" 
          type="button"
          onClick={() => handleSocialAuth('Facebook')}
          className="flex items-center justify-center gap-2"
        >
          <Facebook size={20} />
          Facebook
        </Button>
      </div>
    </DialogContent>
  );
};

export default AuthModal;
