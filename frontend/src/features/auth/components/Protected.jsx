import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import react from "react";

function Protected({children}) {
    const {loading, user} = useAuth();

    if(loading){
        return <LoadingSpinner />
    }

    if(!user){
        return <Navigate to={"/login" }/>
    }

    return children;
}

export default Protected;
