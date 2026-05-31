import { useAuth } from '../features/auth/hooks/useAuth';

export default function Navbar() {
    const { user, handleLogout } = useAuth()

    return (
        <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 bg-[#0b0f19]">
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                InterviewAI
            </h1>
            <div className="flex items-center gap-4">
                <p className="text-sm text-gray-400">Hey, {user?.name}</p>
                <button
                    onClick={handleLogout}
                    className="text-sm px-4 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}