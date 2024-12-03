import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Plus } from 'lucide-react';

export default function NewsDetail() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
              <span>AgTech Review</span>
              <span>•</span>
              <span>Mar 18, 2024</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Smart Irrigation System: Field Trials Show 30% Water Reduction Potential
            </h1>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Add to Transformation
            </button>
          </div>
        </div>

        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What It Means</h3>
          <p>
            The Smart Irrigation System is a revolutionary technology designed to optimize water usage in agriculture through advanced sensors, data analytics, and automated irrigation mechanisms. Recent field trials have demonstrated its potential to reduce water consumption by up to 30% without compromising crop yields. This breakthrough aligns with global efforts to address water scarcity, improve agricultural efficiency, and promote sustainable farming practices.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">How It Affects You</h3>
          <p>
            For farmers, this innovation offers significant cost savings by reducing water usage and associated energy expenses. It also provides a competitive advantage, as adopting sustainable practices can enhance eligibility for subsidies and certifications tied to environmental compliance. Beyond economic benefits, the technology contributes to long-term resource conservation, helping to future-proof farms against water shortages and erratic climate conditions.
          </p>
          <p>
            For stakeholders such as agronomists, cooperatives, and policymakers, the system supports better decision-making by providing real-time data on soil moisture, weather conditions, and irrigation efficiency.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What You Can Do</h3>
          
          <div className="ml-6">
            <p className="font-medium text-gray-900 mb-2">1. Assess Your Farm's Needs</p>
          <p>
            Identify areas where water usage is high. Use simple soil moisture tests or consult with an agronomist to determine where smart irrigation could have the most impact.
          </p>

            <p className="font-medium text-gray-900 mt-4 mb-2">2. Research the Technology</p>
          <p>
            Explore available Smart Irrigation System options, focusing on those compatible with your farm's size, crop type, and existing infrastructure. Look for trials or demonstrations in your region to see the system in action.
          </p>

            <p className="font-medium text-gray-900 mt-4 mb-2">3. Start Small</p>
          <p>
            Pilot the technology on a specific section of your farm to measure its performance and ease of use. Monitor water savings, crop health, and operational efficiency during the trial.
          </p>

            <p className="font-medium text-gray-900 mt-4 mb-2">4. Seek Financial Support</p>
          <p>
            Check for government subsidies, cooperative programs, or grants that support sustainable agriculture practices. Partner with your local agricultural office or cooperative for assistance in accessing funds.
          </p>

            <p className="font-medium text-gray-900 mt-4 mb-2">5. Train Your Team</p>
          <p>
            Ensure you and your staff are trained to operate and maintain the system. Many providers offer workshops or user manuals tailored to farmers.
          </p>

            <p className="font-medium text-gray-900 mt-4 mb-2">6. Monitor and Adapt</p>
          <p>
            Use the system's data insights to refine your irrigation schedules and further optimize water use. Share your results with your cooperative or community to advocate for broader adoption.
          </p>

            <p className="font-medium text-gray-900 mt-4 mb-2">7. Plan for Scale</p>
          <p>
            After a successful trial, expand the system to other parts of your farm, focusing on areas with the highest water consumption. Continue tracking performance to measure ROI and water savings.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}