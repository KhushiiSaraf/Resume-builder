import { useState, useRef, useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import ConfirmModal from "./ConfirmModal";
import { LogOut } from "lucide-react";

export default function Navbar() {
    const { user, handleLogout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // logout modal
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav className="
        w-full px-6 py-4 flex items-center justify-between
  border-b border-white/10
  bg-[#0b0f19] relative
  shadow-[0_2px_10px_rgba(0,0,0,0.2)]">

                {/* LOGO */}
                <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent cursor-pointer">
                    ResuMatch
                </h1>

                {/* RIGHT SIDE */}
                <div className="relative" ref={dropdownRef}>

                    {/* PROFILE BUTTON */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/5 transition cursor-pointer"
                    >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-medium ">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        {/* Arrow */}
                        <span className="text-gray-400 text-xs">▾</span>
                    </button>

                    {/* DROPDOWN */}
                    {open && (
                        <div className="
            absolute right-0 mt-2 w-44
            bg-[#111827] border border-white/10
            rounded-xl shadow-lg z-50
          ">
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition flex items-center gap-2"
                            >
                               <LogOut size={16} strokeWidth={1.5} /> Logout
                            </button>
                        </div>
                    )}

                </div>
            </nav>
            <ConfirmModal
                open={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                title="Logout"
                message="Are you sure you want to logout?"
                confirmText="Logout"
            />
        </>
    );
}