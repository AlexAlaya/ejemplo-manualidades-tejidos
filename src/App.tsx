import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, 
  Sparkles, 
  SlidersHorizontal, 
  PackageCheck,
  X,
  ShoppingBag,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { Product, ProductCategory, CartItem } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomOrderBuilder } from './components/CustomOrderBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StorySection } from './components/StorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { CareGuideModal } from './components/CareGuideModal';
import { Footer } from './components/Footer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { RegisterContactModal } from './components/RegisterContactModal';

export default function App() {
  // Products State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Wishlist State (persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hebras_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hebras_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const toggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Cart State (persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hebras_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hebras_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Coupon State
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Calculation helpers
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cartItems.reduce((sum, item) => {
    let price = item.product.price;
    if (item.woodTagText) price += 3.0;
    if (item.giftWrapping) price += 2.5;
    return sum + price * item.quantity;
  }, 0);

  const shippingCost = cartSubtotal >= 45 || cartItems.length === 0 ? 0 : 4.5;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  // Coupon logic
  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'BIENVENIDA10') {
      const disc = Number((cartSubtotal * 0.10).toFixed(2));
      setDiscountAmount(disc);
      setCouponCode('BIENVENIDA10');
      return true;
    }
    if (code === 'AMORTEJIDO') {
      setDiscountAmount(5.0);
      setCouponCode('AMORTEJIDO');
      return true;
    }
    if (code === 'HEBRAS15') {
      const disc = Number((cartSubtotal * 0.15).toFixed(2));
      setDiscountAmount(disc);
      setCouponCode('HEBRAS15');
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscountAmount(0);
  };

  // Add to Cart
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
    woodTag?: string,
    dedication?: string,
    giftWrap?: boolean
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor === color &&
        item.selectedSize === size &&
        item.woodTagText === woodTag
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${product.id}-${Date.now()}-${Math.random()}`,
        product,
        quantity,
        selectedColor: color || product.colors[0]?.name,
        selectedSize: size,
        woodTagText: woodTag,
        customNote: dedication,
        giftWrapping: giftWrap,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Quick Add from Card
  const handleQuickAddToCart = (product: Product) => {
    handleAddToCart(product, 1, product.colors[0]?.name);
    setIsCartOpen(true);
  };

  // Custom Order Builder to Cart
  const handleAddCustomToCart = (customProduct: Product, note: string) => {
    const newItem: CartItem = {
      cartItemId: `custom-${Date.now()}`,
      product: customProduct,
      quantity: 1,
      selectedColor: customProduct.colors[0]?.name,
      customNote: note,
    };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((item) => item.cartItemId !== cartItemId));
  };

  // Order Placement Success
  const handleOrderSuccess = () => {
    setCartItems([]);
    setCouponCode('');
    setDiscountAmount(0);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'todos' && p.category !== selectedCategory) {
          return false;
        }
        if (inStockOnly && !p.inStock) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesDesc = p.shortDescription.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
          const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchesName && !matchesDesc && !matchesTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default 'featured'
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, inStockOnly]);

  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] flex flex-col">
      {/* Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          // scroll to catalogue section smoothly
          const catSection = document.getElementById('catalogo-section');
          if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
      />

      {/* Hero Banner */}
      <HeroBanner
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const catSection = document.getElementById('catalogo-section');
          if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
      />

      {/* Main Catalog Section */}
      <main id="catalogo-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8DEC8]">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8C6F5B] font-semibold">
              Creaciones Disponibles
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-[#2F2117] font-normal mt-1">
              {selectedCategory === 'todos' && 'Todas las Creaciones Tejidas'}
              {selectedCategory === 'peluches' && 'Peluches & Amigurumis Tiernos'}
              {selectedCategory === 'ramos' && 'Ramos de Flores Eternas'}
              {selectedCategory === 'llaveros' && 'Llaveros & Accesorios con Alma'}
              {selectedCategory === 'hogar' && 'Decoración & Confort para el Hogar'}
              {selectedCategory === 'kits' && 'Kits DIY para Aprender a Tejer'}
            </h2>
            <p className="text-xs text-[#7A6759] mt-1">
              Mostrando {filteredProducts.length} producto{filteredProducts.length === 1 ? '' : 's'}
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </div>

          {/* Controls: Sort and In-stock toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs text-[#523F32] cursor-pointer bg-white px-3 py-2 rounded-xl border border-[#DFD3C3] shadow-2xs">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#8C5233] focus:ring-[#8C5233]"
              />
              <span className="font-medium">Solo entrega inmediata</span>
            </label>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#DFD3C3] shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C6F5B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs text-[#3D2C20] font-medium bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Destacados del Taller</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-[#E8DEC8] p-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#8C6D58]">
              <PackageCheck className="w-8 h-8" />
            </div>
            <h3 className="font-fraunces text-xl text-[#382619]">
              No encontramos tejidos con esos filtros
            </h3>
            <p className="text-xs text-[#7A6759] max-w-sm mx-auto">
              Prueba cambiando la búsqueda o solicita una pieza a medida con nuestro personalizador de pedidos.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSearchQuery('');
                  setInStockOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#593F2B] text-white text-xs font-semibold cursor-pointer"
              >
                Restablecer Filtros
              </button>
              <button
                onClick={() => setIsCustomBuilderOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#EFE3D5] text-[#3D2C20] border border-[#D5C2AF] text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#9C6544]" />
                <span>Pedir a Medida</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onQuickAddToCart={handleQuickAddToCart}
              />
            ))}
          </div>
        )}

        {/* Bespoke Order Banner Callout */}
        <div className="rounded-3xl bg-gradient-to-r from-[#4A3525] via-[#5C4533] to-[#4A3525] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-xs uppercase tracking-wider text-[#E8C4A2] font-bold">
              ¿No encuentras lo que imaginas?
            </span>
            <h3 className="font-fraunces text-2xl sm:text-3xl text-white font-normal">
              Tejemos tu idea desde cero: Ramos personalizados & Amigurumis únicos
            </h3>
            <p className="text-xs text-[#D8C7B8] max-w-xl">
              Elige flores, colores, dedicatorias manuscritas y medallas grabadas en madera. Enviamos fotos de tu creación antes de enviarla.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 z-10 shrink-0">
            <button
              onClick={() => setIsCustomBuilderOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#E5A873] hover:bg-[#F0B888] text-[#2F1F14] font-bold text-xs shadow transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#7A3F16]" />
              <span>Personalizar Pedido Ahora</span>
            </button>

            <a
              href="https://wa.me/1234567890?text=Hola!%20Me%20gustar%C3%ADa%20hacer%20un%20pedido%20especial%20a%20medida%20%F0%9F%A7%B6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear con la Artesana</span>
            </a>
          </div>
        </div>

      </main>

      {/* Workshop Story Section */}
      <StorySection />

      {/* Verified Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const catSection = document.getElementById('catalogo-section');
          if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Custom Order Builder Modal */}
      <CustomOrderBuilder
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
        onAddCustomToCart={handleAddCustomToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        couponCode={couponCode}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        shippingCost={shippingCost}
        total={cartTotal}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Care Guide Modal */}
      <CareGuideModal
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

      {/* Firebase Admin & Announcements Broadcast Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

      {/* Customer Registration to Firebase Modal */}
      <RegisterContactModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      {/* Wishlist Drawer Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl p-6 relative max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC8]">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#9E3E34] fill-current" />
                <h3 className="font-fraunces text-xl text-[#36261B] font-medium">
                  Mis Favoritos ({wishlistIds.length})
                </h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="text-[#7A6759] hover:text-[#36261B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-12 text-[#7A6759] space-y-2">
                  <Heart className="w-10 h-10 mx-auto text-[#D5C6B5]" />
                  <p className="text-xs">Aún no has guardado ninguna creación en tus favoritos.</p>
                </div>
              ) : (
                wishlistedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E8DEC8]"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-fraunces text-sm font-medium text-[#2E2016] truncate">
                        {p.name}
                      </h4>
                      <div className="text-xs font-bold text-[#8C5233]">
                        ${p.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          handleQuickAddToCart(p);
                          setIsWishlistOpen(false);
                        }}
                        className="p-2 rounded-xl bg-[#523C2B] text-white hover:bg-[#3D2C1F] cursor-pointer"
                        title="Mover al carrito"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="p-2 text-[#9E8B7C] hover:text-[#A8382F] cursor-pointer"
                        title="Quitar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[#E8DEC8] flex justify-end">
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#4A3322] text-white text-xs font-semibold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Quick Action Button for Instant Inquiries */}
      <a
        href="https://wa.me/1234567890?text=Hola!%20Me%20encanta%20su%20tienda%20de%20tejidos,%20quiero%20hacer%20una%20consulta"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2 group cursor-pointer"
        aria-label="Atención por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold pr-1">
          ¿Dudas? Escríbenos
        </span>
      </a>

    </div>
  );
}
