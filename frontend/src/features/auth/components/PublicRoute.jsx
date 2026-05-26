import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import LoadingSpinner from "./LoadingSpinner"

function PublicRoute({ children }) {
    const { user, authChecking, loading } = useAuth()

    if(authChecking) return <LoadingSpinner />

    if(user) return <Navigate to="/" />

    return children
}

export default PublicRoute