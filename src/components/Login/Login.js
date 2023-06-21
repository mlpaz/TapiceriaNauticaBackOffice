import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as ReactLogo } from "../../logo.svg";
import { API_BASE_URL } from "../../environment";
import Footer from "../Footer";
import { UserContext } from "../UserProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { token, setToken, setName } = React.useContext(UserContext);
  console.log("token --> ", token);

  React.useEffect(() => {
    if (token !== null) {
      console.log("move to home");
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(data.get("name"));
    console.log(data.get("password"));

    const response = await fetch(API_BASE_URL + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.get("name"),
        password: data.get("password"),
      }),
    });

    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      setToken(json.token);
      setName(data.get("name"));
      navigate("/home");
    } else {
      console.log("ERRORRR");
    }
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, width: 100, height: 100 }}>
          <ReactLogo
            style={{
              height: 100,
              width: 100,
            }}
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoComplete="name"
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}

export default Login;
