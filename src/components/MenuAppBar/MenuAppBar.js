import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { UserContext } from "../UserProvider";

import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const navigate = useNavigate();
  const { token, name, setName, setToken } = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [anchorUserEl, setAnchorUserEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenu = (event) => {
    setAnchorUserEl(event.currentTarget);
  };

  const handleUserCloseSession = () => {
    setToken(null);
    setName(null);
    navigate("/");
    setAnchorUserEl(null);
  };

  const handleGoToProfile = () => {
    setAnchorUserEl(null);
  };

  const handleUserClose = () => {
    setAnchorUserEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              disabled={!token}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Presupuestos</MenuItem>
              <MenuItem onClick={handleClose}>Inventario</MenuItem>
              <MenuItem onClick={handleClose}>Usuarios</MenuItem>
            </Menu>
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bienvenido {token != null ? name : ""}
          </Typography>
          {token && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-user-appbar"
                anchorEl={anchorUserEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorUserEl)}
                onClose={handleUserClose}
              >
                <MenuItem onClick={handleGoToProfile}>Perfil</MenuItem>
                <MenuItem onClick={handleUserCloseSession}>
                  Cerrar Session
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
