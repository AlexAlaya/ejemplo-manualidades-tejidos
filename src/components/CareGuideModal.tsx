import React from 'react';
import { X, Droplets, Wind, Sun, Sparkles, AlertCircle } from 'lucide-react';

interface CareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareGuideModal: React.FC<CareGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#4A3728] text-white flex items-center justify-between border-b border-[#3B2B1F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8DEC8]/20 flex items-center justify-center text-[#E8C4A2]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-fraunces text-xl sm:text-2xl font-normal leading-tight">
                Guía de Cuidado de Tejidos Artesanales
              </h2>
              <p className="text-xs text-[#E3D1C1] mt-0.5">
                Consejos prácticos para que tus piezas tejidas se conserven intactas por generaciones
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

        {/* Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs text-[#59473B]">
          
          {/* Amigurumis Section */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DFD3C3] space-y-3">
            <div className="font-fraunces text-base font-medium text-[#382619] flex items-center gap-2">
              <span>🧸</span>
              <span>Peluches & Amigurumis</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE2D3] space-y-1">
                <div className="font-semibold text-[#8C5233] flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Lavado Suave</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#6E5D50]">
                  Lavar a mano en agua fría con jabón blanco o neutro para prendas delicadas. No usar blanqueadores.
                </p>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE2D3] space-y-1">
                <div className="font-semibold text-[#8C5233] flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Sin Retorcer</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#6E5D50]">
                  Para retirar el exceso de agua, presiona con una toalla limpia. Nunca escurras retorciendo para evitar deformar el relleno.
                </p>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE2D3] space-y-1">
                <div className="font-semibold text-[#8C5233] flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Secado en Plano</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#6E5D50]">
                  Secar en posición horizontal sobre una toalla a la sombra. No colgar con pinzas ni exponer a sol directo.
                </p>
              </div>
            </div>
          </div>

          {/* Flores Eternas Section */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DFD3C3] space-y-3">
            <div className="font-fraunces text-base font-medium text-[#382619] flex items-center gap-2">
              <span>🌸</span>
              <span>Ramos de Flores Eternas</span>
            </div>

            <p className="text-xs leading-relaxed text-[#635145]">
              Tus flores están elaboradas con hilo de algodón mercerizado y tallos de alambre flexible de floristería. No necesitan agua jamás.
            </p>

            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#8C5233] font-bold">1.</span>
                <span><strong>Limpieza de polvo:</strong> Utiliza un secador de cabello en modo aire frío y velocidad mínima a 30 cm de distancia, o un pincel suave.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8C5233] font-bold">2.</span>
                <span><strong>Aromaterapia:</strong> Puedes vaporizar una gota de tu perfume preferido o aceite esencial de lavanda a 20 cm para darles aroma real.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8C5233] font-bold">3.</span>
                <span><strong>Moldear los tallos:</strong> Los tallos son maleables; puedes curvarlos suavemente para que luzcan perfectos en cualquier jarrón o florero.</span>
              </li>
            </ul>
          </div>

          {/* Llaveros y Mantas */}
          <div className="p-4 bg-[#F2EAE0] rounded-2xl border border-[#DFD3C3] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#8C5233] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-[#3B291D]">¿Dudas con una pieza especial?</div>
              <p className="text-[11px] text-[#6B5749] leading-relaxed">
                Todas nuestras piezas tienen garantía artesanal. Si alguna hebra o unión se suelta, 
                contáctanos por WhatsApp y te orientaremos con gusto o realizaremos el ajuste sin costo en nuestro taller.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F3ECE2] border-t border-[#E5DAC8] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#4A3322] hover:bg-[#342418] text-white text-xs font-semibold cursor-pointer"
          >
            Entendido, gracias
          </button>
        </div>

      </div>
    </div>
  );
};
