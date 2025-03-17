import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Dot from "./Dot";
import ReactMarkdown from "react-markdown";

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
							bgcolor:
								msg.sender === "user" ? "#86dbf7" : "#F1F0F0",
							borderRadius: 2,
							maxWidth: "80%",
							boxShadow:
								"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", // Subtle custom shadow
							whiteSpace: "pre-wrap", // Preserve line breaks
						}}
					>
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => (
                                <Typography sx={{ m: 0, mb: 0.5, lineHeight: 1.5 }}>
                                    {children}
                                </Typography>
                            ),
                            ul: ({ children }) => (
                                <ul style={{ margin: 0, paddingLeft: "1.2em", paddingTop: 0, paddingBottom: 0 }}>
                                    {children}
                                </ul>
                            ),
                            li: ({ children }) => (
                                <li style={{ marginBottom: "0.3em", lineHeight: "1.5" }}>
                                    {children}
                                </li>
                            ),
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
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
