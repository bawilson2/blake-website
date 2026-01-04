// src/app/product/[slug]/page.tsx
import { client, urlFor } from "@/sanity/client";
import { notFound } from "next/navigation";
import { createCheckoutSession } from "@/app/actions/stripe";
import ImageGallery from "@/components/image-gallery";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  );

  if (!product) notFound();

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
      {/* Left Side: Image Gallery */}
      <ImageGallery images={product.images} />

      {/* Product Details Section - Glassmorphism Card */}
      <div className="flex flex-col gap-6 p-8 rounded-3xl bg-white/5 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/10 dark:border-white/10 shadow-xl">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {product.name}
          </h1>
          <p className="text-3xl text-blue-600 dark:text-blue-400 font-bold">
            ${product.price}
          </p>
        </div>
        
        <div className="prose dark:prose-invert text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
          {product.description}
        </div>

        <form action={createCheckoutSession} className="mt-4">
          <input type="hidden" name="name" value={product.name} />
          <input type="hidden" name="price" value={product.price} />

          {product.allowCustomization && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                Custom Text or Details
              </label>
              <input 
                name="customText" 
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" 
                placeholder="Engraving details..."
              />
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl mt-8 font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            Buy Now
          </button>
        </form>
      </div>
    </main>
  );
}