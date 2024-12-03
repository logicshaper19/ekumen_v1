import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, TrendingUp } from 'lucide-react';
import { isLoggedIn } from '../utils/auth';

export default function LandingPage() {
  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Tomorrow's farming</span>
              <span className="block text-gray-600">today</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transform your agricultural practices with data-driven insights and sustainable solutions.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center rounded-md bg-black p-3 shadow-lg">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-black">Sustainable Farming</h3>
                  <p className="mt-5 text-base text-gray-600">
                    Implement eco-friendly practices while maintaining high productivity and profitability.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center rounded-md bg-black p-3 shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-black">Data-Driven Insights</h3>
                  <p className="mt-5 text-base text-gray-600">
                    Make informed decisions based on real-time analytics and historical data patterns.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center rounded-md bg-black p-3 shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-black">Future-Proof Solutions</h3>
                  <p className="mt-5 text-base text-gray-600">
                    Stay ahead with innovative agricultural technologies and adaptive farming strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}