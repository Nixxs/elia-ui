import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ChatInput = ({ input, setInput, handleSendMessage }) => {
    return (
        <Box
            sx={{
                p: 1,
                display: "flex",
                gap: 1,
                borderTop: "1px solid #ddd",
                height: "100%", // ✅ Fill available vertical space
                alignItems: "center", // ✅ Center items vertically
				maxHeight: 60,
            }}
        >
            <TextField
                fullWidth
                size="medium"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                }}
                sx={{
                    height: "100%", // Full height
                    "& .MuiOutlinedInput-root": {
                        height: "100%", // Ensure input fills height
                        "& fieldset": {
                            border: "none", // Remove border
                        },
                        alignItems: "center", // Center text vertically
                        paddingRight: 0,
                    },
                    "& input": {
                        fontSize: "1rem", // ✅ Bigger font size (adjust as needed, e.g., '1.1rem' or '16px')
                        padding: 0, // Optional: adjust padding if needed
                    },
                }}
            />
            <Button
                variant="contained"
                onClick={handleSendMessage}
                sx={{ height: "100%" }} // ✅ Match button height to input
            >
                Send
            </Button>
        </Box>
    );
};

export default ChatInput;
