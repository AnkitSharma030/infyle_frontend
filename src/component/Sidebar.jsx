import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ShieldCheck, LogOut } from 'lucide-react';

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();
    const vendor = JSON.parse(localStorage.getItem('vendor') || '{}');
    const isAdmin = vendor?.role === 'admin';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };
    const navItems = [
        ...(!isAdmin
            ? [
                { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { to: '/add-product', label: 'Add Product', icon: PlusCircle },
            ]
            : []),
        ...(isAdmin
            ? [{ to: '/admin', label: 'Admin Panel', icon: ShieldCheck }]
            : []),
    ];


    return (
        <div className="h-full flex flex-col bg-white border-r border-gray-200">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-800">Store Manager</h1>
                {vendor?.email && (
                    <p className="text-xs text-gray-500 mt-1 truncate">{vendor.email}</p>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
