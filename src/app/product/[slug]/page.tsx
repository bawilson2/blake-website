// src/app/product/[slug]/page.tsx
import { client, urlFor } from "@/sanity/client";
import { notFound } from "next/navigation";
import { createCheckoutSession } from "@/app/actions/stripe";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // In Next.js 15, params is a promise

  // GROQ query to find the specific product by its slug
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  );

  if (!product) notFound();

  return (
    <main className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        {product.image && (
          <img 
            src={urlFor(product.image).width(800).url()} 
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-2xl text-blue-600 font-semibold">${product.price}</p>
        
        <div className="prose text-gray-700 whitespace-pre-line">
          {product.description}
        </div>

        <form action={createCheckoutSession}>
            {/* Hidden inputs to pass data to the server action */}
            <input type="hidden" name="name" value={product.name} />
            <input type="hidden" name="price" value={product.price} />

            {product.allowCustomization && (
                <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Custom Text or Details:</label>
                <input 
                    name="customText" 
                    className="w-full border p-2 rounded" 
                    placeholder="Engraving details..."
                />
                </div>
            )}

            <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg mt-6 font-bold">
                Buy Now
            </button>
            </form>
      </div>
    </main>
  );
}