import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Dot from "./Dot";

const ChatHistory = ({ messages, loading }) => {
    const bottomRef = useRef(null); // Ref to scroll to bottom

    // Scroll to bottom when messages update
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    return (
        <Box
            sx={{
                flex: 1,
                minHeight: 0, // Important for flex layouts
                overflowY: "scroll", // Enable scrolling
                p: 2,
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
            }}
        >
            {messages.map((msg, index) => (
                <Box
                    key={index}
                    sx={{
                        mb: 1,
                        textAlign: msg.sender === "user" ? "right" : "left",
                    }}
                >
                    <Box
                        sx={{
                            display: "inline-block",
                            px: 2,
                            py: 1,
                            bgcolor: msg.sender === "user" ? "#86dbf7" : "#F1F0F0",
                            borderRadius: 2,
                            maxWidth: "80%",
                        }}
                    >
                        {msg.text}
                    </Box>
                </Box>
            ))}

            {/* Typing dots animation when waiting for response */}
            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        pl: 1,
                        mb: 1,
                        mt: 1,
                    }}
                >
                    <Box sx={{ display: "flex", gap: "4px" }}>
                        <Dot />
                        <Dot sx={{ animationDelay: "0.2s" }} />
                        <Dot sx={{ animationDelay: "0.4s" }} />
                    </Box>
                </Box>
            )}

            {/* Dummy div to scroll to */}
            <div ref={bottomRef} />
        </Box>
    );
};

export default ChatHistory;
