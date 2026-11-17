import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Compass, Layers, DollarSign, Calendar, Users,
  PlusCircle, Image, Star, Settings, BarChart3, User, LogOut,
  Menu, X, Bell, ExternalLink, ShieldCheck
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { Logo } from '../components/common/Logo';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Tours (All 25)', path: '/admin/tours', icon: <Compass className="w-4 h-4" /> },
    { label: 'Categories', path: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { label: 'Pricing Tiers', path: '/admin/pricing', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Bookings', path: '/admin/bookings', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Customers', path: '/admin/customers', icon: <Users className="w-4 h-4" /> },
    { label: 'Tour Add-ons', path: '/admin/addons', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Photo Gallery', path: '/admin/gallery', icon: <Image className="w-4 h-4" /> },
    { label: 'Reviews', path: '/admin/reviews', icon: <Star className="w-4 h-4" /> },
    { label: 'Messages', path: '/admin/messages', icon: <Bell className="w-4 h-4" /> },
    { label: 'Business Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
    { label: 'Reports', path: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Admin Profile', path: '/admin/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Bar */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Logo variant="light" showTagline={false} size="sm" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              ITQ Admin Console
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-none text-xs">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                    active
                      ? 'bg-gold-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <div className="font-bold text-white truncate">{user?.name || 'Administrator'}</div>
              <div className="text-[11px] text-slate-400 truncate">{user?.email || 'admin@imperialtours.qa'}</div>
            </div>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-gold-400"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        {/* Top Header */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Imperial Tours Qatar Operations System
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold"
            >
              <span>Customer Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
