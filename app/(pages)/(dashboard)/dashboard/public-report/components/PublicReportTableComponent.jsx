"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "city",
    headerName: "City",
    width: 125,
  },
  {
    field: "message",
    headerName: "Complaint",
    type: "string",
    flex: 1,
    renderCell: (params) => (
      <div
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "1.5",
          maxHeight: "3.75rem",
          padding: ".25rem 0",
          overflowY: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2, // Show only 2 lines of text
          outline: "none !important",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "ditangani",
    headerName: "Ditangani",
    width: 100,
    renderCell: (params) => <Checkbox checked={params.value} />,
  },
];

const PublicReportTable = ({ initialData }) => {
  const customStyles = {
    border: "transparent", // Customize border color
    borderRadius: ".5rem", // Customize border radius
  };
  return (
    <Box sx={{ height: initialData.length > 0 ? 500 : 150 }}>
      <DataGrid
        rows={initialData ? initialData : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        autosizeOptions={{
          columns: ["mention"],
          includeOutliers: true,
          includeHeaders: false,
        }}
        disableRowSelectionOnClick
        style={customStyles}
        className="customDataGrid max-lg:overflow-x-auto"
        localeText={{
          noRowsLabel: "Sorry, there is no matching data to display",
        }}
      />
    </Box>
  );
};

export default PublicReportTable;
