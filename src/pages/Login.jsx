import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth, login } from "../features/AuthManager";
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
import { LoadingOverlay } from "../features/Loader";
import TitleBlock from "../components/TitleBlock";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { authState, dispatch } = useAuth();
  const navigate = useNavigate();
  const [background, setBackground] = useState(() => getRandomImage());

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const result = await login(dispatch, email, password);
    if (result) {
      if (result.message === "success") {
        navigate("/");
      } else {
        toast.error(result.message);
      }
    }
    setLoading(false);
  }, [dispatch, email, password, navigate]);

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
        {/* Title Block */}
        <Box
            sx={{
                flex: 1,
                alignItems: "left",
                width: "100%", 
                maxWidth: 400,
                mt: 9,
                mb: 2
            }}
        >
            <TitleBlock />
        </Box>
        {/* login form */}
        <Box sx={{ flex: 3, width: "100%", maxWidth: 400 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Log In
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
            </Box>
            {authState.error && (
              <Typography variant="body2" sx={{ mt: 2, color: "error.main" }}>
                {authState.error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Log In
            </Button>
            <Divider sx={{ my: 2, mt: 5 }} />
            <Typography variant="body2" sx={{ mt: 4 }}>
              No account yet?{" "}
              <Link
                onClick={() => navigate("/signup")}
                sx={{ cursor: "pointer" }}
              >
                Sign Up
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
      <LoadingOverlay isOpen={loading} />
    </Box>
  );
}

export default Login;
