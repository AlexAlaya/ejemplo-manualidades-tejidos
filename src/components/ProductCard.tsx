import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const categoryLabels: Record<string, string> = {
    peluches: 'Amigurumi & Peluche',
    ramos: 'Flores Eternas',
    llaveros: 'Llavero Artesanal',
    hogar: 'Hogar & Confort',
    kits: 'Kit DIY de Tejido',
  };

  return (
    <div className="group relative bg-[#FAF7F2] rounded-2xl border border-[#E8DEC8] hover:border-[#CBB49C] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-[#EFE8DD] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-[#E3D4C2] flex items-center justify-center text-[#5C4533] hover:text-[#A8382F] hover:bg-white transition-all shadow-sm z-10 cursor-pointer"
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#A8382F] text-[#A8382F]' : ''
            }`}
          />
        </button>

        {/* Discreet corner note if bestseller or discount */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-[#422F22] text-[#FAF5ED] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
            Oferta -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Quick View & Actions Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onSelectProduct(product)}
            className="px-3 py-2 rounded-lg bg-white text-[#382619] text-xs font-semibold shadow hover:bg-[#F5EFE6] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver detalles</span>
          </button>
          <button
            onClick={() => onQuickAddToCart(product)}
            className="px-3 py-2 rounded-lg bg-[#5C422F] text-white text-xs font-semibold shadow hover:bg-[#433021] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Agregar</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata without pills (rule 1A zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#7A6759] mb-1.5">
            <span>{categoryLabels[product.category] || product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.timeToMake}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-fraunces text-base sm:text-lg text-[#2E2219] font-medium leading-snug hover:text-[#8C5233] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6B5A4E] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color preview dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[11px] text-[#857162] mr-1">Colores:</span>
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price and Rating Row */}
        <div className="pt-4 mt-3 border-t border-[#EDE4D5] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#2A1D15]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E8B7C] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-[#6E5949]">
            <Star className="w-3.5 h-3.5 fill-[#D99A46] text-[#D99A46]" />
            <span className="font-semibold text-[#3D2C20]">{product.rating}</span>
            <span className="text-[#998778]">({product.reviewsCount})</span>
          </div>
        </div>

      </div>

    </div>
  );
};
