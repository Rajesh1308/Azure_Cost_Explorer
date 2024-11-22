"use client"
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-3xl mx-auto">
        {/* Logo and Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Azure Cost Explorer
          </h1>
          <p className="text-xl md:text-2xl text-blue-600 mb-6">
            Explore and analyze Azure service pricing with ease
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Service Filtering
            </h3>
            <p className="text-gray-600">
              Filter services by family, location, and pricing options
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Savings Plans
            </h3>
            <p className="text-gray-600">
              Compare prices with available savings plan options
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Price Analysis
            </h3>
            <p className="text-gray-600">
              Analyze pricing across different regions and service tiers
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          href="/Home"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Launch Explorer
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600">
        <p>Powered by Azure Pricing API</p>
      </footer>
    </div>
  );
}