/**
 * Página de Autenticação
 * Login e Cadastro com seleção de tipo de usuário
 * Fluxo máximo de 3 passos (RNF03)
 */

import { useState } from 'react';
import { Leaf, Store, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { UserType, RegisterData } from '@/types';

type AuthMode = 'login' | 'register';
type RegisterStep = 1 | 2 | 3;

const Auth = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [step, setStep] = useState<RegisterStep>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState<Partial<RegisterData>>({});

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const success = await login(email, password);
    if (!success) {
      setError('Email ou senha incorretos');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!userType) return;
    setLoading(true);
    const data: RegisterData = {
      ...formData,
      userType,
      email,
      password,
      name: formData.name || '',
    };
    await register(data);
    setLoading(false);
  };

  const nextStep = () => {
    if (step < 3) setStep((s) => (s + 1) as RegisterStep);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as RegisterStep);
  };

  // Renderiza tela de login
  if (mode === 'login') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm space-y-8">
            {/* Logo */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Cultivo<span className="text-primary">+</span>
              </h1>
              <p className="text-muted-foreground">
                Conectando quem produz com quem precisa
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email ou telefone</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button
                onClick={handleLogin}
                disabled={loading || !email || !password}
                className="w-full h-12 text-base font-semibold"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>

            {/* Link para cadastro */}
            <div className="text-center">
              <p className="text-muted-foreground">
                Não tem conta?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-primary font-semibold hover:underline"
                >
                  Criar conta
                </button>
              </p>
            </div>

            {/* Demo hint */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium mb-1">Demo:</p>
              <p>Produtor: joao@email.com</p>
              <p>Comprador: mercado@email.com</p>
              <p className="text-xs mt-1">(qualquer senha)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderiza cadastro
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header com progresso */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => (step === 1 ? setMode('login') : prevStep())}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    s <= step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Passo {step} de 3
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {/* Passo 1: Tipo de usuário */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Você é produtor ou comprador?
              </h2>
              <p className="text-muted-foreground mt-1">
                Escolha o tipo de conta que deseja criar
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setUserType('producer')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  userType === 'producer'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Produtor / Agricultor
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quero vender minha produção
                    </p>
                  </div>
                  {userType === 'producer' && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setUserType('buyer')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  userType === 'buyer'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Store className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Comprador</p>
                    <p className="text-sm text-muted-foreground">
                      Comércio, escola, ONG ou banco de alimentos
                    </p>
                  </div>
                  {userType === 'buyer' && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </div>
              </button>
            </div>

            <Button
              onClick={nextStep}
              disabled={!userType}
              className="w-full h-12 text-base font-semibold"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Passo 2: Dados básicos */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Seus dados básicos
              </h2>
              <p className="text-muted-foreground mt-1">
                Informações para criar sua conta
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={formData.name || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (WhatsApp)</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-1234"
                  value={formData.phone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">Senha</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Campos específicos por tipo */}
              {userType === 'producer' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, cpf: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipality">Município</Label>
                    <Input
                      id="municipality"
                      placeholder="Cidade - UF"
                      value={formData.municipality || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, municipality: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                </>
              )}

              {userType === 'buyer' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                    <Input
                      id="cnpj"
                      placeholder="00.000.000/0001-00"
                      value={formData.cnpj || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, cnpj: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="establishment">Nome do estabelecimento</Label>
                    <Input
                      id="establishment"
                      placeholder="Nome do seu negócio"
                      value={formData.establishmentName || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          establishmentName: e.target.value,
                        })
                      }
                      className="h-12"
                    />
                  </div>
                </>
              )}
            </div>

            <Button
              onClick={nextStep}
              disabled={!formData.name || !email || !password}
              className="w-full h-12 text-base font-semibold"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Passo 3: Confirmação */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Confirme seus dados
              </h2>
              <p className="text-muted-foreground mt-1">
                Verifique se está tudo certo
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span className="font-medium">
                  {userType === 'producer' ? 'Produtor' : 'Comprador'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nome</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{email}</span>
              </div>
              {formData.phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telefone</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
              )}
              {userType === 'producer' && formData.municipality && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Município</span>
                  <span className="font-medium">{formData.municipality}</span>
                </div>
              )}
              {userType === 'buyer' && formData.establishmentName && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estabelecimento</span>
                  <span className="font-medium">{formData.establishmentName}</span>
                </div>
              )}
            </div>

            <Button
              onClick={handleRegister}
              disabled={loading}
              className="w-full h-12 text-base font-semibold"
            >
              {loading ? 'Criando conta...' : 'Criar minha conta'}
              <Check className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
