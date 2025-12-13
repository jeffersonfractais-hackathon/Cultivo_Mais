/**
 * Tipos centralizados do AgroConecta
 * Facilita manutenção e consistência em todo o app
 */

// Tipos de usuário do sistema
export type UserType = 'producer' | 'buyer';

// Status de documentos e validações
export type DocumentStatus = 'valid' | 'warning' | 'invalid';

// Dados do usuário autenticado
export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  phone?: string;
  location?: string;
  distance?: number;
  // Específico do produtor
  cpf?: string;
  municipality?: string;
  productionTypes?: string[];
  // Específico do comprador
  cnpj?: string;
  establishmentName?: string;
  establishmentType?: 'school' | 'ong' | 'food_bank' | 'commerce';
}

// Produção registrada pelo agricultor
export interface Production {
  id: string;
  producerId: string;
  type: string;
  quantity: number;
  unit: string;
  harvestDate: string;
  perishability: 'high' | 'medium' | 'low';
  status: 'active' | 'sold' | 'expired';
  daysUntilHarvest?: number;
}

// Match sugerido pela IA
export interface Match {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerType: string;
  products: string[];
  score: number;
  distance: number;
  urgency: 'high' | 'medium' | 'low';
  reason: string;
}

// Produtor (visão do comprador)
export interface ProducerProfile {
  id: string;
  name: string;
  location: string;
  distance: number;
  rating: number;
  activeProductions: number;
  documentsValid: boolean;
  productions: Production[];
  phone?: string;
}

// Dados de cadastro
export interface RegisterData {
  userType: UserType;
  name: string;
  email: string;
  password: string;
  phone?: string;
  // Produtor
  cpf?: string;
  municipality?: string;
  // Comprador
  cnpj?: string;
  establishmentName?: string;
  establishmentType?: string;
}
