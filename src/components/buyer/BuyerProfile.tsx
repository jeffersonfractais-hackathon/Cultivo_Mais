/**
 * Perfil do Comprador
 * Dados do estabelecimento, interesses e configurações
 */

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Store,
  Settings,
  LogOut,
  ChevronRight,
  Heart,
  Info,
  Search,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { PRODUCT_CATEGORIES } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const establishmentTypes = {
  school: 'Escola',
  ong: 'ONG',
  food_bank: 'Banco de Alimentos',
  commerce: 'Comércio',
};

const BuyerProfile = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    'Tomate',
    'Alface',
    'Banana',
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedProducts);

  const typeLabel = user?.establishmentType
    ? establishmentTypes[user.establishmentType]
    : 'Comércio';

  // Filtra produtos baseado na busca
  const filteredCategories = PRODUCT_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  const toggleProduct = (product: string) => {
    setTempSelected((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  const saveInterests = () => {
    setSelectedProducts(tempSelected);
    setDialogOpen(false);
  };

  const openDialog = () => {
    setTempSelected(selectedProducts);
    setSearchTerm('');
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header do perfil */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
          <Store className="w-8 h-8 text-secondary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {user?.establishmentName || user?.name}
          </h1>
          <p className="text-sm text-muted-foreground">{typeLabel}</p>
        </div>
      </div>

      {/* Informações */}
      <div className="card-elevated p-4 space-y-3">
        <h2 className="font-semibold text-foreground">Informações</h2>

        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{user?.location || 'Campinas - SP'}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{user?.phone || '(11) 3333-4444'}</span>
        </div>

        {user?.cnpj && (
          <div className="flex items-center gap-3 text-sm">
            <Store className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">CNPJ: {user.cnpj}</span>
          </div>
        )}
      </div>

      {/* Produtos de Interesse */}
      <div className="card-elevated p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-foreground">Produtos de Interesse</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Selecione os produtos que você tem interesse em comprar. 
                    Isso nos ajuda a enviar recomendações personalizadas e alertas 
                    quando houver ofertas desses itens.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={openDialog}>
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Produtos de Interesse
                </DialogTitle>
              </DialogHeader>

              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Selecionados */}
              {tempSelected.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-2 border-b border-border">
                  {tempSelected.map((product) => (
                    <button
                      key={product}
                      onClick={() => toggleProduct(product)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-primary/15 text-primary rounded-full text-sm font-medium hover:bg-primary/25 transition-colors"
                    >
                      {product}
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Lista de categorias */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {filteredCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                      {category.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => {
                        const isSelected = tempSelected.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() => toggleProduct(item)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted/50 text-foreground hover:bg-muted'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {filteredCategories.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhum produto encontrado</p>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={saveInterests}>
                  Salvar ({tempSelected.length})
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tags de produtos selecionados */}
        {selectedProducts.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map((product) => (
              <span
                key={product}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {product}
              </span>
            ))}
          </div>
        ) : (
          <button
            onClick={openDialog}
            className="w-full py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Heart className="w-5 h-5 mx-auto mb-1" />
            <p className="text-sm">Clique para selecionar produtos</p>
          </button>
        )}

        {selectedProducts.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Você receberá notificações quando esses produtos estiverem disponíveis
          </p>
        )}
      </div>

      {/* Estatísticas */}
      <div className="card-elevated p-4 space-y-3">
        <h2 className="font-semibold text-foreground">Estatísticas</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">15</p>
            <p className="text-xs text-muted-foreground">Contatos realizados</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground">Produtores favoritos</p>
          </div>
        </div>
      </div>

      {/* Configurações */}
      <div className="card-elevated overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Configurações</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full text-destructive hover:text-destructive"
        onClick={logout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair da conta
      </Button>
    </div>
  );
};

export default BuyerProfile;