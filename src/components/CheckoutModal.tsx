import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Truck, 
  CreditCard, 
  Building2, 
  Banknote, 
  Copy, 
  MessageCircle, 
  ArrowLeft,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { saveContact } from '../services/contactService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  shippingCost,
  total,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [copiedBank, setCopiedBank] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryType: 'home' as 'home' | 'pickup',
    address: '',
    city: '',
    postalCode: '',
    deliveryNotes: '',
    paymentMethod: 'transfer' as 'transfer' | 'card' | 'cash' | 'whatsapp',
    cardNumber: '',
    cardExp: '',
    cardCvv: '',
    orderNumber: '',
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as any);
    } else if (step === 3) {
      // Place order!
      const randomOrder = `HA-${Math.floor(1000 + Math.random() * 9000)}`;
      setFormData(prev => ({ ...prev, orderNumber: randomOrder }));
      setStep(4);
      
      // Save customer to Firebase Firestore
      if (formData.name && formData.phone) {
        saveContact({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city || 'No especificada',
          customerType: 'regular',
          notes: `Comprador web - Pedido #${randomOrder} ($${total.toFixed(2)})`,
          interest: 'Comprador Tienda',
          tags: ['Cliente', 'Comprador']
        }).catch(err => console.error('Error saving order contact to Firebase:', err));
      }

      // Trigger festive celebratory confetti
      confetti({
        particleCount: 110,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5A873', '#9C6544', '#52795D', '#D8A3BA', '#FAF7F2']
      });

      onOrderSuccess();
    }

  };

  const handleCopyAlias = () => {
    navigator.clipboard.writeText('hebras.amor.taller');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleWhatsAppOrderMessage = () => {
    const text = encodeURIComponent(
      `¡Hola Hebras & Amor! 🧶 Acabo de realizar la orden #${formData.orderNumber} en su tienda:\n\n` +
      `👤 Cliente: ${formData.name}\n` +
      `📱 Teléfono: ${formData.phone}\n` +
      `📍 Entrega: ${formData.deliveryType === 'home' ? formData.address + ', ' + formData.city : 'Retiro en Taller'}\n` +
      `💳 Método de pago: ${
        formData.paymentMethod === 'transfer' ? 'Transferencia Bancaria' : 
        formData.paymentMethod === 'cash' ? 'Pago en Efectivo contra Entrega' : 
        'Tarjeta Bancaria'
      }\n` +
      `💰 Total: $${total.toFixed(2)}\n\n` +
      `Envío este mensaje para coordinar los detalles. ¡Muchas gracias!`
    );
    window.open(`https://wa.me/1234567890?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#4A3728] text-white flex items-center justify-between border-b border-[#3B2B1F]">
          <div className="flex items-center gap-3">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="p-1 rounded-lg text-[#E8D6C6] hover:text-white cursor-pointer"
                aria-label="Paso anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="font-fraunces text-xl sm:text-2xl font-normal leading-tight">
                {step === 4 ? '¡Pedido Confirmado con Éxito!' : 'Finalizar tu Pedido'}
              </h2>
              {step < 4 && (
                <p className="text-xs text-[#E3D1C1]">
                  Paso {step} de 3 · {step === 1 ? 'Tus Datos' : step === 2 ? 'Dirección de Entrega' : 'Método de Pago'}
                </p>
              )}
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

        {/* Form Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#735D4D] font-bold">
                1. Información de Contacto
              </div>
              <p className="text-xs text-[#705C4D]">
                Te contactaremos para enviarte fotos del proceso de tejido y coordinar la entrega.
              </p>

              <div>
                <label className="text-xs font-semibold text-[#4A382C] block mb-1">
                  Nombre Completo *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Sofía Mendoza"
                  className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#4A382C] block mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+54 9 11 2345-6789"
                    className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4A382C] block mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sofia@ejemplo.com"
                    className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4A3322] hover:bg-[#342418] text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Continuar a Entrega →
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#735D4D] font-bold">
                2. Método y Dirección de Entrega
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: 'home' })}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    formData.deliveryType === 'home'
                      ? 'border-[#8F5938] bg-[#EFE4D6]'
                      : 'border-[#DFCDBE] bg-white'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#8F5938] mb-1" />
                  <div className="text-xs font-bold text-[#3B291D]">Envío a Domicilio</div>
                  <div className="text-[11px] text-[#7A6759]">Entrega por mensajería asegurada</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: 'pickup' })}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    formData.deliveryType === 'pickup'
                      ? 'border-[#8F5938] bg-[#EFE4D6]'
                      : 'border-[#DFCDBE] bg-white'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-[#8F5938] mb-1" />
                  <div className="text-xs font-bold text-[#3B291D]">Retiro en Taller</div>
                  <div className="text-[11px] text-[#7A6759]">Coordinar horario sin costo adicional</div>
                </button>
              </div>

              {formData.deliveryType === 'home' ? (
                <>
                  <div>
                    <label className="text-xs font-semibold text-[#4A382C] block mb-1">
                      Calle, Número y Depto/Casa *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Av. Los Robles 1234, Dpto 4B"
                      className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#4A382C] block mb-1">
                        Ciudad / Región *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Ciudad o Municipio"
                        className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#4A382C] block mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="1425"
                        className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#4A382C] block mb-1">
                      Notas especiales para el cartero / entrega (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryNotes}
                      onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                      placeholder="Tocar timbre blanco, dejar con portería..."
                      className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3.5 py-2.5 text-xs text-[#382619]"
                    />
                  </div>
                </>
              ) : (
                <div className="p-4 bg-[#F2EAE0] rounded-2xl border border-[#DFD3C3] text-xs text-[#635043] space-y-2">
                  <div className="font-bold text-[#3B291D]">Dirección del Taller Central:</div>
                  <p>Calle de las Hilanderas #48, Colonia Artesanal (Atención previa cita de Lunes a Sábado de 10:00 a 19:00 hrs).</p>
                  <p className="text-[11px] text-[#7A6759]">Te avisaremos por WhatsApp en cuanto tus tejidos estén empaquetados y listos para retirar.</p>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-medium text-[#7A6759] hover:text-[#3B291D] cursor-pointer"
                >
                  ← Volver a Datos
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4A3322] hover:bg-[#342418] text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Continuar a Pago →
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#735D4D] font-bold">
                3. Selecciona tu Forma de Pago
              </div>

              {/* Payment Methods Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'transfer', label: 'Transferencia Bancaria', icon: Building2, desc: 'Datos CBU / Alias' },
                  { key: 'cash', label: 'Contra Entrega', icon: Banknote, desc: 'Efectivo al recibir' },
                  { key: 'card', label: 'Tarjeta Débito/Crédito', icon: CreditCard, desc: 'Procesamiento seguro' },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: m.key as any })}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        formData.paymentMethod === m.key
                          ? 'border-[#8F5938] bg-[#EFE4D6]'
                          : 'border-[#DFCDBE] bg-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#8F5938] mb-1" />
                      <div className="text-xs font-bold text-[#3B291D]">{m.label}</div>
                      <div className="text-[10px] text-[#7A6759]">{m.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* Payment specific details */}
              {formData.paymentMethod === 'transfer' && (
                <div className="bg-white p-4 rounded-2xl border border-[#DFD3C3] space-y-3">
                  <div className="text-xs font-bold text-[#3B291D] flex items-center justify-between">
                    <span>Datos Bancarios para Transferencia:</span>
                    <button
                      type="button"
                      onClick={handleCopyAlias}
                      className="text-[11px] text-[#8F5938] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedBank ? '¡Copiado!' : 'Copiar Alias'}</span>
                    </button>
                  </div>
                  <div className="bg-[#FAF7F2] p-3 rounded-xl text-xs text-[#5C493D] space-y-1 font-mono">
                    <div><strong>Banco:</strong> Banco Artesanal Santander / Galicia</div>
                    <div><strong>Titular:</strong> Taller Hebras & Amor S.A.</div>
                    <div><strong>Alias:</strong> hebras.amor.taller</div>
                    <div><strong>CBU:</strong> 0720194888000039281742</div>
                  </div>
                  <p className="text-[11px] text-[#7A6759]">
                    * Podrás adjuntar el comprobante directamente a nuestro WhatsApp o responder al correo de confirmación.
                  </p>
                </div>
              )}

              {formData.paymentMethod === 'card' && (
                <div className="bg-white p-4 rounded-2xl border border-[#DFD3C3] space-y-3">
                  <div className="text-xs font-bold text-[#3B291D] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#52795D]" />
                    <span>Pasarela Cifrada SSL 256 bits</span>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#4A382C] block mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="4532 •••• •••• 8921"
                      className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#4A382C] block mb-1">
                        Vencimiento (MM/AA)
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        placeholder="08/28"
                        className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#4A382C] block mb-1">
                        Código de Seguridad (CVV)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={formData.cardCvv}
                        onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                        placeholder="•••"
                        className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'cash' && (
                <div className="bg-[#FAF4EC] p-4 rounded-2xl border border-[#DFD3C3] text-xs text-[#635043] space-y-1">
                  <div className="font-bold text-[#3B291D]">Pago en Efectivo al Entregar</div>
                  <p>Abonas el importe exacto (${total.toFixed(2)}) al repartidor cuando recibas tu paquete en mano.</p>
                </div>
              )}

              {/* Order total confirmation pill */}
              <div className="p-3.5 bg-[#F2EAE0] rounded-2xl border border-[#DFD3C3] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#7A6759]">Total final a pagar:</div>
                  <div className="text-xl font-bold text-[#362215]">${total.toFixed(2)}</div>
                </div>
                <div className="text-xs text-[#52795D] font-medium">
                  {items.length} artículo(s)
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-medium text-[#7A6759] hover:text-[#3B291D] cursor-pointer"
                >
                  ← Volver a Entrega
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#52795D] hover:bg-[#3E5F48] text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirmar y Enviar Pedido</span>
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E5EFE6] text-[#427A50] flex items-center justify-center shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#735D4D] font-bold">
                  Orden #{formData.orderNumber}
                </span>
                <h3 className="font-fraunces text-2xl text-[#2F2117] font-normal mt-1">
                  ¡Gracias por valorar lo hecho a mano, {formData.name}!
                </h3>
                <p className="text-xs text-[#6B5A4E] max-w-md mx-auto mt-2 leading-relaxed">
                  Hemos recibido tu pedido correctamente. La artesana comenzará la preparación 
                  con todo el cariño del mundo. Te enviamos la confirmación a <strong>{formData.email}</strong>.
                </p>
              </div>

              {/* Summary box */}
              <div className="bg-white max-w-md mx-auto p-4 rounded-2xl border border-[#E3D6C5] text-left text-xs space-y-2 text-[#5E4C3F]">
                <div className="font-bold text-[#3B2A1E] pb-1 border-b border-[#F0E6D8] flex justify-between">
                  <span>Resumen del Encargo:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div><strong>Destinatario:</strong> {formData.name} ({formData.phone})</div>
                <div><strong>Entrega:</strong> {formData.deliveryType === 'home' ? formData.address + ', ' + formData.city : 'Retiro en Taller'}</div>
                <div><strong>Pago:</strong> {formData.paymentMethod === 'transfer' ? 'Transferencia Bancaria' : formData.paymentMethod === 'cash' ? 'Contra Entrega' : 'Tarjeta Débito/Crédito'}</div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppOrderMessage}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#2E6838] hover:bg-[#23532C] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar resumen a la artesana por WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#4A3322] hover:bg-[#342418] text-white text-xs font-semibold cursor-pointer"
                >
                  Volver a la Tienda
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
