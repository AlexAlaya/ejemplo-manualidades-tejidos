import React, { useState } from 'react';
import { Heart, Send, MessageCircle, Mail, MapPin } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenCustomBuilder: () => void;
  onOpenCareGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCustomBuilder,
  onOpenCareGuide,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#3D2C20] text-[#EFE7DC] border-t border-[#312319] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#E8DEC8]/20 border border-[#E8DEC8]/30 flex items-center justify-center text-[#E5A873]">
                <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l-7 7" strokeWidth="2" />
                </svg>
              </div>
              <span className="font-fraunces text-2xl font-semibold text-white tracking-tight">
                Hebras & Amor
              </span>
            </div>

            <p className="text-xs text-[#C7B5A4] leading-relaxed max-w-sm">
              Tienda y taller de manualidades tejidas a mano. Amigurumis tiernos, ramos de flores 
              eternas para ocasiones memorables y accesorios únicos hechos con paciencia y cariño.
            </p>

            <div className="space-y-1.5 text-xs text-[#D8C7B8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E5A873]" />
                <span>Taller Textil · Entregas y Envíos a todo el país</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E5A873]" />
                <span>contacto@hebrasyamor.art</span>
              </div>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E5A873]">
              Catálogo Artesanal
            </div>
            <ul className="space-y-2 text-xs text-[#C7B5A4]">
              <li>
                <button
                  onClick={() => onSelectCategory('peluches')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Peluches & Amigurumis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ramos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ramos de Flores Eternas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('llaveros')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Llaveros & Accesorios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('hogar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hogar & Mantas Chunky
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('kits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kits DIY para Aprender
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Guides */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E5A873]">
              Atención & Taller
            </div>
            <ul className="space-y-2 text-xs text-[#C7B5A4]">
              <li>
                <button
                  onClick={onOpenCustomBuilder}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Personalizar Pedido a Medida
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCareGuide}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Guía de Lavado & Cuidado
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890?text=Hola!%20Tengo%20una%20consulta%20sobre%20los%20tejidos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#52A36B]" />
                  <span>WhatsApp de Atención Directa</span>
                </a>
              </li>
              <li>
                <span className="text-[#998778]">Horario: Lun a Sáb 9:00 - 19:00</span>
              </li>
            </ul>
          </div>

          {/* Newsletter for 10% coupon */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E5A873]">
              Comunidad del Taller
            </div>
            <p className="text-xs text-[#C7B5A4] leading-relaxed">
              Suscríbete y recibe un <strong>10% OFF</strong> en tu primer pedido con el código <span className="text-white font-mono bg-[#543F30] px-1.5 py-0.5 rounded">BIENVENIDA10</span>.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-[#4B6B4F] text-white text-xs rounded-xl font-medium">
                ✓ ¡Bienvenida/o! Usa el código <strong>BIENVENIDA10</strong> al finalizar tu compra.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Tu correo electrónico..."
                    className="w-full bg-[#4E392B] border border-[#6B513E] rounded-xl px-3 py-2 text-xs text-white placeholder-[#A89484] focus:outline-none focus:ring-1 focus:ring-[#E5A873]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#8C5233] hover:bg-[#A3623E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Unirme & Recibir Descuento</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 border-t border-[#4E3A2B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E8B7C]">
          <div className="flex items-center gap-1.5">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-[#B84E4E] fill-current" />
            <span>y lana de alta calidad · Hebras & Amor © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Envíos Seguros a Todo el Territorio</span>
            <span>·</span>
            <span>Garantía Artesanal</span>
            <span>·</span>
            <span>Pagos Protegidos</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
