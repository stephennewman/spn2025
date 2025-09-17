import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plaza Directory',
  description: 'Find businesses, hours, promotions, and events at your local plaza',
  keywords: 'plaza, directory, businesses, hours, promotions, events',
  authors: [{ name: 'Plaza Directory' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">
                      The Village at Lake St. George
                    </h1>
                  </div>
                </div>
                <nav className="flex space-x-1">
                  <a 
                    href="/" 
                    className="px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors"
                  >
                    Directory
                  </a>
                  <a 
                    href="/api/health" 
                    className="px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors"
                  >
                    Status
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">V</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">The Village at Lake St. George</h3>
                </div>
                <p className="text-gray-600 mb-4">3430 Tampa Road, Palm Harbor, FL 34684</p>
                <p className="text-gray-500 text-sm">
                  © 2025 The Village at Lake St. George Directory. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
