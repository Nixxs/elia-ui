import { useAuth } from "../features/AuthManager";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Main() {
    const { authState } = useAuth();
    const navigate = useNavigate();

    function checkAuth() {
        console.log(authState);
    }

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("/login");
        }
        console.log(authState);
    }, [authState, navigate]);

    return (
        <Box>
            <h1>Main Page</h1>

            <Button
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={() => checkAuth()}
            >
              check auth
            </Button>
        </Box>
    );
}

export default Main