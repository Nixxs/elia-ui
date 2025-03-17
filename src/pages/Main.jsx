import { useAuth } from "../features/AuthManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ChatWindow from "../components/ChatWindow";
import MapView from "../components/MapView";
import { Typography } from "@mui/material";

function Main() {
    const { authState } = useAuth();
    const navigate = useNavigate();
    const [map, setMap] = useState(null); // ✅ Map instance state

    // Check if the user is authenticated, send them to login screen if not
    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("/login");
        }
    }, [authState, navigate]);

    return (
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column", overflow: "hidden" }}>
            {/* Top Bar */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    p: 2,
                    borderBottom: "1px solid #ddd",
                }}
            >
                <img src="/favicon_logo.svg" alt="Logo" width={50} height={50} />
                <Typography variant="h5" sx={{ ml: 2 }}>
                    Enhanced Location Intelligence Assistant (ELIA)
                </Typography>
            </Box>

            {/* Bottom content: Map + Chat Window */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    minHeight: 0, // Prevent overflow
                }}
            >
                {/* Left Side - Chat Window */}
                <Box sx={{ flex: 2, overflow: "hidden" }}>
                    <ChatWindow map={map} /> {/* ✅ Pass map instance */}
                </Box>

                {/* Right Side - Google Map */}
                <Box sx={{ flex: 5, borderRight: "1px solid #ddd", overflow: "hidden" }}>
                    <MapView onMapLoad={setMap} /> {/* ✅ Capture map instance on load */}
                </Box>
            </Box>
        </Box>
    );
}

export default Main;
