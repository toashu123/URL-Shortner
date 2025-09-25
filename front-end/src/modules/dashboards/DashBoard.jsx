import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(localStorage.getItem('email') || 'amit@yahoo.com');

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
          <span className="text-xl">🔗</span>
          <span className="font-semibold text-gray-800 text-sm leading-tight">
            URL Shortener App <br />
            <span className="text-gray-600 text-xs">Welcome {email}</span>
          </span>
        </div>

        <nav className="mt-6 flex-1">
          <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Menu
          </p>

          <div className="mt-2">
            <button
              onClick={() => navigate('/dashboard/shorten')}
              className={`w-full text-left px-4 py-2 rounded-md mb-1 transition-colors duration-200 ${
                isActiveRoute('/dashboard/shorten')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Generate Short URL
            </button>

            <button
              onClick={() => navigate('/dashboard/links')}
              className={`w-full text-left px-4 py-2 rounded-md mb-1 transition-colors duration-200 ${
                isActiveRoute('/dashboard/links')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              My URLs
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            Logout
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            {/* Render child routes here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
