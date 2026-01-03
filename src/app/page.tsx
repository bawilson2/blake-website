export const revalidate = 60;

import Link from "next/link";
import { client, urlFor } from "@/sanity/client";

export default async function Home() {
  // This is a GROQ query: "Find all products with a slug"
  const products = await client.fetch(`*[_type == "product" && defined(slug.current)]`);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <Link key={product._id} href={`/product/${product.slug.current}`} className="group border rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              {product.image && (
                <img 
                  src={urlFor(product.image).width(500).url()} 
                  alt={product.name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}