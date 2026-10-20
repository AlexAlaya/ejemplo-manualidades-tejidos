import React from 'react';
import { Sparkles, Heart, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroBannerProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenCustomBuilder: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenCustomBuilder,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EDE1] to-[#FAF7F2] border-b border-[#E8DEC8]">
      {/* Subtle organic craft pattern */}
      <div className="absolute inset-0 pattern-yarn opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8DEC8] text-[#5A4535] text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B2643E]"></span>
              Taller Textil Tradicional & Amigurumis
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl text-[#2F231B] font-normal leading-[1.15] tracking-tight">
              Puntadas de cariño que guardan momentos{' '}
              <span className="italic font-normal text-[#8A5134] underline decoration-[#DFBEA3] decoration-2 underline-offset-8">
                para siempre
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#615045] max-w-2xl leading-relaxed font-normal">
              Flores eternas que jamás se marchitan, peluches amigurumi tejidos con hilo de algodón 
              hipoalergénico y llaveros con alma. Cada creación nace a mano, una vuelta a la vez.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onSelectCategory('ramos')}
                className="px-6 py-3.5 rounded-xl bg-[#4A3525] hover:bg-[#342419] text-[#FAF7F2] font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer"
              >
                <span>Explorar Ramos Eternos</span>
                <ArrowRight className="w-4 h-4 text-[#D8A682]" />
              </button>

              <button
                onClick={onOpenCustomBuilder}
                className="px-6 py-3.5 rounded-xl bg-[#E8DFCFC7] hover:bg-[#E0D3BF] text-[#423124] border border-[#CDBEAA] font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#9C6544]" />
                <span>Personaliza tu Pedido</span>
              </button>
            </div>

            {/* Value Guarantees (Clean, unboxed typography) */}
            <div className="pt-6 border-t border-[#E5DAC8] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#5C4A3E]">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#A8483B] shrink-0" />
                <span className="font-medium">100% Hecho a Mano</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#52795D] shrink-0" />
                <span className="font-medium">Algodón Hipoalergénico</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A1713B] shrink-0" />
                <span className="font-medium">Durabilidad Infinita</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#945638] shrink-0" />
                <span className="font-medium">Cajas de Regalo Kraft</span>
              </div>
            </div>
          </div>

          {/* Right Column: Artisan Collage Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo: Handcrafted Bouquet & Plush */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#FAF7F2] bg-[#EFE6DB]">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80"
                  alt="Ramos y peluches artesanales tejidos a mano"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5 text-white">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#E8C4A2] font-semibold block">Colección Primavera</span>
                    <h3 className="font-fraunces text-xl font-medium text-white">Ramo de Tulipanes Eternos</h3>
                    <p className="text-xs text-[#E3D4C7] mt-0.5">Envoltorio floral coreano + Cinta de satén incluida</p>
                  </div>
                </div>
              </div>

              {/* Floating Mini Highlight Card (Amigurumi Bear or Keychain) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#FAF7F2] p-3 sm:p-4 rounded-xl shadow-lg border border-[#E3D6C5] flex items-center gap-3.5 max-w-[240px]">
                <img
                  src="https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=200&q=80"
                  alt="Osito amigurumi tejido"
                  className="w-14 h-14 rounded-lg object-cover border border-[#E0D2C0]"
                />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8A5B3D] font-bold">Favorito del Taller</div>
                  <div className="text-xs font-semibold text-[#30231B] leading-snug">Oso Teddy Vintage</div>
                  <div className="text-[11px] text-[#69584C]">Ojos seguros y suaves</div>
                </div>
              </div>

              {/* Floating Rating Pill-less badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#FAF7F2] py-2 px-3.5 rounded-xl shadow-md border border-[#E3D6C5] text-center">
                <div className="text-base font-bold text-[#382619]">★ 4.9 / 5</div>
                <div className="text-[10px] text-[#7A6455]">Más de 350 clientes felices</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
