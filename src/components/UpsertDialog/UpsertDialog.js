import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { API_BASE_URL } from "../../environment";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { UserContext } from "../UserProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UpsertDialog({ edit, open, setOpen, addRow, editRow }) {
  const { token } = React.useContext(UserContext);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log("name", data.get("name"));
    console.log("password", data.get("password"));
    console.log("rol", data.get("role"));
    console.log("edit", edit);
    const body = JSON.stringify({
      id: edit != null ? edit.id : null,
      name: data.get("name"),
      password: data.get("password"),
      role: data.get("role"),
    });
    console.log("body", body);
    const response = await fetch(API_BASE_URL + "/user/upsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const json = await response.json();

    if (response.ok) {
      if (edit != null) {
        editRow(json);
      } else {
        addRow(json);
      }
      setOpen(false);
    } else {
      console.log("ERRORRR");
    }
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Usuario
          </Typography>
          <Button type="submit" autoFocus color="inherit" form="form">
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        id="form"
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "80%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre de Usuario"
            name="name"
            autoFocus
            defaultValue={edit != null ? edit.name : null}
          />
          <TextField
            autoComplete="off"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            id="password"
          />
          <InputLabel id="role-select-label">Rol</InputLabel>
          <Select
            labelId="role-select-label"
            required
            id="role"
            label="Rol"
            name="role"
            defaultValue={edit != null ? edit.role : null}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value={"ADMIN"}>Administrador</MenuItem>
            <MenuItem value={"USER"}>Usuario</MenuItem>
          </Select>
        </Box>
      </Box>
    </Dialog>
  );
}

export default UpsertDialog;
