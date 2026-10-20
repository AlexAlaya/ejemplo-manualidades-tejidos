import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles, 
  Phone, 
  X,
  Menu,
  Users,
  UserPlus
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCustomBuilder: () => void;
  onOpenAdminPanel: () => void;
  onOpenRegisterModal: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCareGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCustomBuilder,
  onOpenAdminPanel,
  onOpenRegisterModal,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCareGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'todos', label: 'Todo el Catálogo' },
    { key: 'peluches', label: 'Peluches & Amigurumis' },
    { key: 'ramos', label: 'Ramos de Flores Eternas' },
    { key: 'llaveros', label: 'Llaveros & Accesorios' },
    { key: 'hogar', label: 'Hogar & Decoración' },
    { key: 'kits', label: 'Kits DIY para Tejer' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8] transition-all">
      {/* Top Notification Bar */}
      <div className="bg-[#4A3B32] text-[#F5EDE0] px-4 py-2 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E5A873] animate-pulse"></span>
            <span>Envío gratis en compras desde $45 · Confección artesanal 100% a mano</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {/* Quick Admin DB & Announcement Access */}
            <button
              onClick={onOpenAdminPanel}
              className="flex items-center gap-1.5 bg-[#664C3B] hover:bg-[#7D5E49] text-white px-2.5 py-0.5 rounded-full font-medium transition-colors cursor-pointer border border-[#8C6D58]/40"
              title="Abrir base de datos de personas y enviar anuncios"
            >
              <Users className="w-3 h-3 text-[#E5A873]" />
              <span>Base de Datos & Anuncios</span>
            </button>

            <span className="hidden sm:inline text-[#8C7667]">|</span>
            <button 
              onClick={onOpenCareGuide}
              className="text-[#E0C9B3] hover:text-white transition-colors underline cursor-pointer"
            >
              Guía de Cuidado
            </button>
            <span className="hidden sm:inline text-[#8C7667]">|</span>
            <a 
              href="https://wa.me/1234567890?text=Hola!%20Me%20interesa%20hacer%20una%20consulta%20de%20tejidos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[#E5A873] hover:text-[#F3C59F] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#5A483C] hover:text-[#2D2825] focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onSelectCategory('todos')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-[#E8DEC8] border border-[#D1BFA5] flex items-center justify-center text-[#5C4533] shadow-inner group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3v18" opacity="0.3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l-7 7" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <span className="font-fraunces text-2xl tracking-tight font-semibold text-[#3B2C24] block leading-none">
                  Hebras & Amor
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#7A6455] font-medium block mt-1">
                  Tejidos & Creaciones Artesanales
                </span>
              </div>
            </button>
          </div>

          {/* Search Box */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar peluches, tulipanes, llaveros, mantas..."
                className="w-full bg-[#F2EAE0] border border-[#D9CDBF] rounded-xl pl-10 pr-9 py-2.5 text-sm text-[#382D25] placeholder-[#8A796C] focus:outline-none focus:ring-2 focus:ring-[#8E5B3D] focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-[#7A6759] absolute left-3.5 top-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-[#7A6759] hover:text-[#382D25]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Customer Register Button */}
            <button
              onClick={onOpenRegisterModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EFE6DB] hover:bg-[#E3D6C5] text-[#4A3728] text-xs font-semibold border border-[#D5C6B5] transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#8C5233]" />
              <span>Registrarme</span>
            </button>

            {/* Custom Builder Trigger Button */}
            <button
              onClick={onOpenCustomBuilder}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#614532] text-[#F7F2EB] text-xs font-semibold tracking-wide hover:bg-[#483324] shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E6B894]" />
              <span>Personalizar Pedido</span>
            </button>

            {/* Admin DB & Broadcast Trigger */}
            <button
              onClick={onOpenAdminPanel}
              className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-[#E8DCCB] hover:bg-[#DBCABA] text-[#3D2C1F] text-xs font-bold border border-[#CBB49C] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Panel de Base de Datos Firebase & Envío de Anuncios"
            >
              <Users className="w-4 h-4 text-[#8C5233]" />
              <span className="hidden xl:inline">Contactos & Anuncios</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl border border-[#D9CDBF] hover:bg-[#F2EAE0] text-[#523E31] transition-colors cursor-pointer"
              aria-label="Ver favoritos"
              title="Mis Favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#9E473D] text-white text-[11px] font-bold flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#3B2B20] text-white hover:bg-[#2A1E16] shadow-sm transition-all cursor-pointer"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-5 h-5 text-[#E5A873]" />
              <span className="text-xs font-semibold hidden sm:inline">Carrito</span>
              <span className="w-5 h-5 rounded-full bg-[#C87A49] text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar amigurumis, flores eternas, llaveros..."
              className="w-full bg-[#F2EAE0] border border-[#D9CDBF] rounded-xl pl-10 pr-9 py-2 text-sm text-[#382D25] placeholder-[#8A796C] focus:outline-none focus:ring-2 focus:ring-[#8E5B3D]"
            />
            <Search className="w-4 h-4 text-[#7A6759] absolute left-3.5 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-[#7A6759]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Navigation Bar */}
        <div className="hidden md:flex items-center gap-1 py-2.5 border-t border-[#E8DEC8] overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#E3D6C5] text-[#33251C] font-semibold'
                    : 'text-[#6B5749] hover:text-[#2D2118] hover:bg-[#EDE3D4]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DEC8] bg-[#F7F2EB] px-4 py-4 space-y-3">
          <div className="text-xs uppercase tracking-wider text-[#8A7667] font-semibold">Categorías</div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  onSelectCategory(cat.key);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium ${
                  selectedCategory === cat.key
                    ? 'bg-[#DFCDBB] text-[#33251C] font-semibold'
                    : 'bg-[#EEE6DC] text-[#594639]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#E5DAC8] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAdminPanel();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#3F2E22] text-white text-xs font-semibold"
            >
              <Users className="w-4 h-4 text-[#E5A873]" />
              Base de Datos Firebase & Enviar Anuncios
            </button>
            <button
              onClick={() => {
                onOpenRegisterModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#EFE6DB] text-[#4A3728] border border-[#D5C6B5] text-xs font-semibold"
            >
              <UserPlus className="w-4 h-4 text-[#8C5233]" />
              Registrarme como Cliente
            </button>
            <button
              onClick={() => {
                onOpenCustomBuilder();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#5C4533] text-white text-xs font-semibold"
            >
              <Sparkles className="w-4 h-4 text-[#E6B894]" />
              Personalizar Pedido a Medida
            </button>
            <button
              onClick={() => {
                onOpenCareGuide();
                setMobileMenuOpen(false);
              }}
              className="text-center py-2 text-xs text-[#705847] underline"
            >
              Guía de Cuidado & Lavado de Tejidos
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
