import { Layout, Compass, Lightbulb, Target, Database, Mail, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';
import { useTranslation } from '../contexts/LanguageContext';

const authRoutes = ['/login', '/signup'];

type NavItem = {
  path: string;
  icon: React.ComponentType;
  key: keyof typeof import('../translations/fr').translations.navigation;
};

const navItems: NavItem[] = [
  { path: "/", icon: Layout, key: "dashboard" },
  { path: "/inbox", icon: Mail, key: "inbox" },
  { path: "/planning", icon: Compass, key: "workBench" },
  { path: "/business-plan", icon: Target, key: "businessPlan" },
  { path: "/transformation", icon: Lightbulb, key: "transition" },
  { path: "/execution/data", icon: Database, key: "myData" }
];

export default function Navigation() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/landing';
  const isAuthPage = authRoutes.includes(location.pathname);
  const userIsLoggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/landing" className="flex items-center px-1 pt-1 text-xl font-bold text-gray-900" aria-label="Accueil">
              Ekumen
            </Link>
            {!isLandingPage && !isAuthPage && navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {t.navigation[item.key]}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center">
            {!isLandingPage && !isAuthPage && userIsLoggedIn && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </button>
            )}
            {!userIsLoggedIn && !isAuthPage && (
              <Link
                to="/login"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}