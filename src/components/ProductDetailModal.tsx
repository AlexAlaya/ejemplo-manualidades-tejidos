import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Clock, 
  Ruler, 
  ShieldCheck, 
  MessageCircle,
  Plus,
  Minus,
  Gift
} from 'lucide-react';
import { Product, ProductSize } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (
    product: Product, 
    quantity: number, 
    color?: string, 
    size?: string, 
    woodTag?: string, 
    dedication?: string,
    giftWrap?: boolean
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || ''
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    product.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [includeWoodTag, setIncludeWoodTag] = useState(false);
  const [woodTagText, setWoodTagText] = useState('');
  const [dedicationNote, setDedicationNote] = useState('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const basePrice = product.price + (selectedSize ? selectedSize.extraPrice : 0);
  const addOnsTotal = (includeWoodTag ? 3.0 : 0) + (includeGiftWrap ? 2.5 : 0);
  const unitPrice = basePrice + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(
      product,
      quantity,
      selectedColor,
      selectedSize?.label,
      includeWoodTag ? woodTagText : undefined,
      dedicationNote || undefined,
      includeGiftWrap
    );
    setShowAddedToast(true);
    setTimeout(() => {
      setShowAddedToast(false);
      onClose();
    }, 1000);
  };

  const handleBuyViaWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola Hebras & Amor! 🧶 Me gustaría pedir:\n- Producto: ${product.name}\n- Color: ${selectedColor}\n${selectedSize ? `- Tamaño: ${selectedSize.label}\n` : ''}- Cantidad: ${quantity}\n${includeWoodTag ? `- Etiqueta de madera: "${woodTagText}"\n` : ''}${dedicationNote ? `- Tarjeta de dedicatoria: "${dedicationNote}"\n` : ''}${includeGiftWrap ? `- Empaque de regalo: Sí\n` : ''}- Total estimado: $${totalPrice.toFixed(2)}`
    );
    window.open(`https://wa.me/1234567890?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-[#E5DAC8] text-[#5C4533] hover:text-[#2E2016] hover:bg-white flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-[#F3ECE2] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DEC8]">
          <div className="space-y-4">
            {/* Main Featured Photo */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#E9DEC8] shadow-inner">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              
              <button
                onClick={() => onToggleWishlist(product)}
                className="absolute top-3 left-3 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-[#523B2A] hover:text-[#A8382F] shadow-sm transition-colors cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#A8382F] text-[#A8382F]' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#8F5938] scale-102 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Craft Guarantees */}
          <div className="mt-4 pt-4 border-t border-[#E3D6C5] grid grid-cols-2 gap-2 text-xs text-[#6E594A]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#A86438] shrink-0" />
              <span>{product.timeToMake}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-[#A86438] shrink-0" />
              <span>{product.dimensions}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Customizer */}
        <div className="md:w-1/2 p-5 sm:p-7 overflow-y-auto space-y-5">
          
          {/* Header */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8A6F5B] font-semibold">
              Tejido Artesanal a Crochet
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl text-[#2D2118] font-normal leading-tight mt-1">
              {product.name}
            </h2>

            {/* Price display */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-bold text-[#2E1E14]">
                ${unitPrice.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#9A8778] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#52795D] font-medium bg-[#E7EFE6] px-2.5 py-0.5 rounded-md">
                En stock ({product.stockCount} disponibles)
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5C4A3E] leading-relaxed">
            {product.description}
          </p>

          {/* Materials */}
          <div className="bg-[#F4ECE0] p-3.5 rounded-xl border border-[#E7DBCB]">
            <div className="text-xs font-semibold text-[#443327] mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4D7B58]" />
              Materiales & Confección:
            </div>
            <ul className="text-xs text-[#635144] space-y-1 list-disc list-inside">
              {product.materials.map((mat, i) => (
                <li key={i}>{mat}</li>
              ))}
            </ul>
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-[#4A392D] block mb-2">
                Color de Hilo Principal:{' '}
                <span className="font-normal text-[#786354]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#7E4C2E] bg-[#EFE3D5] text-[#342419] font-medium shadow-2xs'
                          : 'border-[#DFCDBE] bg-white text-[#635043] hover:border-[#BFAB99]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#7E4C2E]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes Selection (if available) */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-[#4A392D] block mb-2">
                Tamaño:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize?.label === size.label;
                  return (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#7E4C2E] bg-[#EFE3D5] font-semibold text-[#342419]'
                          : 'border-[#DFCDBE] bg-white text-[#635043] hover:border-[#BFAB99]'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{size.label}</span>
                        {size.extraPrice > 0 && (
                          <span className="text-[11px] text-[#8C5A3A]">
                            +${size.extraPrice}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Artisanal Custom Add-ons */}
          <div className="space-y-3 pt-2 border-t border-[#E8DEC8]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#735D4D]">
              Opciones de Personalización
            </div>

            {/* Wood Tag Engraving Option */}
            <div className="p-3 bg-white/80 rounded-xl border border-[#DFD3C3] space-y-2">
              <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-[#3D2C20]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A86438]" />
                  <span>Grabar medallita de madera (+ $3.00)</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeWoodTag}
                  onChange={(e) => setIncludeWoodTag(e.target.checked)}
                  className="rounded text-[#7E4C2E] focus:ring-[#7E4C2E]"
                />
              </label>
              {includeWoodTag && (
                <input
                  type="text"
                  maxLength={30}
                  value={woodTagText}
                  onChange={(e) => setWoodTagText(e.target.value)}
                  placeholder="Ej: 'Con amor, Sofía 🌸' o fecha '14.02.2026'"
                  className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-3 py-1.5 text-xs text-[#3B2B20] focus:outline-none focus:ring-1 focus:ring-[#7E4C2E]"
                />
              )}
            </div>

            {/* Gift Wrapping */}
            <div className="p-3 bg-white/80 rounded-xl border border-[#DFD3C3] space-y-2">
              <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-[#3D2C20]">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#A86438]" />
                  <span>Envoltura de regalo Kraft + Lazo de yute (+ $2.50)</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeGiftWrap}
                  onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                  className="rounded text-[#7E4C2E] focus:ring-[#7E4C2E]"
                />
              </label>
              <textarea
                rows={2}
                value={dedicationNote}
                onChange={(e) => setDedicationNote(e.target.value)}
                placeholder="Dedicatoria manuscrita gratuita para la tarjeta..."
                className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-3 py-1.5 text-xs text-[#3B2B20] focus:outline-none focus:ring-1 focus:ring-[#7E4C2E] resize-none"
              />
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="pt-4 border-t border-[#E8DEC8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#4A392D]">Cantidad:</span>
              <div className="flex items-center border border-[#D5C6B5] rounded-xl bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#6B5749] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
                  aria-label="Restar uno"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3.5 py-1 text-xs font-bold text-[#36261B]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="p-2 text-[#6B5749] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
                  aria-label="Sumar uno"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 rounded-xl bg-[#4A3322] hover:bg-[#342418] text-[#F7F2EB] font-semibold text-xs transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#E5A873]" />
                <span>Añadir al Carrito (${totalPrice.toFixed(2)})</span>
              </button>

              <button
                onClick={handleBuyViaWhatsApp}
                className="py-3 px-4 rounded-xl bg-[#2E6838] hover:bg-[#23532C] text-white font-semibold text-xs transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir por WhatsApp</span>
              </button>
            </div>

            {showAddedToast && (
              <div className="text-center text-xs font-semibold text-[#35613D] bg-[#E3EFE5] py-2 rounded-lg animate-fade-in">
                ✓ ¡Producto añadido al carrito con éxito!
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
