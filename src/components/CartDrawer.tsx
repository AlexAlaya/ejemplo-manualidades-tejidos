import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Gift, 
  ArrowRight, 
  Truck, 
  Tag, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  discountAmount: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  discountAmount,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 45.0;

  // Calculate items subtotal
  const subtotal = items.reduce((sum, item) => {
    let price = item.product.price;
    if (item.woodTagText) price += 3.0;
    if (item.giftWrapping) price += 2.5;
    return sum + price * item.quantity;
  }, 0);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping || items.length === 0 ? 0 : 4.50;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (!success) {
      setCouponError('Cupón inválido o expirado. Prueba: BIENVENIDA10');
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const itemListText = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.name} (x${it.quantity}) - $${(it.product.price * it.quantity).toFixed(2)}\n` +
          `   - Color: ${it.selectedColor || 'Estándar'}\n` +
          `${it.selectedSize ? `   - Tamaño: ${it.selectedSize}\n` : ''}` +
          `${it.woodTagText ? `   - Medalla grabada: "${it.woodTagText}"\n` : ''}` +
          `${it.customNote ? `   - Dedicatoria: "${it.customNote}"\n` : ''}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `¡Hola Hebras & Amor! 🧶 Quisiera confirmar mi pedido:\n\n${itemListText}\n\n` +
      `Subtotal: $${subtotal.toFixed(2)}\n` +
      `${discountAmount > 0 ? `Descuento: -$${discountAmount.toFixed(2)}\n` : ''}` +
      `Envío: ${isFreeShipping ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}\n` +
      `TOTAL: $${total.toFixed(2)}\n\n` +
      `¿Cómo procedemos con el pago y envío? ¡Muchas gracias!`
    );

    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DAC8] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F4EDE2]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#8C5233]" />
            <h2 className="font-fraunces text-xl text-[#36261B] font-medium">
              Tu Carrito de Compras
            </h2>
            <span className="text-xs font-bold text-[#8C5233] bg-[#E8DEC8] px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B5749] hover:text-[#2D2118] hover:bg-[#EAE0D1] transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#EFE7DC] px-4 py-3 border-b border-[#E3D6C5]">
          <div className="flex items-center justify-between text-xs font-medium text-[#4D3B2F] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#52795D]" />
              {isFreeShipping ? (
                <span className="text-[#32613C] font-semibold">¡Genial! Calificas para Envío Gratis 🚚</span>
              ) : (
                <span>Añade ${amountNeededForFreeShipping.toFixed(2)} más para <strong>Envío Gratis</strong></span>
              )}
            </span>
            <span className="text-[11px] text-[#7A6759]">Meta: $45.00</span>
          </div>
          <div className="w-full bg-[#DFD3C3] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#52795D] h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EFE6DB] flex items-center justify-center text-[#8C6D58]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-fraunces text-lg text-[#3E2E23]">Tu cesta está vacía</h3>
              <p className="text-xs text-[#7A695C] max-w-xs mx-auto">
                Explora nuestros peluches tejidos, flores eternas y accesorios hechos a mano para llenar tu carrito de magia.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#593F2B] text-white text-xs font-semibold hover:bg-[#432F1F] transition-colors cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice = item.product.price + (item.woodTagText ? 3.0 : 0) + (item.giftWrapping ? 2.5 : 0);
              const lineTotal = itemPrice * item.quantity;

              return (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-2xl p-3.5 border border-[#E8DEC8] shadow-2xs flex gap-3 relative"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#F3ECE2] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-5">
                        <h4 className="font-fraunces text-sm font-medium text-[#2F2117] leading-snug">
                          {item.product.name}
                        </h4>
                      </div>

                      {/* Options info */}
                      <div className="text-[11px] text-[#7A6759] space-y-0.5 mt-1">
                        {item.selectedColor && (
                          <div>Color: <span className="font-medium text-[#48372C]">{item.selectedColor}</span></div>
                        )}
                        {item.selectedSize && (
                          <div>Tamaño: <span className="font-medium text-[#48372C]">{item.selectedSize}</span></div>
                        )}
                        {item.woodTagText && (
                          <div className="text-[#8C5A38] font-medium flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Etiqueta: "{item.woodTagText}"</span>
                          </div>
                        )}
                        {item.giftWrapping && (
                          <div className="text-[#557B5F] font-medium flex items-center gap-1">
                            <Gift className="w-2.5 h-2.5" />
                            <span>Empaque de regalo incluido</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price and Quantity stepper */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2ECE4]">
                      <span className="text-sm font-bold text-[#342419]">
                        ${lineTotal.toFixed(2)}
                      </span>

                      <div className="flex items-center border border-[#DFD3C3] rounded-lg bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-[#6B5749] hover:bg-[#EDE3D4] rounded-l cursor-pointer"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#3D2C20]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-[#6B5749] hover:bg-[#EDE3D4] rounded-r cursor-pointer"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.cartItemId)}
                    className="absolute top-2.5 right-2.5 text-[#A69385] hover:text-[#A8382F] transition-colors cursor-pointer"
                    aria-label="Eliminar del carrito"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Coupon, Summary & Checkout CTAs */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#F5EDE1] border-t border-[#E8DEC8] space-y-3.5">
            
            {/* Promo coupon form */}
            {!couponCode ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Código de cupón (ej: BIENVENIDA10)"
                    className="w-full uppercase bg-white border border-[#D5C6B5] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#382619] placeholder-[#948375] focus:outline-none focus:ring-1 focus:ring-[#8C5233]"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#948375] absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-[#5E4430] hover:bg-[#483323] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between bg-[#E6EFE6] px-3 py-1.5 rounded-xl border border-[#C5DDC5] text-xs">
                <span className="text-[#32613C] font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Cupón activo: {couponCode} (-${discountAmount.toFixed(2)})
                </span>
                <button
                  onClick={onRemoveCoupon}
                  className="text-[#8B3B3B] hover:underline cursor-pointer"
                >
                  Quitar
                </button>
              </div>
            )}

            {couponError && (
              <p className="text-[11px] text-[#A8382F]">{couponError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#635043] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#35613D]">
                  <span>Descuento aplicado</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío estimado</span>
                <span>{isFreeShipping ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2E1E14] pt-2 border-t border-[#DFD3C3]">
                <span>Total a pagar</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 rounded-xl bg-[#4A3322] hover:bg-[#342418] text-[#FAF7F2] text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Finalizar Compra / Elegir Pago</span>
                <ArrowRight className="w-4 h-4 text-[#DDB08E]" />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 rounded-xl bg-[#2E6838] hover:bg-[#23532C] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir directo por WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
