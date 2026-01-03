export const revalidate = 60;

import Link from "next/link";
import { client, urlFor } from "@/sanity/client";

export default async function Home() {
  const products = await client.fetch(`*[_type == "product" && defined(slug.current)]`);

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8">
      {/* 1. REFINED HERO SECTION */}
      <section className="relative overflow-hidden py-24 px-6 text-center rounded-3xl mb-16 border border-slate-200/10 dark:border-white/10 bg-white/5 dark:bg-slate-900/40 backdrop-blur-md shadow-2xl">
        {/* Decorative Spotlight behind Hero text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Precision Crafted, <span className="text-blue-600 dark:text-blue-400">Uniquely Yours.</span>
        </h1>
        <p className="relative z-10 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Custom laser-engraved creations and 3D prints made right here in the Pacific Northwest.
        </p>
      </section>

      {/* 2. MATCHING PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {products.map((product: any) => (
          <Link 
            key={product._id} 
            href={`/product/${product.slug.current}`} 
            className="group relative flex flex-col bg-white/5 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 ease-out"
          >
            {/* Image Container - Transparent to show blueprint grid */}
            <div className="aspect-[4/5] relative overflow-hidden bg-transparent p-4">
              {product.image && (
                <img 
                  src={urlFor(product.image).width(600).url()} 
                  alt={product.name} 
                  /* Changed to object-contain so projects like the Skylark aren't cropped */
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              )}
              
              {/* Customizable Badge - Updated for Dark Mode Readability */}
              {product.allowCustomization && (
                <span className="absolute top-6 left-6 
                                bg-white/90 text-slate-900 
                                dark:bg-slate-900/80 dark:text-blue-400 dark:border dark:border-blue-500/30
                                backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg shadow-sm z-20">
                  Customizable
                </span>
              )}
            </div>

            {/* Product Info Section - Integrated with the card */}
            <div className="p-8 pt-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {product.name}
              </h2>
              <div className="flex justify-between items-end mt-4">
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">${product.price}</p>
                <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}