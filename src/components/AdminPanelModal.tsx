import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  Send, 
  Search, 
  CheckSquare, 
  Square, 
  MessageCircle, 
  Mail, 
  Phone, 
  Trash2, 
  Tag, 
  Sparkles, 
  CheckCircle, 
  Copy, 
  History,
  UserPlus,
  ExternalLink,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RegisteredContact, AnnouncementRecord } from '../types';
import { 
  fetchContacts, 
  saveContact, 
  deleteContact, 
  fetchAnnouncements, 
  createAnnouncement, 
  deleteAnnouncement 
} from '../services/contactService';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'contacts' | 'compose' | 'history'>('contacts');
  
  // Contacts state
  const [contacts, setContacts] = useState<RegisteredContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInterest, setFilterInterest] = useState('todos');
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  // Add contact form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactCity, setNewContactCity] = useState('');
  const [newContactInterest, setNewContactInterest] = useState('Peluches & Amigurumis');

  // Compose Announcement state
  const [annTitle, setAnnTitle] = useState('🌸 ¡Nuevas Creaciones Tejidas & Descuento Especial!');
  const [annMessage, setAnnMessage] = useState(
    'Hola {nombre}, ¡esperamos que estés muy bien! 🧶 Te escribimos desde el taller artesanal Hebras & Amor para compartirte nuestras flores eternas y amigurumis recién tejidos. Queremos regalarte este descuento exclusivo para tus pedidos.'
  );
  const [annCategory, setAnnCategory] = useState('Promoción de Temporada');
  const [annCoupon, setAnnCoupon] = useState('HEBRAS15');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [copiedEmails, setCopiedEmails] = useState(false);

  // WhatsApp queue tracker
  const [sentWhatsappIds, setSentWhatsappIds] = useState<string[]>([]);

  // History state
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load contacts from Firebase
  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingContacts(false);
    }
  };

  // Load history from Firebase
  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadContacts();
      loadHistory();
    }
  }, [isOpen]);

  // Filtering contacts
  const filteredContacts = contacts.filter((c) => {
    if (filterInterest !== 'todos' && c.interest && !c.interest.toLowerCase().includes(filterInterest.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchPhone = c.phone.toLowerCase().includes(q);
      const matchCity = c.city?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchCity) return false;
    }
    return true;
  });

  // Toggle selection
  const toggleSelectContact = (id: string) => {
    setSelectedContactIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedContactIds.length === filteredContacts.length) {
      setSelectedContactIds([]);
    } else {
      setSelectedContactIds(filteredContacts.map(c => c.id));
    }
  };

  // Add Contact to Firebase
  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactEmail.trim() || !newContactPhone.trim()) return;

    try {
      const created = await saveContact({
        name: newContactName.trim(),
        email: newContactEmail.trim(),
        phone: newContactPhone.trim(),
        city: newContactCity.trim() || 'No especificada',
        interest: newContactInterest,
        customerType: 'nuevo',
        notes: 'Agregado manualmente desde el panel de administración',
        tags: [newContactInterest, 'Admin']
      });

      setContacts([created, ...contacts]);
      setShowAddForm(false);
      setNewContactName('');
      setNewContactEmail('');
      setNewContactPhone('');
      setNewContactCity('');
    } catch (err) {
      console.error('Error creating contact:', err);
    }
  };

  // Delete Contact from Firebase
  const handleDeleteContact = async (id: string, name: string) => {
    if (!window.confirm(`¿Seguro que deseas eliminar a "${name}" de la base de datos de Firebase?`)) return;
    try {
      await deleteContact(id);
      setContacts(contacts.filter(c => c.id !== id));
      setSelectedContactIds(selectedContactIds.filter(selectedId => selectedId !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Send / Save Announcement to Firebase
  const handleSaveAndSendAnnouncement = async () => {
    if (!annTitle.trim() || !annMessage.trim() || selectedContactIds.length === 0) return;

    setIsSending(true);
    try {
      const selectedPersons = contacts.filter(c => selectedContactIds.includes(c.id));
      const targetUserNames = selectedPersons.map(p => p.name);

      await createAnnouncement({
        title: annTitle.trim(),
        message: annMessage.trim(),
        targetUserIds: selectedContactIds,
        targetUserNames,
        targetCategory: annCategory,
        couponCode: annCoupon.trim() || undefined,
        author: 'Taller Hebras & Amor',
        sentChannels: ['Firebase Firestore', 'Email', 'WhatsApp Directo']
      });

      setSendSuccess(true);
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E5A873', '#9C6544', '#52795D', '#D8A3BA']
      });

      loadHistory();
      setTimeout(() => setSendSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  // ==========================================
  // AUTOMATED APPLICATION LAUNCHERS
  // ==========================================

  // 1. DIRECT WHATSAPP LAUNCHER (Opens WhatsApp directly)
  const handleOpenWhatsAppForContact = (contact: RegisteredContact, customText?: string) => {
    const rawText = customText 
      ? customText.replace(/{nombre}/g, contact.name)
      : `${annTitle ? `*${annTitle}*\n\n` : ''}${annMessage.replace(/{nombre}/g, contact.name)}\n\n${annCoupon ? `🏷️ Cupón de regalo: *${annCoupon}*\n\n` : ''}Con amor, Hebras & Amor 🧶`;
    
    const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(rawText)}`;
    
    // Mark as opened in state
    setSentWhatsappIds(prev => prev.includes(contact.id) ? prev : [...prev, contact.id]);
    
    // Open WhatsApp directly
    window.open(url, '_blank');
  };

  // 2. DIRECT DEFAULT EMAIL APP LAUNCHER (Opens Outlook / Apple Mail / default mail client)
  const handleDirectOpenNativeEmail = () => {
    if (selectedContactIds.length === 0) return;
    const selectedEmails = contacts.filter(c => selectedContactIds.includes(c.id)).map(c => c.email);
    const subject = annTitle.trim() || 'Aviso especial de Hebras & Amor';
    const bodyText = `${annMessage.replace(/{nombre}/g, 'Estimada/o cliente')}\n\n${annCoupon ? `🏷️ Cupón de descuento: ${annCoupon} (válido en nuestra tienda online)\n\n` : ''}Taller Textil Hebras & Amor 🌸`;
    
    // Open default email application directly with BCC
    const mailtoUrl = `mailto:?bcc=${encodeURIComponent(selectedEmails.join(','))}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
  };

  // 3. DIRECT GMAIL WEB LAUNCHER (Opens Gmail compose tab in browser directly)
  const handleDirectOpenGmailWeb = () => {
    if (selectedContactIds.length === 0) return;
    const selectedEmails = contacts.filter(c => selectedContactIds.includes(c.id)).map(c => c.email);
    const subject = annTitle.trim() || 'Aviso especial de Hebras & Amor';
    const bodyText = `${annMessage.replace(/{nombre}/g, 'Estimada/o cliente')}\n\n${annCoupon ? `🏷️ Cupón de descuento: ${annCoupon} (válido en nuestra tienda online)\n\n` : ''}Taller Textil Hebras & Amor 🌸`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&bcc=${encodeURIComponent(selectedEmails.join(','))}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    window.open(gmailUrl, '_blank');
  };

  // 4. DIRECT INDIVIDUAL EMAIL LAUNCHER
  const handleOpenIndividualEmail = (contact: RegisteredContact) => {
    const subject = annTitle.trim() || 'Mensaje de Hebras & Amor';
    const bodyText = `Hola ${contact.name},\n\n${annMessage.replace(/{nombre}/g, contact.name)}\n\n${annCoupon ? `🏷️ Cupón de descuento: ${annCoupon}\n\n` : ''}Con cariño, Taller Hebras & Amor 🧶`;
    window.location.href = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  };

  // Copy selected emails
  const handleCopyEmails = () => {
    const selectedEmails = contacts
      .filter(c => selectedContactIds.includes(c.id))
      .map(c => c.email)
      .join(', ');
    
    navigator.clipboard.writeText(selectedEmails);
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2500);
  };

  // Next unsent contact in queue
  const selectedContactsList = contacts.filter(c => selectedContactIds.includes(c.id));
  const nextUnsentContact = selectedContactsList.find(c => !sentWhatsappIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#3F2E22] text-[#F9F5EF] flex items-center justify-between border-b border-[#302218]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8DEC8]/20 flex items-center justify-center text-[#E5A873]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-fraunces text-xl sm:text-2xl font-normal leading-tight text-white">
                  Base de Datos & Envío Directo de Anuncios
                </h2>
                <span className="text-[10px] bg-[#52795D] text-white px-2 py-0.5 rounded-full font-semibold">
                  Firebase Firestore Activo
                </span>
              </div>
              <p className="text-xs text-[#DAC4B1] mt-0.5">
                Contacta por WhatsApp y Correo abriendo directamente las aplicaciones correspondientes
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

        {/* Tab Navigation */}
        <div className="px-6 bg-[#EFE6DB] border-b border-[#E3D6C5] flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'contacts'
                ? 'border-[#8C5233] text-[#3B291D]'
                : 'border-transparent text-[#735E4E] hover:text-[#3B291D]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Personas Registradas ({contacts.length})</span>
            {selectedContactIds.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#8C5233] text-white text-[11px] flex items-center justify-center font-bold">
                {selectedContactIds.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('compose')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'compose'
                ? 'border-[#8C5233] text-[#3B291D]'
                : 'border-transparent text-[#735E4E] hover:text-[#3B291D]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Redactar & Mandar Anuncio</span>
            {selectedContactIds.length > 0 && (
              <span className="text-[11px] text-[#52795D] font-bold">
                ({selectedContactIds.length} seleccionadas)
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-[#8C5233] text-[#3B291D]'
                : 'border-transparent text-[#735E4E] hover:text-[#3B291D]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Historial en Firebase ({announcements.length})</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: CONTACTS DIRECTORY */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              
              {/* Controls bar: Search, filters, add contact */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar por nombre, correo, teléfono, ciudad..."
                      className="w-full bg-white border border-[#D5C6B5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                    />
                    <Search className="w-4 h-4 text-[#8C7665] absolute left-3 top-2.5 pointer-events-none" />
                  </div>

                  <select
                    value={filterInterest}
                    onChange={(e) => setFilterInterest(e.target.value)}
                    className="bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619] focus:outline-none cursor-pointer"
                  >
                    <option value="todos">Todos los intereses</option>
                    <option value="Peluches">Peluches & Amigurumis</option>
                    <option value="Ramos">Ramos de Flores</option>
                    <option value="Llaveros">Llaveros</option>
                    <option value="Kits">Kits DIY</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-3.5 py-2 rounded-xl bg-[#523C2B] hover:bg-[#3D2C1F] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-[#E5A873]" />
                    <span>Agregar Contacto a Firebase</span>
                  </button>
                </div>
              </div>

              {/* Add contact inline form */}
              {showAddForm && (
                <form onSubmit={handleCreateContact} className="p-4 bg-white rounded-2xl border border-[#DFD3C3] shadow-xs space-y-3">
                  <div className="text-xs font-bold text-[#3B291D] flex items-center justify-between">
                    <span>Nuevo Registro en Firebase Firestore:</span>
                    <button 
                      type="button" 
                      onClick={() => setShowAddForm(false)}
                      className="text-[#8C7565] hover:text-[#382619]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      required
                      type="text"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      placeholder="Nombre y Apellido *"
                      className="bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-3 py-1.5 text-xs text-[#382619]"
                    />
                    <input
                      required
                      type="email"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                      placeholder="Correo Electrónico *"
                      className="bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-3 py-1.5 text-xs text-[#382619]"
                    />
                    <input
                      required
                      type="tel"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      placeholder="Teléfono / WhatsApp (+54...) *"
                      className="bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-3 py-1.5 text-xs text-[#382619]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newContactCity}
                      onChange={(e) => setNewContactCity(e.target.value)}
                      placeholder="Ciudad / Región"
                      className="bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-3 py-1.5 text-xs text-[#382619]"
                    />
                    <select
                      value={newContactInterest}
                      onChange={(e) => setNewContactInterest(e.target.value)}
                      className="bg-[#FAF7F2] border border-[#D5C6B5] rounded-lg px-3 py-1.5 text-xs text-[#382619]"
                    >
                      <option value="Peluches & Amigurumis">Peluches & Amigurumis</option>
                      <option value="Ramos de Flores Eternas">Ramos de Flores Eternas</option>
                      <option value="Llaveros & Accesorios">Llaveros & Accesorios</option>
                      <option value="Kits DIY para Tejer">Kits DIY para Tejer</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-3 py-1.5 text-xs text-[#7A6759]"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#523C2B] text-white text-xs font-semibold"
                    >
                      Guardar en Base de Datos
                    </button>
                  </div>
                </form>
              )}

              {/* Selection banner / Select all */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#EFE6DC] rounded-xl text-xs text-[#4E3D31]">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center gap-2 font-medium hover:text-[#1F1712] cursor-pointer"
                >
                  {selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-[#8C5233]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#8C7665]" />
                  )}
                  <span>
                    {selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0
                      ? 'Deseleccionar Todos'
                      : `Seleccionar Todos (${filteredContacts.length})`}
                  </span>
                </button>

                <div>
                  <span className="font-semibold text-[#8C5233]">{selectedContactIds.length}</span> seleccionados de {contacts.length} registros
                </div>
              </div>

              {/* Contacts List Cards */}
              {loadingContacts ? (
                <div className="py-12 text-center text-xs text-[#7A6759]">
                  Cargando personas registradas desde Firebase Firestore...
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7A6759] bg-white rounded-2xl border border-[#DFD3C3] p-6">
                  No se encontraron contactos que coincidan con la búsqueda.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredContacts.map((contact) => {
                    const isSelected = selectedContactIds.includes(contact.id);
                    return (
                      <div
                        key={contact.id}
                        onClick={() => toggleSelectContact(contact.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                          isSelected
                            ? 'bg-[#F2E7DC] border-[#8C5233] shadow-xs'
                            : 'bg-white border-[#E5DAC8] hover:border-[#C4B29E]'
                        }`}
                      >
                        {/* Checkbox */}
                        <div className="pt-0.5">
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-[#8C5233]" />
                          ) : (
                            <Square className="w-5 h-5 text-[#9E8B7C]" />
                          )}
                        </div>

                        {/* Contact details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-fraunces text-base font-medium text-[#2F2117] truncate">
                              {contact.name}
                            </h4>
                            {contact.customerType === 'vip' && (
                              <span className="text-[10px] bg-[#E8C2A0] text-[#4A2E19] font-bold px-2 py-0.5 rounded-full">
                                VIP
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-[#635043] space-y-0.5 mt-1">
                            <div className="flex items-center gap-1.5 truncate">
                              <Mail className="w-3.5 h-3.5 text-[#8C7665] shrink-0" />
                              <span className="truncate">{contact.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-[#8C7665] shrink-0" />
                              <span>{contact.phone}</span>
                            </div>
                            {contact.city && (
                              <div className="text-[11px] text-[#7A6759]">
                                📍 {contact.city}
                              </div>
                            )}
                            {contact.interest && (
                              <div className="text-[11px] text-[#8C5233] font-medium pt-0.5">
                                Interés: {contact.interest}
                              </div>
                            )}
                          </div>

                          {/* Quick automated contact actions */}
                          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#F0E6D8]" onClick={(e) => e.stopPropagation()}>
                            {/* Direct WhatsApp launcher */}
                            <button
                              onClick={() => handleOpenWhatsAppForContact(contact)}
                              className="px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                              title="Abre WhatsApp directamente con mensaje listo"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>Abrir WhatsApp</span>
                            </button>

                            {/* Direct Email App launcher */}
                            <button
                              onClick={() => handleOpenIndividualEmail(contact)}
                              className="px-2.5 py-1 rounded-lg bg-[#EFE6DC] hover:bg-[#E3D6C5] text-[#423124] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                              title="Abre directamente tu aplicación de correo"
                            >
                              <Mail className="w-3 h-3 text-[#8C5233]" />
                              <span>Abrir Correo</span>
                            </button>

                            <button
                              onClick={() => handleDeleteContact(contact.id, contact.name)}
                              className="p-1 rounded-lg text-[#B08D80] hover:text-[#A8382F] ml-auto transition-colors cursor-pointer"
                              title="Eliminar de Firebase"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Sticky Action Bar when contacts are selected */}
              {selectedContactIds.length > 0 && (
                <div className="p-3.5 bg-[#4A3525] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div className="text-xs">
                    <span className="font-bold text-[#E5A873]">{selectedContactIds.length} persona{selectedContactIds.length === 1 ? '' : 's'}</span> seleccionada{selectedContactIds.length === 1 ? '' : 's'} para enviar anuncio
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setActiveTab('compose')}
                      className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#E5A873] hover:bg-[#F3BC8F] text-[#332215] text-xs font-bold flex items-center justify-center gap-2 shadow cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Redactar Anuncio para {selectedContactIds.length} Personas →</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: COMPOSE & DIRECT AUTOMATED SENDING */}
          {activeTab === 'compose' && (
            <div className="space-y-5">
              
              {/* Selected Recipients Preview */}
              <div className="p-4 bg-white rounded-2xl border border-[#DFD3C3] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#3B291D]">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#8C5233]" />
                    <span>Destinatarios Seleccionados ({selectedContactIds.length}):</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('contacts')}
                    className="text-[#8C5233] hover:underline text-xs cursor-pointer"
                  >
                    Modificar selección de personas
                  </button>
                </div>

                {selectedContactIds.length === 0 ? (
                  <div className="p-3 bg-[#FAF4ED] rounded-xl text-xs text-[#7A6759] flex items-center justify-between">
                    <span>No has seleccionado a nadie aún. Marca las personas a las que deseas mandarles el anuncio en la pestaña "Personas Registradas".</span>
                    <button
                      onClick={() => setActiveTab('contacts')}
                      className="px-3 py-1 rounded-lg bg-[#523C2B] text-white text-xs font-semibold cursor-pointer shrink-0 ml-3"
                    >
                      Seleccionar Personas
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pt-1">
                    {selectedContactsList.map((c) => (
                      <span
                        key={c.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border ${
                          sentWhatsappIds.includes(c.id)
                            ? 'bg-[#E5EFE6] text-[#2D5A36] border-[#B8D8BC]'
                            : 'bg-[#EFE6DB] text-[#433123] border-[#DFD3C3]'
                        }`}
                      >
                        <span className="font-medium">{c.name}</span>
                        {sentWhatsappIds.includes(c.id) && (
                          <span className="text-[10px] text-[#2D5A36] font-bold">✓</span>
                        )}
                        <button
                          onClick={() => toggleSelectContact(c.id)}
                          className="text-[#998778] hover:text-[#A8382F] cursor-pointer"
                          title="Quitar"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Announcement Form */}
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#DFD3C3]">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#48372C] block mb-1">
                      Título o Asunto del Anuncio *
                    </label>
                    <input
                      required
                      type="text"
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      placeholder="Ej: ✨ ¡Nueva Colección de Tulipanes y 15% Descuento Especial!"
                      className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-3.5 py-2 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#48372C] block mb-1">
                      Categoría
                    </label>
                    <select
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619] cursor-pointer"
                    >
                      <option value="Promoción de Temporada">Promoción de Temporada</option>
                      <option value="Lanzamiento de Producto">Lanzamiento de Producto</option>
                      <option value="Descuento VIP Exclusivo">Descuento VIP Exclusivo</option>
                      <option value="Aviso del Taller">Aviso del Taller</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#48372C] block mb-1">
                      Cupón de Descuento Adjunto
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={annCoupon}
                        onChange={(e) => setAnnCoupon(e.target.value.toUpperCase())}
                        placeholder="Ej: HEBRAS15"
                        className="w-full uppercase font-mono bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl pl-8 pr-3 py-2 text-xs text-[#382619]"
                      />
                      <Tag className="w-3.5 h-3.5 text-[#8C7665] absolute left-3 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-center">
                    <p className="text-[11px] text-[#7A6759] bg-[#F5EDE1] p-2.5 rounded-xl border border-[#E5DAC8] leading-relaxed w-full">
                      💡 <strong>Automatización activa:</strong> La variable <code>{'{nombre}'}</code> se sustituirá con el nombre de cada persona al enviar.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#48372C] block mb-1">
                    Cuerpo del Mensaje *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={annMessage}
                    onChange={(e) => setAnnMessage(e.target.value)}
                    placeholder="Escribe el mensaje del anuncio aquí..."
                    className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl p-3 text-xs text-[#382619] focus:outline-none focus:ring-2 focus:ring-[#8C5233] resize-none"
                  />
                </div>

                {/* Direct Action Hub */}
                <div className="pt-4 border-t border-[#EDE2D3] space-y-3">
                  <div className="text-xs font-bold text-[#3B291D] uppercase tracking-wider">
                    ⚡ Lanzar Envío Directo a Aplicaciones:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* 1. Direct Default Email App */}
                    <button
                      onClick={handleDirectOpenNativeEmail}
                      disabled={selectedContactIds.length === 0}
                      className="p-3 rounded-2xl bg-[#523C2B] hover:bg-[#3E2D20] text-white text-xs font-semibold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                      title="Abre tu cliente de correo (Outlook, Apple Mail, Thunderbird, etc.) con los contactos en CCO"
                    >
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-[#E5A873]" />
                        <span>Abrir App de Correo</span>
                      </div>
                      <span className="text-[10px] text-[#D8C7B8] font-normal">
                        Abre tu cliente predeterminado (CCO)
                      </span>
                    </button>

                    {/* 2. Direct Gmail Web */}
                    <button
                      onClick={handleDirectOpenGmailWeb}
                      disabled={selectedContactIds.length === 0}
                      className="p-3 rounded-2xl bg-[#EA4335] hover:bg-[#D33828] text-white text-xs font-semibold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                      title="Abre Gmail directamente en una pestaña con los destinatarios y texto precargados"
                    >
                      <div className="flex items-center gap-1.5">
                        <ExternalLink className="w-4 h-4 text-white" />
                        <span>Abrir en Gmail Web</span>
                      </div>
                      <span className="text-[10px] text-white/80 font-normal">
                        Redactar en Google Mail directamente
                      </span>
                    </button>

                    {/* 3. Save Record in Firebase */}
                    <button
                      onClick={handleSaveAndSendAnnouncement}
                      disabled={isSending || selectedContactIds.length === 0 || !annTitle.trim()}
                      className="p-3 rounded-2xl bg-[#52795D] hover:bg-[#3E5F48] text-white text-xs font-semibold flex flex-col items-center justify-center text-center gap-1 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>{isSending ? 'Guardando...' : 'Guardar en Firebase'}</span>
                      </div>
                      <span className="text-[10px] text-white/80 font-normal">
                        Registro oficial en base de datos
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#7A6759] pt-1">
                    <button
                      onClick={handleCopyEmails}
                      disabled={selectedContactIds.length === 0}
                      className="text-[#8C5233] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedEmails ? '✓ ¡Correos Copiados!' : 'Copiar solo correos (CCO)'}</span>
                    </button>

                    {sendSuccess && (
                      <span className="text-[#32613C] font-semibold">
                        ✓ Anuncio guardado con éxito en Firebase Firestore
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Direct 1-Click WhatsApp Dispatcher Section */}
              {selectedContactIds.length > 0 && (
                <div className="p-5 bg-white rounded-2xl border border-[#DFD3C3] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-fraunces text-base font-medium text-[#2F2117] flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>Abrir WhatsApp Directamente para Cada Seleccionado</span>
                      </h4>
                      <p className="text-[11px] text-[#7A6759]">
                        Toca "Abrir WhatsApp" y se abrirá directamente la conversación con el mensaje listo para enviar:
                      </p>
                    </div>

                    {/* Next in Queue Quick Button */}
                    {nextUnsentContact && (
                      <button
                        onClick={() => handleOpenWhatsAppForContact(nextUnsentContact)}
                        className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Siguiente: Abrir para {nextUnsentContact.name}</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {selectedContactsList.map((contact) => {
                      const isSent = sentWhatsappIds.includes(contact.id);
                      return (
                        <div
                          key={contact.id}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                            isSent
                              ? 'bg-[#F2F7F2] border-[#C5DDC5]'
                              : 'bg-[#FAF7F2] border-[#E5DAC8]'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#3B291D] truncate flex items-center gap-1">
                              <span>{contact.name}</span>
                              {isSent && <span className="text-[#2D5A36] text-[10px]">✓ Abierto</span>}
                            </div>
                            <div className="text-[10px] text-[#7A6759] truncate">{contact.phone}</div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* WhatsApp Direct */}
                            <button
                              onClick={() => handleOpenWhatsAppForContact(contact)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                              title="Abrir WhatsApp directamente"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>

                            {/* Email Direct */}
                            <button
                              onClick={() => handleOpenIndividualEmail(contact)}
                              className="p-1.5 rounded-lg bg-[#EFE6DC] hover:bg-[#E3D6C5] text-[#3B291D] text-xs transition-colors cursor-pointer"
                              title="Abrir correo directamente para esta persona"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: ANNOUNCEMENTS HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-fraunces text-lg text-[#3B291D]">
                    Historial de Anuncios Guardados en Firebase
                  </h3>
                  <p className="text-xs text-[#7A6759]">
                    Registro de todos los comunicados enviados a clientes seleccionados
                  </p>
                </div>
                <button
                  onClick={loadHistory}
                  className="px-3 py-1.5 rounded-xl bg-[#EFE6DC] hover:bg-[#E3D6C5] text-[#3B291D] text-xs font-semibold cursor-pointer"
                >
                  Actualizar
                </button>
              </div>

              {loadingHistory ? (
                <div className="py-12 text-center text-xs text-[#7A6759]">
                  Cargando historial de anuncios...
                </div>
              ) : announcements.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7A6759] bg-white rounded-2xl border border-[#DFD3C3] p-6 space-y-2">
                  <p>Aún no se han registrado anuncios en Firebase.</p>
                  <button
                    onClick={() => setActiveTab('compose')}
                    className="px-4 py-2 rounded-xl bg-[#523C2B] text-white text-xs font-semibold cursor-pointer"
                  >
                    Crear Primer Anuncio
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-4 bg-white rounded-2xl border border-[#DFD3C3] space-y-2 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-[#EFE6DC] text-[#4A382C] px-2 py-0.5 rounded-full font-bold">
                              {ann.targetCategory || 'Anuncio'}
                            </span>
                            {ann.couponCode && (
                              <span className="text-[10px] bg-[#E7EFE6] text-[#32613C] px-2 py-0.5 rounded-full font-mono font-bold">
                                Cupón: {ann.couponCode}
                              </span>
                            )}
                          </div>
                          <h4 className="font-fraunces text-base font-semibold text-[#2F2117] mt-1">
                            {ann.title}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-[#8C7665] block">
                            {new Date(ann.createdAt).toLocaleDateString()} {new Date(ann.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <button
                            onClick={async () => {
                              if (window.confirm('¿Eliminar este anuncio del historial de Firebase?')) {
                                await deleteAnnouncement(ann.id);
                                setAnnouncements(announcements.filter(a => a.id !== ann.id));
                              }
                            }}
                            className="text-[11px] text-[#A8382F] hover:underline mt-1 cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#523F32] whitespace-pre-wrap bg-[#FAF7F2] p-3 rounded-xl border border-[#EDE2D3]">
                        {ann.message}
                      </p>

                      <div className="text-[11px] text-[#7A6759] flex items-center justify-between pt-1">
                        <div>
                          <strong>Destinatarios seleccionados ({ann.targetUserIds?.length || 0}):</strong>{' '}
                          {ann.targetUserNames && ann.targetUserNames.length > 0 ? ann.targetUserNames.join(', ') : 'Destinatarios registrados'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#EFE6DB] border-t border-[#DFD3C3] flex items-center justify-between text-xs text-[#7A6759]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#52795D]"></span>
            <span>Conectado a Firebase Firestore (Colecciones: contacts / announcements)</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#4A3322] hover:bg-[#342418] text-white text-xs font-semibold cursor-pointer"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
};
