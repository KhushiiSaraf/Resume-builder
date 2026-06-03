import {Link }from "react-router-dom";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Register() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {loading, error, handleRegister} = useAuth();

    const onSubmit = async(e)=>{
        e.preventDefault();
        await handleRegister({name,email,password});

    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f19] px-4 overflow-hidden">

            {/* glow wrapper */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
                <div className="absolute w-[300px] h-[300px] bg-purple-600/20 blur-3xl rounded-full bottom-[-80px] right-[-80px]" />
            </div>

            {/* actual card */}
            <div className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">

                <h2 className="text-2xl font-semibold text-gray-100 text-center mb-6">
                    Create Account
                </h2>

                <form className="space-y-5" onSubmit={(e) => onSubmit(e)}>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                    type="submit"
                    disabled={loading}
                    className={`w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-200 ease-out hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:-translate-y-[1px] active:scale-[0.98] active:shadow-[0_0_10px_rgba(99,102,241,0.2)] ${loading ? "opacity-70 cursor-not-allowed" : ""} `}
                  >
                    {loading && (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    )}

                    {loading ? "Registering..." : "Register"}
                  </button>
                </form>

                <div className="flex items-center justify-between text-sm text-gray-400 mt-5">
                    <Link to="/" className="text-indigo-400 hover:underline">Home</Link>
                    <p>
                        Already have an account?{" "}
                        <span className="text-indigo-400 cursor-pointer hover:underline">
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;