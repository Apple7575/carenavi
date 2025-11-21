import * as React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <span className="text-3xl font-semibold text-gray-900">CareNavi</span>
          </div>
        </div>

        {/* Auth content */}
        {children}
      </div>
    </div>
  );
}
