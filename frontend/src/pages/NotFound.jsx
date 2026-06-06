import { Link } from "react-router-dom"
import { motion } from "motion/react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center text-center px-4">
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-8xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    404
                </h1>

                <h2 className="text-2xl font-semibold text-white mb-3">
                    Page Not Found
                </h2>

                <p className="text-gray-400 mb-8 max-w-sm">
                    We can’t seem to find the page you are looking for.
                </p>

                <Link
                    to="/"
                    className="px-6 py-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition active:scale-95"
                >
                    Go Home
                </Link>
            </motion.div>
        </div>
    )
}