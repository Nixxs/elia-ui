import React from "react";
import { Box, Typography } from "@mui/material";

// Reusable TitleBlock component with logo
const TitleBlock = ({ sx = {} }) => {
    const titleWords = ["Enhanced", "Location", "Intelligence", "Assistant"];

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center", // Vertically center the text block and logo
                gap: 3,               // Space between logo and text
                ...sx,
            }}
        >
            {/* Logo */}
            <Box
                component="img"
                src="/elia_logo_grey.png"
                alt="Logo"
                sx={{
                    height: "100%",          // Match height of text block
                    maxHeight: "165px",      // Optional cap to avoid oversized logo
                    objectFit: "contain",    // Keep aspect ratio
                }}
            />

            {/* Vertical Text Block */}
            <Box>
                {titleWords.map((word, index) => (
                    <Typography
                        key={index}
                        sx={{
                            fontSize: "2rem",        // Large text
                            color: "grey.700",       // Grey color
                            lineHeight: 1.3,           // Spacing between lines
                            letterSpacing: "0.05em", // Subtle letter spacing
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 900,     // Extra bold first letter
                                fontSize: "2.2rem",  // Slightly larger for emphasis
                            }}
                        >
                            {word.charAt(0)}
                        </span>
                        {word.slice(1)}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default TitleBlock;
