"use client"

import { useState } from "react"
import { urlFor } from "@/sanity/client"

export default function ImageGallery({ images }: { images: any[] }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-transparent flex items-center justify-center border border-slate-200/10 dark:border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none" />
        <img 
          src={urlFor(mainImage).width(1000).url()} 
          alt="Product view"
          className="relative z-10 w-full h-full object-contain p-4 transition-all duration-500"
        />
      </div>

      {/* Thumbnail Row */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              mainImage === image ? 'border-blue-600' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <img 
              src={urlFor(image).width(200).url()} 
              alt={`Thumbnail ${index}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}