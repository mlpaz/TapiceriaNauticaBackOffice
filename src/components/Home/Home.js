import React from "react";
import useSWR from "swr";
import { UserContext } from "../UserProvider";
import Table from "../Table";
import UpsertDialog from "../UpsertDialog";
import { API_BASE_URL } from "../../environment";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteConfirmDialog from "../DeleteConfirmDialog/DeleteConfirmDialog";
import { useNavigate } from "react-router-dom";

async function fetcher({ endpoint, token, setData, navigate, setToken }) {
  const response = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}`, Accept: "*/*" },
  });

  if (response.ok) {
    const json = await response.json();
    setData(json);
    return json;
  } else {
    if (response.status === 403) {
      setToken(null);
      navigate("/");
    }
  }
}

const columns = ({
  handleClickDeleteConfirmOpen,
  handleClickUpsertModalOpen,
}) => [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
  },
  {
    field: "name",
    headerName: "Name de usuario",
    width: 180,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
  },
  {
    field: "role",
    headerName: "Role",
    width: 180,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
  },
  {
    field: "actions",
    headerName: "Accionables",
    width: 180,
    sortable: false,
    description: "Posibles acciones a tomar ",
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <>
          <IconButton onClick={() => handleClickUpsertModalOpen(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleClickDeleteConfirmOpen(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      );
    },
  },
];

function Home() {
  const navigate = useNavigate();
  const { token, setToken } = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [current, setCurrent] = React.useState(null);
  const [edit, setEdit] = React.useState(null);
  const [openUpsertModal, setOpenUpsertModal] = React.useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  useSWR(
    {
      endpoint: `${API_BASE_URL}/user/list`,
      token,
      setData,
      navigate,
      setToken,
    },
    fetcher
  );

  const deleteRow = (id) => {
    console.log("id", id);
    const filteredData = data.filter((row) => {
      return row.id !== id;
    });
    setData(filteredData);
  };

  const editRow = (edit) => {
    const newData = data.map((row) => {
      if (row.id === edit.id) {
        return edit;
      }
      return row;
    });
    setData(newData);
  };

  const addRow = (newRow) => {
    let newData = [...data];
    newData.push(newRow);
    setData(newData);
  };

  const handleClickDeleteConfirmOpen = (data) => {
    setCurrent({
      id: data.id,
      message: `Estas por borrar al usuario ${data.name} con el rol ${data.role}.\n Estas seguro ?`,
    });
    setOpenDeleteConfirm(true);
  };

  const handleClickUpsertModalOpen = (edit) => {
    setEdit(edit);
    setOpenUpsertModal(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "100px",
        marginLeft: "80px",
        marginRight: "80px",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Usuarios
      </Typography>

      <Button
        fullWidth
        variant="contained"
        sx={{ width: "20%", marginTop: "20px" }}
        onClick={handleClickUpsertModalOpen}
      >
        Crear Usuario
      </Button>
      <UpsertDialog
        open={openUpsertModal}
        setOpen={setOpenUpsertModal}
        addRow={addRow}
        editRow={editRow}
        edit={edit}
      />
      <DeleteConfirmDialog
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        data={current}
        deleteRow={deleteRow}
      />
      <Table
        data={data}
        columns={columns({
          handleClickDeleteConfirmOpen,
          handleClickUpsertModalOpen,
        })}
      />
      <Box></Box>
    </Box>
  );
}

export default Home;
