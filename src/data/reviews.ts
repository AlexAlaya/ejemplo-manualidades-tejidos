import { ReviewItem } from '../types';

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Mariana Valenzuela',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hace 4 días',
    comment: '¡Pedí el ramo de tulipanes para el aniversario de mis papás y quedaron fascinados! El empaque es una obra de arte y las flores se ven aún más hermosas en persona que en fotos. Muy recomendado.',
    productName: 'Ramo Ensueño: Tulipanes & Margaritas Eternas',
    verified: true,
    city: 'Guadalajara, MX',
    photoUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rev-2',
    author: 'Sebastián Morales',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'El capibara con su mandarina en la cabeza superó todas mis expectativas. La mochilita abre de verdad y le guardé una dedicatoria a mi novia. La textura es ultra suave, 10/10.',
    productName: 'Capibara Zen con Mochilita de Mandarina',
    verified: true,
    city: 'Santiago, CL',
    photoUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rev-3',
    author: 'Camila Rossi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hace 2 semanas',
    comment: 'Compré los llaveros de aguacate para compartir con mi mejor amiga. El imán se conecta perfecto y el material no se deshilacha ni se desgasta en la mochila. Atención de 10 por WhatsApp.',
    productName: 'Dúo de Llaveros Aguacate "Media Naranja"',
    verified: true,
    city: 'Buenos Aires, AR'
  },
  {
    id: 'rev-4',
    author: 'Lucía Fernández',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hace 3 semanas',
    comment: 'Comencé con el kit DIY sin saber nada de tejer y en un fin de semana terminé el pingüino. El video explicativo es súper paciente y clarísimo. Ya quiero encargar el siguiente.',
    productName: 'Kit DIY: Aprende a Tejer tu Primer Amigurumi',
    verified: true,
    city: 'Medellín, CO',
    photoUrl: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=400&q=80'
  }
];
