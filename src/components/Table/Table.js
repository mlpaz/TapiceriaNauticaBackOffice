import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import QuickSearchToolbar from "../QuickSearchToolbar";

function calculateWidth(list) {
  let width = 0;
  list.forEach((e) => {
    width += e.width;
  });
  return width;
}

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function Table({ data, columns }) {
  const [rows, setRows] = React.useState(data);
  const [searchText, setSearchText] = React.useState("");

  const tableWidth = calculateWidth(columns);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <DataGrid
      sx={{ marginTop: "30px", width: `${tableWidth}px` }}
      rows={rows}
      columns={columns}
      slots={{
        toolbar: QuickSearchToolbar,
      }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      slotProps={{
        toolbar: {
          value: searchText,
          onChange: (event) => requestSearch(event.target.value),
          clearSearch: () => requestSearch(""),
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}

export default Table;
