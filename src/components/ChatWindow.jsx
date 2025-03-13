import { useState } from "react";
import Box from "@mui/material/Box";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useAuth } from "../features/AuthManager"
import { toast } from "react-toastify";
import { addMarker } from "../functions/MapControl"

const ChatWindow = ({map}) => {
    const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
	const { authState } = useAuth();

	const handleError = (message) => {
		toast.error(message);
	};

	const handleChatResponse = (data) => {
		if (data.response_type == "chat") {
			setMessages((prevMessages) => [...prevMessages, { sender: "elia", text: data.message }]);
		} else if (data.response_type == "function_call") {
            switch (data.name) {
                case "add_marker":
                    const { latitude, longitude, label } = data.arguments;
                    addMarker(map, latitude, longitude, label); // Call your add_marker function
                    setMessages((prevMessages) => [...prevMessages, { sender: "elia", text: data.message }]);
                    break;
                default:
                    console.warn(`Unknown function call: ${data.name}`, data.arguments);
                    break;
            }
		}
	};

    const handleSendMessage = async () => {
        if (input.trim() === "") return;

        setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);
        setInput("");
		setLoading(true); // Start loading

        // Placeholder for backend call
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/chat`,
				{
					"message": input
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${authState.token}`,
					},
				}
			);
			if (response.status === 200) {
				handleChatResponse(response.data);
			}
		} catch (error) {
			if (error.response) {
				const data = error.response.data;
				handleError(`Error creating account: ${data.detail}`);
			} else if (error.request) {
				handleError("No response received from the server. Please try again.");
			} else {
				console.log(error);
                handleError(error);

			}
		} finally {
			setLoading(false); // End loading
		}
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: "4px 0 8px rgba(0,0,0,0.1)", // ✅ Subtle right shadow
                zIndex: 1, // Optional: ensure it sits above map if overlapping
            }}
        >
            <ChatHistory messages={messages} loading={loading} />
            <ChatInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
        </Box>
    );
};

export default ChatWindow;
