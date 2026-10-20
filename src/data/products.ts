import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Oso Teddy Vintage con Suéter Canela',
    category: 'peluches',
    price: 34.00,
    originalPrice: 39.00,
    rating: 4.9,
    reviewsCount: 38,
    shortDescription: 'Tierno osito amigurumi tejido en hilo de algodón hipoalergénico con suéter y bufanda removibles.',
    description: 'El clásico y entrañable Osito Teddy tejido a mano con la técnica japonesa amigurumi. Cada detalle está confeccionado punto por punto con hilo 100% algodón peinado de textura aterciopelada. Cuenta con ojos de seguridad sellados a presión por calor y relleno de vellón siliconado antipolvo. Su suéter en tono terracota canela se puede retirar.',
    materials: ['100% Hilo de algodón mercerizado premium', 'Relleno hipoalergénico siliconado', 'Ojos de seguridad con traba interna'],
    timeToMake: 'Listo en stock (envío 24-48h)',
    dimensions: '24 cm de alto x 15 cm de ancho',
    inStock: true,
    stockCount: 5,
    images: [
      'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545997281-2cfe4d7a7018?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Amigurumi', 'Regalo Especial', 'Bebés y Niños'],
    colors: [
      { name: 'Ocre & Canela', hex: '#C27B42' },
      { name: 'Crudo & Rosa Palo', hex: '#D7A799' },
      { name: 'Marrón Chocolate', hex: '#5D3B28' }
    ],
    sizes: [
      { label: 'Mediano (24 cm)', extraPrice: 0 },
      { label: 'Grande XL (34 cm)', extraPrice: 16 }
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'prod-2',
    name: 'Ramo Ensueño: Tulipanes & Margaritas Eternas',
    category: 'ramos',
    price: 42.50,
    originalPrice: 48.00,
    rating: 5.0,
    reviewsCount: 64,
    shortDescription: 'Ramo de 7 flores tejidas a mano con pétalos de tacto suave, follaje de eucalipto y envoltorio coreano.',
    description: 'Un ramo de flores que nunca se marchita y atesora momentos inolvidables. Incluye 4 tulipanes en degradé pastel, 2 margaritas silvestres con centro de polen aterciopelado y ramas de eucalipto con tallos moldeables. Presentado con papel mate envoltura estilo floral coreano, cinta de satén y tarjetita de dedicatoria.',
    materials: ['Algodón peinado mercerizado', 'Varilla de floristería maleable anti-óxido', 'Papel floral impermeable importado'],
    timeToMake: '3 a 4 días de elaboración',
    dimensions: '38 cm de alto x 22 cm de diámetro',
    inStock: true,
    stockCount: 8,
    images: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Flores Eternas', 'Aniversario', 'San Valentín'],
    colors: [
      { name: 'Rosa Pastel & Lila', hex: '#D8A3BA' },
      { name: 'Amarillo Sol & Blanco', hex: '#F0D479' },
      { name: 'Rojo Pasión & Crema', hex: '#A83232' }
    ],
    sizes: [
      { label: 'Ramo 7 Flores', extraPrice: 0 },
      { label: 'Ramo Deluxe 12 Flores', extraPrice: 22 }
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'prod-3',
    name: 'Capibara Zen con Mochilita de Mandarina',
    category: 'peluches',
    price: 29.00,
    rating: 4.9,
    reviewsCount: 52,
    shortDescription: 'El consentido de las redes: capibara con su mini mandarina en la cabeza y mochilita verde para guardar notas.',
    description: 'Nuestra versión del animal más relajado del mundo. Este capibara tejido a crochet incluye una pequeña mandarina bordada que descansa sobre su cabeza y una mini mochila extraíble con botón real donde puedes colocar una cartita o un billete para regalo. Suave, esponjoso e irresistible.',
    materials: ['Hilado de algodón rústico suave', 'Fibra hueca siliconada premium', 'Detalles bordados a mano'],
    timeToMake: 'Listo en stock',
    dimensions: '18 cm de alto x 13 cm de largo',
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584441405886-bc91be61e56a?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Tendencia', 'Kawaii', 'Coleccionable'],
    colors: [
      { name: 'Tono Capibara Clásico', hex: '#8B5A2B' },
      { name: 'Caramelo Claro', hex: '#B87D4B' }
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'prod-4',
    name: 'Dúo de Llaveros Aguacate "Media Naranja"',
    category: 'llaveros',
    price: 15.00,
    originalPrice: 18.00,
    rating: 4.8,
    reviewsCount: 45,
    shortDescription: 'Set de dos llaveros con imán interno oculto que se juntan al acercarse. Perfecto para parejas o mejores amigos.',
    description: 'Un detalle con un significado muy especial. Un aguacate tiene el huesito saliente y el otro tiene la cavidad a la medida, ambos con un mini imán de neodimio invisible que hace que se atraigan al estar cerca. Vienen con argolla reforzada antioxidante y mosquetón para llaves o bolsos.',
    materials: ['Algodón fino mercerizado', 'Imán de neodimio seguro', 'Herrajes dorados galvanizados'],
    timeToMake: 'Listo para envío inmediato',
    dimensions: '7 cm de alto cada uno',
    inStock: true,
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Amor', 'Parejas', 'Amistad'],
    colors: [
      { name: 'Verde Palta Natural', hex: '#6B8E23' }
    ],
    isFeatured: false,
    isBestseller: true
  },
  {
    id: 'prod-5',
    name: 'Girasol Radiante Gigante con Luces Hada',
    category: 'ramos',
    price: 26.50,
    rating: 5.0,
    reviewsCount: 31,
    shortDescription: 'Flor individual de girasol con centro en relieve texturizado, hojas realistas y micro guirnalda LED incluida.',
    description: 'Simboliza luz, optimismo y alegría duradera. Este girasol artesanal tejido a mano posee 24 pétalos individuales con nervadura y un centro bordado en punto mota que simula las semillas naturales. Incluye una sutil guirnalda de luces led cálidas con interruptor oculto para iluminar cualquier rincón.',
    materials: ['Hilo de algodón cálido amarillo cadmio', 'Alambre forrado modelable', 'Micro luces led a pila de botón'],
    timeToMake: 'Listo en stock',
    dimensions: '35 cm de largo x 16 cm de flor',
    inStock: true,
    stockCount: 7,
    images: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Luz & Energía', 'Flores Eternas', 'Graduación'],
    colors: [
      { name: 'Amarillo Mostaza Intenso', hex: '#EAA221' },
      { name: 'Amarillo Pastel', hex: '#FBE870' }
    ],
    isFeatured: true,
    isBestseller: false
  },
  {
    id: 'prod-6',
    name: 'Llavero Colgante Fresita Silvestre con Flor',
    category: 'llaveros',
    price: 9.50,
    rating: 4.9,
    reviewsCount: 28,
    shortDescription: 'Fresita roja tejida punto por punto con semillas bordadas, hojitas verdes y una campanita diminuta.',
    description: 'Un accesorio dulce y coqueto para colgar en mochilas, bolsos de mano o llaves del coche. Incluye un cascabel silencioso en tono oro rosa y aro reforzado. Lavable y no pierde su forma.',
    materials: ['Hilo de algodón perlé', 'Aro metálico premium', 'Cascabel decorativo'],
    timeToMake: 'Listo en stock',
    dimensions: '6 cm de largo x 4 cm de ancho',
    inStock: true,
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Accesorios', 'Detalle Económico', 'Cute'],
    colors: [
      { name: 'Rojo Frutilla', hex: '#D62828' },
      { name: 'Rosa Chicle', hex: '#F72585' }
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'prod-7',
    name: 'Conejita Luna con Vestido Floral y Diadema',
    category: 'peluches',
    price: 36.00,
    rating: 5.0,
    reviewsCount: 22,
    shortDescription: 'Conejita de orejas largas y caídas con vestido tejido en punto calado y zapatitos a juego.',
    description: 'Luna es una conejita soñadora creada con los más finos hilos de bambú y algodón. Su vestido desmontable tiene un cuello con ondas y un pequeño lazo en la espalda. Suave al tacto y segura para los más pequeños del hogar.',
    materials: ['Mezcla 70% Bambú 30% Algodón', 'Relleno hipoalergénico', 'Ojos de bordado a mano'],
    timeToMake: '2 a 3 días de tejido',
    dimensions: '28 cm de alto (con orejitas)',
    inStock: true,
    stockCount: 4,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Bebés', 'Baby Shower', 'Decoración Infantil'],
    colors: [
      { name: 'Blanco Nieve & Rosa', hex: '#F9EAE1' },
      { name: 'Gris Perla & Lavanda', hex: '#CBC8DC' }
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'prod-8',
    name: 'Colgante Retrovisor de Auto: Macetita Suculenta',
    category: 'llaveros',
    price: 13.50,
    rating: 4.9,
    reviewsCount: 41,
    shortDescription: 'Mini planta colgante con hojas en cascada que se mece suavemente con el movimiento del automóvil.',
    description: 'Dale un toque de naturaleza y calidez a tu coche. Esta pequeña macetita de terracota tejida contiene enredaderas con pequeñas hojitas que cuelgan con gracia. Su cordón regulable permite ajustarla a cualquier retrovisor sin obstruir la vista.',
    materials: ['Algodón resistente al sol y decoloración', 'Cordón de yute regulable', 'Mini maceta acolchada'],
    timeToMake: 'Listo en stock',
    dimensions: '20 cm de largo total ajustable',
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Para Auto', 'Regalo Unisex', 'Naturaleza'],
    colors: [
      { name: 'Eucalipto & Canela', hex: '#5E7153' },
      { name: 'Verde Salvia & Crudo', hex: '#87977A' }
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'prod-9',
    name: 'Manta Chunky Knit "Abrazo de Nube"',
    category: 'hogar',
    price: 68.00,
    originalPrice: 79.00,
    rating: 4.9,
    reviewsCount: 19,
    shortDescription: 'Manta gruesa tejida a mano con lana XXL extra suave sin agujas. Acolchada, decorativa y calentita.',
    description: 'El complemento definitivo para tu sala o recámara. Tejida a mano con la técnica arm-knitting utilizando fibras gruesas tubulares que no desprenden pelusa ni producen bolitas. Ideal para tardes de lectura y descanso.',
    materials: ['Chenille tubular anti-pilling hipoalergénico', 'Lavable a máquina en ciclo suave'],
    timeToMake: 'Listo en stock',
    dimensions: '130 cm x 100 cm',
    inStock: true,
    stockCount: 3,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Decoración Hogar', 'Otoño/Invierno', 'Comodidad'],
    colors: [
      { name: 'Blanco Hueso', hex: '#EDE8DF' },
      { name: 'Gris Niebla', hex: '#A8A7A5' },
      { name: 'Rosa Empolvado', hex: '#D6B4AF' }
    ],
    sizes: [
      { label: 'Individual (100x130 cm)', extraPrice: 0 },
      { label: 'Cama Queen (150x180 cm)', extraPrice: 35 }
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'prod-10',
    name: 'Set x4 Posavasos Florales Margarita con Cesta',
    category: 'hogar',
    price: 18.00,
    rating: 4.8,
    reviewsCount: 27,
    shortDescription: 'Cuatro posavasos de margarita tejida en punto tupido absorbente con su estuche contenedor en forma de maceta.',
    description: 'Transforma tu mesa de centro o escritorio. Cuando no los uses, los cuatro posavasos se pliegan y se guardan dentro de su macetita tejida formando un bonito adorno de flor. 100% lavables.',
    materials: ['Algodón absorbente 6 hebras', 'Punto compacto aislante de calor'],
    timeToMake: 'Listo en stock',
    dimensions: '12 cm de diámetro cada posavaso',
    inStock: true,
    stockCount: 9,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Mesa Bonita', 'Regalo Amiga', 'Cocina'],
    colors: [
      { name: 'Margarita Blanca & Amarillo', hex: '#FAF9F6' },
      { name: 'Pastel Mixto', hex: '#F0C987' }
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'prod-11',
    name: 'Kit DIY: Aprende a Tejer tu Primer Amigurumi',
    category: 'kits',
    price: 24.50,
    originalPrice: 28.00,
    rating: 5.0,
    reviewsCount: 47,
    shortDescription: 'Caja con todo incluido para principiantes: ovillos, aguja ergonómica, ojos de seguridad y videotutorial guiado paso a paso.',
    description: '¿Siempre quisiste aprender a tejer crochet? Este kit está diseñado especialmente para personas que nunca antes han tomado una aguja. Incluye lana de grosor intermedio que no se deshilacha, ganchillo con mango ergonómico de silicona, marcadores de puntos, aguja lanera y acceso ilimitado a nuestro videotutorial en español donde te explicamos vuelta por vuelta.',
    materials: ['3 Ovillos de algodón especial principiante', 'Ganchillo ergonómico 3.5mm', 'Marcadores, aguja capotera y patrón impreso'],
    timeToMake: 'Listo para envío inmediato',
    dimensions: 'Caja Kraft 22 x 15 x 8 cm',
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Aprende Crochet', 'Manualidades', 'Kit Completo'],
    colors: [
      { name: 'Modelo: Pingüinito Azul', hex: '#4A7C9B' },
      { name: 'Modelo: Pollito Amarillo', hex: '#EFC94C' },
      { name: 'Modelo: Dinosaurio Verde', hex: '#588157' }
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'prod-12',
    name: 'Ramo Botánico "Lirios del Valle & Lavanda"',
    category: 'ramos',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 33,
    shortDescription: 'Elegante ramillete silvestre con campanitas blancas sonrientes, espigas de lavanda y cinta rústica de yute.',
    description: 'Inspirado en los jardines ingleses de primavera. Las campanitas de lirio del valle cuelgan con delicadeza sobre tallos esmeralda, acompañadas de aromáticas espigas de lavanda tejida con pequeñas perlitas de madera. Empacado con papel kraft y ramillete de flor de tela preservada.',
    materials: ['Algodón fino mercerizado', 'Estructura flexible para jarrón', 'Aroma sutil lavanda incluido'],
    timeToMake: '2 a 3 días',
    dimensions: '34 cm de largo',
    inStock: true,
    stockCount: 6,
    images: [
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Aroma', 'Romántico', 'Flores Eternas'],
    colors: [
      { name: 'Blanco & Lavanda Lila', hex: '#9B72AA' }
    ],
    isFeatured: false,
    isBestseller: false
  }
];
