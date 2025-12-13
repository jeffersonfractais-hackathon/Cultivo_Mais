/**
 * Contexto de Autenticação
 * Gerencia estado do usuário e tipo (produtor/comprador)
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserType, RegisterData } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados mock para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    userType: 'producer',
    phone: '(11) 99999-1234',
    cpf: '123.456.789-00',
    municipality: 'Campinas - SP',
    distance: 15,
    productionTypes: ['Hortaliças', 'Frutas'],
  },
  {
    id: '2',
    name: 'Mercado Central',
    email: 'mercado@email.com',
    userType: 'buyer',
    phone: '(11) 3333-4444',
    cnpj: '12.345.678/0001-90',
    establishmentName: 'Mercado Central',
    establishmentType: 'commerce',
    location: 'Campinas - SP',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção, conectar ao backend
    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Simulação de cadastro - em produção, conectar ao backend
    const newUser: User = {
      id: String(Date.now()),
      name: data.name,
      email: data.email,
      userType: data.userType,
      phone: data.phone,
      cpf: data.cpf,
      municipality: data.municipality,
      cnpj: data.cnpj,
      establishmentName: data.establishmentName,
      establishmentType: data.establishmentType as User['establishmentType'],
    };
    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
