export type ProductCategory = 'todos' | 'peluches' | 'ramos' | 'llaveros' | 'hogar' | 'kits';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  label: string;
  extraPrice: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'peluches' | 'ramos' | 'llaveros' | 'hogar' | 'kits';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  materials: string[];
  timeToMake: string;
  dimensions: string;
  inStock: boolean;
  stockCount: number;
  images: string[];
  tags: string[];
  colors: ProductColor[];
  sizes?: ProductSize[];
  isFeatured?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customNote?: string;
  giftWrapping?: boolean;
  woodTagText?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
  city: string;
  photoUrl?: string;
}

export interface CustomOrderRequest {
  itemType: 'ramo' | 'peluche' | 'llavero';
  title: string;
  colorPalette: string;
  customDetails: string;
  woodenTagText: string;
  dedicationCard: string;
  boxWrap: 'kraft' | 'korean' | 'sencillo';
  budgetEstimate: number;
}

export interface RegisteredContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  interest?: string;
  customerType?: 'vip' | 'regular' | 'nuevo';
  registeredAt: string;
  notes?: string;
  tags?: string[];
}

export interface AnnouncementRecord {
  id: string;
  title: string;
  message: string;
  targetUserIds: string[];
  targetUserNames?: string[];
  targetCategory?: string;
  couponCode?: string;
  createdAt: string;
  author: string;
  sentChannels?: string[];
}

