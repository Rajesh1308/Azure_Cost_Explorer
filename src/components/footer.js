export default function Footer() {
  return (
    <footer className="bg-white border-t border-blue-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Azure Cost Explorer. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-blue-700">Powered by:</span>
              <span className="ml-2">Azure Pricing API</span>
            </div>
            
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-blue-700">Version:</span>
              <span className="ml-2">1.0.0</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>
            Prices and availability are subject to change. Please refer to the official Azure pricing page for the most current information.
          </p>
        </div>
      </div>
    </footer>
  );
}
