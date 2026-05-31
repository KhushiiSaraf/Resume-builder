import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "../../../components/Navbar";
import react from "react";

function Protected({children}) {
    const { authChecking, user } = useAuth();

    if(authChecking){
        return <LoadingSpinner />
    }

    if(!user){
        return <Navigate to="/login" />
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Protected;
