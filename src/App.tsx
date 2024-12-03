import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ParcelManagement from './components/planning/ParcelManagement';
import CropManagement from './components/planning/CropManagement';
import RegulatoryDetail from './components/planning/RegulatoryDetail';
import TaskDetail from './components/planning/TaskDetail';
import TaskForm from './components/planning/TaskForm';
import InboxDashboard from './components/inbox/InboxDashboard';
import BusinessPlan from './components/business-plan/BusinessPlan';
import PlanningDashboard from './components/planning/PlanningDashboard';
import ExecutionDashboard from './components/execution/ExecutionDashboard';
import TransformationDashboard from './components/transformation/TransformationDashboard';
import LandingPage from './pages/LandingPage';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import ParcelSelectionStep from './components/auth/ParcelSelectionStep';
import NewsDetail from './components/news/NewsDetail';
import BankDashboard from './pages/bank/BankDashboard';
import InsuranceDashboard from './pages/insurance/InsuranceDashboard';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signup/parcels" element={<ParcelSelectionStep />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/inbox" element={<InboxDashboard />} />
          <Route path="/business-plan" element={<BusinessPlan />} />
          <Route path="/planning" element={<PlanningDashboard />} />
          <Route path="/planning/parcels/:id" element={<ParcelManagement />} />
          <Route path="/planning/crops/:id" element={<CropManagement />} />
          <Route path="/planning/tasks/new" element={<TaskForm />} />
          <Route path="/planning/tasks/:id" element={<TaskDetail />} />
          <Route path="/planning/regulatory/:id" element={<RegulatoryDetail />} />
          <Route path="/execution/data" element={<ExecutionDashboard />} />
          <Route path="/transformation" element={<TransformationDashboard />} />
          <Route path="/bank/dashboard" element={<BankDashboard />} />
          <Route path="/insurance/dashboard" element={<InsuranceDashboard />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}