import { Box, Button, TextField } from "@mui/material";

const ChatInput = ({ input, setInput, handleSendMessage }) => {
    return (
        <Box
            sx={{
                p: 1,
                display: "flex",
                gap: 1,
                borderTop: "1px solid #ddd",
                alignItems: "flex-end", // Align button to bottom of growing input
            }}
        >
            <TextField
                fullWidth
                multiline
                minRows={1}
                maxRows={6} // Grows up to 6 lines
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Prevent newline if not Shift+Enter
                        handleSendMessage();
                    }
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        padding: "8px 12px",
                        borderRadius: "8px",
                        backgroundColor: "#f5f5f5",
                        alignItems: "flex-start", // Fix vertical alignment
                    },
                    "& textarea": {
                        padding: 0,
                        fontSize: "1rem",
                        lineHeight: 1.5,
                    },
                }}
            />
            <Button
                variant="contained"
                onClick={handleSendMessage}
                sx={{
                    whiteSpace: "nowrap",
                    height: 40,
                    borderRadius: "8px",
                    alignSelf: "flex-end", // Align with bottom of input
                }}
            >
                Send
            </Button>
        </Box>
    );
};

export default ChatInput;
