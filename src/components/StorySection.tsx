import React from 'react';
import { Sparkles, Heart, Shield, RefreshCw } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F5EDE1] border-t border-b border-[#E8DEC8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Images Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              <img
                src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=500&q=80"
                alt="Madejas de lana e hilo de algodón"
                className="w-full h-44 sm:h-52 object-cover rounded-2xl shadow-sm border border-[#E3D4C2]"
              />
              <img
                src="https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=500&q=80"
                alt="Detalle de tejido a ganchillo"
                className="w-full h-36 sm:h-44 object-cover rounded-2xl shadow-sm border border-[#E3D4C2]"
              />
            </div>
            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
              <img
                src="https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=500&q=80"
                alt="Amigurumi artesanal terminado"
                className="w-full h-36 sm:h-44 object-cover rounded-2xl shadow-sm border border-[#E3D4C2]"
              />
              <img
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=500&q=80"
                alt="Ramo floral de crochet empaquetado"
                className="w-full h-44 sm:h-52 object-cover rounded-2xl shadow-sm border border-[#E3D4C2]"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E5DAC8] text-[#554133] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B2643E]" />
              <span>Nuestra Filosofía de Taller</span>
            </div>

            <h2 className="font-fraunces text-3xl sm:text-4xl text-[#2F2117] font-normal leading-tight">
              Cada puntada lleva una historia,{' '}
              <span className="italic text-[#8C5233]">cada creación un pedacito de corazón</span>
            </h2>

            <p className="text-sm sm:text-base text-[#615045] leading-relaxed">
              En <strong>Hebras & Amor</strong> creemos en el valor de las cosas hechas sin prisas. 
              Frente a la producción en masa de peluches sintéticos y flores plásticas desechables, 
              nosotros rescatamos la milenaria tradición del crochet y el amigurumi para regalar 
              objetos con alma que permanecen vivos por años.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC8] space-y-1.5">
                <div className="flex items-center gap-2 text-[#8C5233] font-bold text-xs uppercase tracking-wide">
                  <Heart className="w-4 h-4 text-[#A8483B]" />
                  <span>100% Hecho a Mano</span>
                </div>
                <p className="text-xs text-[#6B5A4E]">
                  Sin máquinas ni moldes industriales. Cada flor y muñequito es único en expresión y detalle.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC8] space-y-1.5">
                <div className="flex items-center gap-2 text-[#8C5233] font-bold text-xs uppercase tracking-wide">
                  <Shield className="w-4 h-4 text-[#52795D]" />
                  <span>Hilos Hipoalergénicos</span>
                </div>
                <p className="text-xs text-[#6B5A4E]">
                  Fibras suaves de algodón y rellenos siliconados antipolvo, totalmente seguros para bebés y pieles sensibles.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC8] space-y-1.5">
                <div className="flex items-center gap-2 text-[#8C5233] font-bold text-xs uppercase tracking-wide">
                  <RefreshCw className="w-4 h-4 text-[#B27038]" />
                  <span>Flores que no Mueren</span>
                </div>
                <p className="text-xs text-[#6B5A4E]">
                  Tus ramos de tulipanes, girasoles y rosas duran para siempre sin agua, sol ni mantenimiento.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC8] space-y-1.5">
                <div className="flex items-center gap-2 text-[#8C5233] font-bold text-xs uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-[#A3523B]" />
                  <span>Empaque Listo para Regalo</span>
                </div>
                <p className="text-xs text-[#6B5A4E]">
                  Cajas de cartón kraft ecológico, lazos de yute natural y tarjetitas caligráficas con tu mensaje.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
