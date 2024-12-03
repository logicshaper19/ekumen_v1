import { Layout, BarChart2, Compass, Lightbulb, Target, Database, Users, LogIn, LogOut, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';
import { useTranslation } from '../contexts/LanguageContext';

const authRoutes = ['/login', '/signup'];

const navItems = [
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
              const isActive = location.pathname === item.path || 
                (item.subItems?.some(sub => location.pathname === sub.path));
              
              if (item.path === "/planning") {
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
                    {`${t.navigation.backTo} ${t.navigation[item.key]}`}
                  </Link>
                );
              }

              if (item.subItems) {
                return (
                  <div key={item.path} className="relative group inline-block">
                    <div
                      className={`inline-flex items-center px-1 pt-1 h-16 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {t.navigation[item.key]}
                    </div>
                    <div className="hidden group-hover:block absolute z-10 w-48 mt-0 bg-white rounded-md shadow-lg">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm ${
                              isSubActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center">
                              <SubIcon className="w-4 h-4 mr-2" />
                              {t.navigation[subItem.key]}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

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
          {!isAuthPage && <div className="flex items-center">
            {userIsLoggedIn ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.common.actions.logout}
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {t.common.actions.login}
              </Link>
            )}
          </div>}
        </div>
      </div>
    </nav>
  );
}