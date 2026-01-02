// src/app/success/page.tsx
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="bg-green-100 text-green-700 p-4 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Thank you for your order. Your custom creation is being prepared. 
        We will reach out via email if we have any questions about your customization.
      </p>
      <Link href="/" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
        Return to Shop
      </Link>
    </main>
  );
}