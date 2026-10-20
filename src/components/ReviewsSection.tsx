import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { ReviewItem } from '../types';
import { INITIAL_REVIEWS } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('Ramo Ensueño: Tulipanes');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: newRating,
      date: 'Reciente',
      comment: newComment.trim(),
      productName: newProduct,
      verified: true,
      city: newCity.trim() || 'Comprador Verificado',
    };

    setReviews([newRev, ...reviews]);
    setShowReviewForm(false);
    setNewAuthor('');
    setNewCity('');
    setNewComment('');
  };

  return (
    <section className="py-16 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8A6F5B] font-semibold">
              Opiniones de Quienes Ya Tienen Su Hebra
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-[#2F2117] font-normal mt-1">
              Testimonios de Nuestra Comunidad
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#5C4533]">
              <div className="flex text-[#D99A46]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold">4.9 / 5</span>
              <span className="text-[#8C7565]">· Promedio general</span>
            </div>

            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 rounded-xl bg-[#523C2B] hover:bg-[#3D2C1F] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#E6B894]" />
              <span>Dejar mi Reseña</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#F6EFE5] rounded-2xl p-5 border border-[#E8DEC8] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#DFD0BF]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#342419] leading-tight">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-[#7A6759] flex items-center gap-1">
                      <span>{rev.city}</span>
                      {rev.verified && (
                        <span className="text-[#4E7D59] font-medium flex items-center gap-0.5">
                          · <CheckCircle className="w-2.5 h-2.5" /> Verificado
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex text-[#D99A46] mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Product Mention */}
                <div className="text-[11px] text-[#8C5A38] font-medium mb-2">
                  Sobre: {rev.productName}
                </div>

                {/* Comment */}
                <p className="text-xs text-[#544337] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Photo attached if available */}
              {rev.photoUrl && (
                <div className="mt-4 pt-3 border-t border-[#EADECE]">
                  <img
                    src={rev.photoUrl}
                    alt="Foto del cliente"
                    className="w-full h-24 object-cover rounded-xl border border-[#DFD0BF]"
                  />
                </div>
              )}

              <div className="mt-3 text-[10px] text-[#9E8B7C] text-right">
                {rev.date}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-md bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowReviewForm(false)}
              className="absolute top-4 right-4 text-[#7A6759] hover:text-[#332317] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-fraunces text-xl text-[#36261B] font-medium mb-1">
              Comparte tu Experiencia
            </h3>
            <p className="text-xs text-[#7A6759] mb-4">
              Tu opinión ayuda a que más personas descubran la magia del tejido hecho a mano.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#48372C] block mb-1">
                  Tu Nombre *
                </label>
                <input
                  required
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Ej: Laura Gómez"
                  className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#48372C] block mb-1">
                    Ciudad / País
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Ej: Lima, PE"
                    className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#48372C] block mb-1">
                    Calificación
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Estrellas)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Estrellas)</option>
                    <option value={3}>⭐⭐⭐ (3 Estrellas)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#48372C] block mb-1">
                  Producto que recibiste
                </label>
                <select
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="w-full bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs text-[#382619]"
                >
                  <option value="Ramo Ensueño: Tulipanes">Ramo Ensueño: Tulipanes</option>
                  <option value="Oso Teddy Vintage">Oso Teddy Vintage</option>
                  <option value="Capibara Zen">Capibara Zen</option>
                  <option value="Dúo de Llaveros Aguacate">Dúo de Llaveros Aguacate</option>
                  <option value="Manta Chunky Knit">Manta Chunky Knit</option>
                  <option value="Kit DIY Amigurumi">Kit DIY Amigurumi</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#48372C] block mb-1">
                  Tu Reseña *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="¿Qué tal te pareció el empaque, la suavidad del hilo o la atención?"
                  className="w-full bg-white border border-[#D5C6B5] rounded-xl p-3 text-xs text-[#382619] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 text-xs text-[#7A6759] hover:text-[#36261B] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#523C2B] hover:bg-[#3D2C1F] text-white text-xs font-semibold shadow cursor-pointer"
                >
                  Publicar Reseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
