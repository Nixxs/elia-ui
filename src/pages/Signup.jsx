import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import _ from "lodash";
import { getRandomImage } from "../utils/image";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [background, setBackground] = useState(() => getRandomImage());


  const handleError = (message) => {
    setErrorMessage(message);
    toast.error(message);
  };

  const handleSubmit = useCallback(async () => {
    setErrorMessage(null);
    // Handle Validation Here

    if (!email || !password || !confirmPassword) {
        handleError("Please fill in all fields");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        handleError("Please enter a valid email address");
        return;
    }

    if (password.length < 8) {
        handleError("Password must be at least 8 characters");
        return;
    }

    if (password !== confirmPassword) {
        handleError("Passwords do not match");
        return;
    }

    const payload = {
        email: email,
        password: password,
    }
    
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/register`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status === 201) {
            toast.success("account created successfully, please login");
            navigate("/login");
        }
    } catch (error) {
        if (error.response) {
            const data = error.response.data;
            handleError(`Error creating account: ${data.detail}`);
        } else if (error.request) {
            handleError("No response received from the server. Please try again.");
        } else {
            handleError(error.response.data.detail);
        }
    }
  });

  const debouncedHandleSubmit = useRef(_.debounce(handleSubmit, 300));

  useEffect(() => {
    debouncedHandleSubmit.current = _.debounce(handleSubmit, 300);

    return () => {
      debouncedHandleSubmit.current.cancel();
    };
  }, [handleSubmit]);

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "row" }}>
      {/* the login form */}
      <Box
        sx={{
          flex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          px: 4,
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
          backgroundImage: "none", // Override the background image
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              debouncedHandleSubmit.current();
            }}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
            </Box>
            {errorMessage && (
              <Typography variant="body2" sx={{ mt: 2, color: "error.main" }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Register Account
            </Button>
            <Divider sx={{ my: 2, mt: 5 }} />
            <Typography variant="body2" sx={{ mt: 4 }}>
              Already have an account?{" "}
              <Link
                onClick={() => navigate("/login")}
                sx={{ cursor: "pointer" }}
              >
                Log In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* the background image */}
      <Box
        sx={{
          flex: 5,
          backgroundImage: background,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            bottom: 24,
            right: 42,
            color: "white",
            fontSize: "1rem",
            fontWeight: 400,
          }}
        >
          Image by Unsplash
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup;
