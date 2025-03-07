import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ isOpen }) => {
	return (
		<Backdrop
			sx={{
				color: "#fff",
				zIndex: (theme) => theme.zIndex.drawer + 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
			open={isOpen}
		>
			<CircularProgress color="inherit" size={60} />
		</Backdrop>
	);
};

const ContainerizedLoadingOverlay = ({ isOpen }) => {
    return (
        <Backdrop
            sx={{
                color: '#fff', 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                position: 'absolute',
                m: 0, 
                p: 0, 
                width: '100%',
                height: '100%',
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            open={isOpen}
        >
            <CircularProgress color="inherit" size={60} />
        </Backdrop>
    );
};

export {ContainerizedLoadingOverlay, LoadingOverlay};
