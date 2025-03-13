import React from "react";
import { Box } from "@mui/material";

// Reusable dot component for animation
const Dot = ({ sx = {} }) => (
    <Box
        sx={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#bbb",
            animation: "blink 1.2s infinite ease-in-out",
            ...sx,
            "@keyframes blink": {
                "0%": { opacity: 0.2 },
                "20%": { opacity: 1 },
                "100%": { opacity: 0.2 },
            },
        }}
    />
);

export default Dot;