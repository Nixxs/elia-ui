import { useState } from "react";
import Box from "@mui/material/Box";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useAuth } from "../features/AuthManager";
import { toast } from "react-toastify";
import { updateMapData, getGeoJsonFromDataLayer } from "../functions/MapControl";

const ChatWindow = ({ map }) => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState("");
	const { authState } = useAuth();

	const handleError = (message) => {
		toast.error(message);
	};

	const handleChatResponse = async (data) => {
		if (data.response_type == "chat") {
			setMessages((prevMessages) => [
				...prevMessages,
				{ sender: "elia", text: data.message },
			]);
		} else if (data.response_type == "function_call") {
			switch (data.name) {
                case "update_map_data":
                    const geojsonStr = data.arguments.geojson;
                    const geojson = JSON.parse(geojsonStr);
                    await updateMapData(map, geojson); // New generic map update function
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { sender: "elia", text: data.message },
                    ]);
                    break;
                default:
                    console.warn(`Unknown function call: ${data.name}`, data.arguments);
                    break;
			}
		}
	};

	const handleSendMessage = async () => {
		if (input.trim() === "") return;

		setMessages((prevMessages) => [
			...prevMessages,
			{ sender: "user", text: input },
		]);
		setInput("");
		setLoading(true); // Start loading

		try {
			// Final payload
			const payload = {
				message: input,
				map_data: await getGeoJsonFromDataLayer(map),
			};

			console.log("Sending payload to backend:", payload);

			// ✅ Send request
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/chat`,
				payload,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authState.token}`,
					},
				}
			);

			if (response.status === 200) {
				await handleChatResponse(response.data);
			}
		} catch (error) {
			if (error.response) {
				const data = error.response.data;
				handleError(`Error creating account: ${data.detail}`);
			} else if (error.request) {
				handleError(
					"No response received from the server. Please try again."
				);
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
			<ChatInput
				input={input}
				setInput={setInput}
				handleSendMessage={handleSendMessage}
			/>
		</Box>
	);
};

export default ChatWindow;
