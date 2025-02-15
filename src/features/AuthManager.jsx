import { createContext, useReducer, useContext } from "react";

// Define initial authentication state
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    expiry: null
};

// Define reducer function
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, error: null };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.access_token,
                expiry: action.payload.expiry
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                error: action.payload.message,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                expiry: null,
                error: null,
            };
        default:
            return state;
    }
};

// Create AuthContext
const AuthContext = createContext();

const login = async (dispatch, email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/accounts/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                "email": email, 
                "password": password 
            }),
        });
        const data = await response.json();

        if (response.status === 200) {
            dispatch({ type: "LOGIN_SUCCESS", payload: data });
            return({"status":response.status, "message":"success"});
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: data });
            return({"status":response.status, "message":data.message});
        }
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: `something went wrong: ${error}` });
    }
}

const logout = (dispatch) => {
    // TODO: call the actual logout route so the token is securly removed from the server
    dispatch({ type: "LOGOUT" });
}

// Create AuthProvider component
const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

export {AuthProvider, useAuth, login, logout}
