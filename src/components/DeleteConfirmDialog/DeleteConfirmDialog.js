import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { API_BASE_URL } from "../../environment";

import { UserContext } from "../UserProvider";
function DeleteConfirmDialog({ data, open, setOpen, deleteRow }) {
  const { token } = React.useContext(UserContext);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const response = await fetch(API_BASE_URL + `/user/${data.id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      deleteRow(data.id);
      setOpen(false);
    } else {
      console.log("ERRORRR");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Accion que requiere Confirmacion"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {data != null ? data.message : "No hay mensaje"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>NO</Button>
        <Button onClick={handleDelete} autoFocus>
          SI
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;
