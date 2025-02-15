import { useAuth } from "../features/AuthManager";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
    const { authState } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("/login");
        }
        console.log(authState);
    }, [authState, navigate]);

    return (
        <h1>Main Page</h1>
    );
}

export default Main