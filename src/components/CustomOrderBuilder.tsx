import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Check, 
  ShoppingBag,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { Product } from '../types';

interface CustomOrderBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomToCart: (customProduct: Product, note: string) => void;
}

export const CustomOrderBuilder: React.FC<CustomOrderBuilderProps> = ({
  isOpen,
  onClose,
  onAddCustomToCart,
}) => {
  if (!isOpen) return null;

  const [itemType, setItemType] = useState<'ramo' | 'peluche' | 'llavero'>('ramo');
  const [palette, setPalette] = useState('Pastel Primaveral');
  const [description, setDescription] = useState('');
  const [woodTag, setWoodTag] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [packaging, setPackaging] = useState<'korean' | 'kraft' | 'clasico'>('korean');
  const [deliveryUrgency, setDeliveryUrgency] = useState<'normal' | 'express'>('normal');

  // Calculate dynamic estimated budget
  const basePrices = {
    ramo: 38.0,
    peluche: 32.0,
    llavero: 14.0,
  };

  const packagingExtra = packaging === 'korean' ? 4.0 : packaging === 'kraft' ? 3.0 : 0;
  const woodTagExtra = woodTag.trim() ? 3.0 : 0;
  const urgencyExtra = deliveryUrgency === 'express' ? 8.0 : 0;
  const totalEstimate = basePrices[itemType] + packagingExtra + woodTagExtra + urgencyExtra;

  const palettes = [
    { name: 'Pastel Primaveral', colors: ['#E8B4B8', '#EED7C5', '#B8C5D6'] },
    { name: 'Tierra & Bosque', colors: ['#6B705C', '#A5A58D', '#CB997E'] },
    { name: 'San Valentín & Pasión', colors: ['#9D0208', '#D00000', '#FCEADE'] },
    { name: 'Girasoles & Sol', colors: ['#E79E2A', '#F7D070', '#8D5B4C'] },
    { name: 'Personalizado Total', colors: ['#3A506B', '#5BC0BE', '#6FFFE9'] },
  ];

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `¡Hola Hebras & Amor! 🌸 Me gustaría cotizar un pedido artesanal personalizado:\n\n` +
      `📌 Tipo: ${itemType === 'ramo' ? 'Ramo de Flores Eternas' : itemType === 'peluche' ? 'Peluche / Amigurumi' : 'Llavero'}\n` +
      `🎨 Paleta elegida: ${palette}\n` +
      `📝 Detalles de mi diseño: ${description || 'A acordar con la artesana'}\n` +
      `🏷️ Medalla de madera: ${woodTag || 'Sin medallita'}\n` +
      `💌 Dedicatoria: ${cardMessage || 'Sin dedicatoria'}\n` +
      `📦 Empaque: ${packaging === 'korean' ? 'Envoltorio Coreano Floral' : packaging === 'kraft' ? 'Caja Kraft con ventana' : 'Bolsa ecológica'}\n` +
      `⏳ Plazo: ${deliveryUrgency === 'express' ? 'Urgente Express (2 días)' : 'Estándar (4-5 días)'}\n` +
      `💰 Presupuesto estimado: ~$${totalEstimate.toFixed(2)}\n\n` +
      `¿Tienen disponibilidad de agenda? ¡Gracias!`
    );
    window.open(`https://wa.me/1234567890?text=${text}`, '_blank');
  };

  const handleAddToCartCommission = () => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Pedido Especial: ${itemType === 'ramo' ? 'Ramo a Medida' : itemType === 'peluche' ? 'Amigurumi Personalizado' : 'Llavero Personalizado'}`,
      category: itemType === 'ramo' ? 'ramos' : itemType === 'peluche' ? 'peluches' : 'llaveros',
      price: totalEstimate,
      rating: 5.0,
      reviewsCount: 1,
      shortDescription: `Creación personalizada con paleta "${palette}".`,
      description: `Comisión artesanal única. Detalles: ${description || 'Especificaciones del cliente'}. Medallita: ${woodTag || 'N/A'}. Empaque: ${packaging}.`,
      materials: ['Hilados de algodón seleccionados a mano', 'Empaque artesanal'],
      timeToMake: deliveryUrgency === 'express' ? 'Elaboración Express (48h)' : 'Elaboración artesanal (4-5 días)',
      dimensions: 'A medida según solicitud',
      inStock: true,
      stockCount: 1,
      images: [
        itemType === 'ramo' 
          ? 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80'
          : itemType === 'peluche'
          ? 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
      ],
      tags: ['Personalizado', 'Exclusivo'],
      colors: [{ name: palette, hex: '#8A5B3D' }],
      isFeatured: false,
    };

    onAddCustomToCart(customProduct, description);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#4A3728] text-[#F9F5EF] flex items-center justify-between border-b border-[#3B2B1F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8DEC8]/20 flex items-center justify-center text-[#E8C4A2]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-fraunces text-xl sm:text-2xl font-normal leading-none text-white">
                Taller de Pedidos Personalizados
              </h2>
              <p className="text-xs text-[#DEC9B7] mt-1">
                Cuéntanos tu idea y nuestra artesana la tejerá puntada a puntada
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Step 1: Base Type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#634F40] block mb-2.5">
              1. ¿Qué tipo de creación deseas encargar?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'ramo', label: 'Ramo de Flores', icon: '🌸', desc: 'Tulipanes, rosas, girasoles' },
                { key: 'peluche', label: 'Peluche Amigurumi', icon: '🧸', desc: 'Animalitos, personajes' },
                { key: 'llavero', label: 'Llavero o Colgante', icon: '🔑', desc: 'Miniaturas, parejas' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setItemType(item.key as any)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    itemType === item.key
                      ? 'border-[#8F5938] bg-[#EFE4D6] shadow-2xs'
                      : 'border-[#DFCDBE] bg-white hover:border-[#BAA38F]'
                  }`}
                >
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <div className="text-xs font-bold text-[#382619]">{item.label}</div>
                  <div className="text-[11px] text-[#7A6759] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Color Palette */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#634F40] block mb-2.5">
              2. Elige la combinación de colores
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {palettes.map((p) => {
                const isSelected = palette === p.name;
                return (
                  <button
                    key={p.name}
                    onClick={() => setPalette(p.name)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#8F5938] bg-[#EFE4D6] font-semibold text-[#302116]'
                        : 'border-[#DFCDBE] bg-white text-[#5E4C3F] hover:border-[#BAA38F]'
                    }`}
                  >
                    <span className="text-xs">{p.name}</span>
                    <div className="flex gap-1">
                      {p.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Description & Reference */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#634F40] block mb-1">
              3. Describe tu diseño especial
            </label>
            <p className="text-xs text-[#7A6759] mb-2">
              Indica detalles como flores deseadas, fotos que tengas de referencia, nombres o detalles especiales.
            </p>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Me gustaría un ramo con 3 tulipanes morados, 2 margaritas blancas con centro amarillo y un lazo de encaje color crema..."
              className="w-full bg-white border border-[#D5C6B5] rounded-xl p-3 text-xs text-[#38281E] focus:outline-none focus:ring-2 focus:ring-[#8F5938] resize-none"
            />
          </div>

          {/* Step 4: Add-ons: Medalla de madera & Dedicatoria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-white rounded-xl border border-[#DFD3C3] space-y-1.5">
              <label className="text-xs font-semibold text-[#3B2A1E] block">
                Medallita grabada en madera (+ $3.00)
              </label>
              <input
                type="text"
                maxLength={30}
                value={woodTag}
                onChange={(e) => setWoodTag(e.target.value)}
                placeholder="Ej: 'Te amo Ana · 2026'"
                className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-2.5 py-1.5 text-xs text-[#38281E]"
              />
              <span className="text-[10px] text-[#7A685B] block">Grabado a láser en rodaja de pino</span>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-[#DFD3C3] space-y-1.5">
              <label className="text-xs font-semibold text-[#3B2A1E] block">
                Tarjeta con dedicatoria manuscrita (Gratis)
              </label>
              <input
                type="text"
                maxLength={90}
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                placeholder="Dedicatoria para la persona especial..."
                className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-2.5 py-1.5 text-xs text-[#38281E]"
              />
              <span className="text-[10px] text-[#7A685B] block">Escrita con caligrafía artesanal</span>
            </div>
          </div>

          {/* Step 5: Packaging & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#634F40] block mb-1.5">
                Empaque de Presentación
              </label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value as any)}
                className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#38281E] focus:outline-none"
              >
                <option value="korean">Envoltorio Coreano Floral de Lujo (+ $4.00)</option>
                <option value="kraft">Caja Kraft con ventana y lazo de yute (+ $3.00)</option>
                <option value="clasico">Bolsita Ecológica de Tela de Algodón ($0.00)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#634F40] block mb-1.5">
                Tiempo de Confección
              </label>
              <select
                value={deliveryUrgency}
                onChange={(e) => setDeliveryUrgency(e.target.value as any)}
                className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#38281E] focus:outline-none"
              >
                <option value="normal">Estándar: 4 a 5 días de tejido artesanal</option>
                <option value="express">Express Prioritario: 48 horas (+ $8.00)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Footer: Live Quote & Direct WhatsApp / Add to Cart */}
        <div className="p-4 sm:p-5 bg-[#F2E8DC] border-t border-[#E3D6C5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[#7A6555]">Presupuesto total estimado:</div>
            <div className="text-2xl font-bold text-[#362215]">
              ${totalEstimate.toFixed(2)}
            </div>
            <div className="text-[11px] text-[#55785C] font-medium flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Sin cobros ocultos · Revisión previa con fotos antes de despachar</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={handleAddToCartCommission}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#593F2B] hover:bg-[#432F1F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#E6B894]" />
              <span>Añadir a mi Carrito</span>
            </button>

            <button
              onClick={handleWhatsAppSend}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#2E6838] hover:bg-[#23532C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
