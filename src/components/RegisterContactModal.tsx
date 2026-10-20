import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, Heart, User, Mail, Phone, MapPin } from 'lucide-react';
import { saveContact } from '../services/contactService';
import { RegisteredContact } from '../types';

interface RegisterContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisteredSuccess?: (contact: RegisteredContact) => void;
}

export const RegisterContactModal: React.FC<RegisterContactModalProps> = ({
  isOpen,
  onClose,
  onRegisteredSuccess,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState('Peluches & Amigurumis');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    setLoading(true);
    try {
      const newContact = await saveContact({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim() || 'No especificada',
        interest,
        customerType: 'nuevo',
        notes: 'Registrado desde la tienda web para anuncios y promociones.',
        tags: [interest, 'Web']
      });

      setSuccess(true);
      if (onRegisteredSuccess) {
        onRegisteredSuccess(newContact);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7A6759] hover:text-[#382619] cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <div>
            <div className="flex items-center gap-2.5 text-[#8C5233] mb-1">
              <Sparkles className="w-5 h-5 text-[#C47E4D]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Comunidad del Taller
              </span>
            </div>
            
            <h3 className="font-fraunces text-2xl text-[#2F2117] font-normal leading-snug">
              Regístrate para Recibir Anuncios & Ofertas Exclusivas
            </h3>
            
            <p className="text-xs text-[#6B5A4E] mt-1.5 leading-relaxed">
              Sé la primera persona en enterarte de nuevos lanzamientos de ramos de flores eternas, 
              amigurumis y descuentos especiales guardados en nuestra base de datos.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#48372C] block mb-1">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Sofia Morales"
                    className="w-full bg-white border border-[#D5C6B5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                  />
                  <User className="w-4 h-4 text-[#8C7665] absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#48372C] block mb-1">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sofia@ejemplo.com"
                    className="w-full bg-white border border-[#D5C6B5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                  />
                  <Mail className="w-4 h-4 text-[#8C7665] absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#48372C] block mb-1">
                    WhatsApp / Teléfono *
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+54 9 11 2345..."
                      className="w-full bg-white border border-[#D5C6B5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                    />
                    <Phone className="w-4 h-4 text-[#8C7665] absolute left-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#48372C] block mb-1">
                    Ciudad / Región
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ej: Guadalajara"
                      className="w-full bg-white border border-[#D5C6B5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                    />
                    <MapPin className="w-4 h-4 text-[#8C7665] absolute left-3 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#48372C] block mb-1">
                  ¿Qué creaciones te interesan más?
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619]"
                >
                  <option value="Peluches & Amigurumis">Peluches & Amigurumis</option>
                  <option value="Ramos de Flores Eternas">Ramos de Flores Eternas</option>
                  <option value="Llaveros & Accesorios">Llaveros & Accesorios</option>
                  <option value="Hogar & Mantas">Hogar & Decoración</option>
                  <option value="Kits DIY para Tejer">Kits DIY para Tejer</option>
                  <option value="Todo el catálogo">Todo un poco</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-[#523C2B] hover:bg-[#3D2C1F] text-white text-xs font-semibold shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 text-[#E5A873]" />
                  <span>{loading ? 'Guardando en Firebase...' : 'Completar Registro'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#E5EFE6] text-[#427A50] flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-fraunces text-2xl text-[#2F2117] font-normal">
              ¡Bienvenida/o, {name}!
            </h3>

            <p className="text-xs text-[#6B5A4E] leading-relaxed max-w-sm mx-auto">
              Tus datos han quedado registrados en nuestra base de datos de Firebase. 
              Pronto recibirás promociones y novedades seleccionadas.
            </p>

            <div className="p-3 bg-[#EFE5D8] rounded-xl text-xs text-[#523C2B]">
              Tu cupón de regalo es: <strong className="font-mono text-sm">BIENVENIDA10</strong> (10% OFF)
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#4A3322] hover:bg-[#342418] text-white text-xs font-semibold cursor-pointer"
            >
              Cerrar y Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
