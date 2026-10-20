import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { RegisteredContact, AnnouncementRecord } from '../types';

const CONTACTS_COLLECTION = 'contacts';
const ANNOUNCEMENTS_COLLECTION = 'announcements';

// Default initial contacts to seed if the database is initially empty
const INITIAL_DEMO_CONTACTS: Omit<RegisteredContact, 'id'>[] = [
  {
    name: 'Valeria Méndez',
    email: 'valeria.mendez@ejemplo.com',
    phone: '+52 55 1234 5678',
    city: 'Ciudad de México',
    interest: 'Peluches & Amigurumis',
    customerType: 'vip',
    registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    notes: 'Le encantan los osos y conejitos para regalos infantiles.',
    tags: ['Amigurumis', 'VIP', 'Frecuente']
  },
  {
    name: 'Carlos Andrés Benítez',
    email: 'carlos.benitez@ejemplo.com',
    phone: '+54 9 11 9876 5432',
    city: 'Buenos Aires',
    interest: 'Ramos de Flores Eternas',
    customerType: 'regular',
    registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    notes: 'Compró ramo de tulipanes en San Valentín.',
    tags: ['Flores Eternas', 'San Valentín']
  },
  {
    name: 'Camila Villalobos',
    email: 'camila.villalobos@ejemplo.com',
    phone: '+56 9 8765 4321',
    city: 'Santiago de Chile',
    interest: 'Llaveros & Accesorios',
    customerType: 'nuevo',
    registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    notes: 'Interesada en llaveros de aguacate para su tienda.',
    tags: ['Llaveros', 'Mayorista']
  },
  {
    name: 'Mateo Morales',
    email: 'mateo.morales@ejemplo.com',
    phone: '+57 310 456 7890',
    city: 'Bogotá',
    interest: 'Kits DIY para Tejer',
    customerType: 'regular',
    registeredAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    notes: 'Comenzó tejiendo amigurumis con el kit para principiantes.',
    tags: ['Kits', 'Tallerista']
  }
];

export async function fetchContacts(): Promise<RegisteredContact[]> {
  try {
    const contactsRef = collection(db, CONTACTS_COLLECTION);
    const snapshot = await getDocs(contactsRef);
    
    // If empty, seed initial contacts
    if (snapshot.empty) {
      await seedInitialContacts();
      const freshSnapshot = await getDocs(contactsRef);
      return freshSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RegisteredContact[];
    }

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as RegisteredContact[];
  } catch (error) {
    console.error('Error fetching contacts from Firestore:', error);
    // Return in-memory fallback if network issue
    return INITIAL_DEMO_CONTACTS.map((c, i) => ({ id: `demo-${i}`, ...c }));
  }
}

async function seedInitialContacts() {
  const contactsRef = collection(db, CONTACTS_COLLECTION);
  for (const contact of INITIAL_DEMO_CONTACTS) {
    await addDoc(contactsRef, contact);
  }
}

export async function saveContact(
  contactData: Omit<RegisteredContact, 'id' | 'registeredAt'>
): Promise<RegisteredContact> {
  const payload = {
    ...contactData,
    registeredAt: new Date().toISOString(),
    customerType: contactData.customerType || 'nuevo',
    tags: contactData.tags || ['Nuevo']
  };

  try {
    const contactsRef = collection(db, CONTACTS_COLLECTION);
    const docRef = await addDoc(contactsRef, payload);
    return {
      id: docRef.id,
      ...payload
    };
  } catch (error) {
    console.error('Error saving contact to Firestore:', error);
    return {
      id: `local-${Date.now()}`,
      ...payload
    };
  }
}

export async function updateContact(
  id: string, 
  updates: Partial<RegisteredContact>
): Promise<void> {
  try {
    const contactDoc = doc(db, CONTACTS_COLLECTION, id);
    await updateDoc(contactDoc, updates);
  } catch (error) {
    console.error('Error updating contact in Firestore:', error);
  }
}

export async function deleteContact(id: string): Promise<void> {
  try {
    const contactDoc = doc(db, CONTACTS_COLLECTION, id);
    await deleteDoc(contactDoc);
  } catch (error) {
    console.error('Error deleting contact from Firestore:', error);
  }
}

export async function fetchAnnouncements(): Promise<AnnouncementRecord[]> {
  try {
    const annRef = collection(db, ANNOUNCEMENTS_COLLECTION);
    const q = query(annRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AnnouncementRecord[];
  } catch (error) {
    // If index isn't ready or ordering fails, try without order
    try {
      const annRef = collection(db, ANNOUNCEMENTS_COLLECTION);
      const snapshot = await getDocs(annRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AnnouncementRecord[];
    } catch (e) {
      console.error('Error fetching announcements:', e);
      return [];
    }
  }
}

export async function createAnnouncement(
  announcementData: Omit<AnnouncementRecord, 'id' | 'createdAt'>
): Promise<AnnouncementRecord> {
  const payload = {
    ...announcementData,
    createdAt: new Date().toISOString()
  };

  try {
    const annRef = collection(db, ANNOUNCEMENTS_COLLECTION);
    const docRef = await addDoc(annRef, payload);
    return {
      id: docRef.id,
      ...payload
    };
  } catch (error) {
    console.error('Error saving announcement to Firestore:', error);
    return {
      id: `ann-${Date.now()}`,
      ...payload
    };
  }
}

export async function deleteAnnouncement(id: string): Promise<void> {
  try {
    const annDoc = doc(db, ANNOUNCEMENTS_COLLECTION, id);
    await deleteDoc(annDoc);
  } catch (error) {
    console.error('Error deleting announcement:', error);
  }
}
