/**
 * Tipos centralizados do Cultivo+
 * Facilita manutenção e consistência em todo o app
 */

// Tipos de usuário do sistema
export type UserType = 'producer' | 'buyer';

// Status de documentos e validações
export type DocumentStatus = 'valid' | 'warning' | 'invalid';

// Níveis de risco
export type RiskLevel = 'safe' | 'warning' | 'urgent';

// Dados do usuário autenticado
export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  phone?: string;
  location?: string;
  distance?: number;
  cpf?: string;
  municipality?: string;
  productionTypes?: string[];
  cnpj?: string;
  establishmentName?: string;
  establishmentType?: 'school' | 'ong' | 'food_bank' | 'commerce';
  productInterests?: string[];
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
  cpf?: string;
  municipality?: string;
  cnpj?: string;
  establishmentName?: string;
  establishmentType?: string;
}

// Alerta de risco inteligente
export interface RiskAlert {
  id: string;
  productId: string;
  productName: string;
  level: RiskLevel;
  daysRemaining: number;
  reason: string;
  recommendations: string[];
  createdAt: Date;
  dismissed?: boolean;
}

// Métricas do produtor
export interface ProducerMetrics {
  activeProducts: number;
  monthlySales: number;
  previousMonthSales: number;
  conversionRate: number;
  productsAtRisk: number;
  pendingOrders: number;
}

// Notificação
export interface Notification {
  id: string;
  type: 'order' | 'alert' | 'message' | 'promo' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Categorias de produtos de interesse
export const PRODUCT_CATEGORIES = [
  { id: 'hortalicas', label: 'Hortaliças', items: ['Alface', 'Tomate', 'Cenoura', 'Batata', 'Cebola', 'Couve'] },
  { id: 'frutas', label: 'Frutas', items: ['Banana', 'Laranja', 'Maçã', 'Manga', 'Abacaxi', 'Morango'] },
  { id: 'legumes', label: 'Legumes', items: ['Feijão', 'Abóbora', 'Abobrinha', 'Berinjela', 'Pepino'] },
  { id: 'graos', label: 'Grãos', items: ['Milho', 'Arroz', 'Soja', 'Amendoim'] },
  { id: 'organicos', label: 'Orgânicos', items: ['Produtos Orgânicos Certificados'] },
  { id: 'outros', label: 'Outros', items: ['Ovos', 'Mel', 'Queijo', 'Leite'] },
] as const;
