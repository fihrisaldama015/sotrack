"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "no", headerName: "No", width: 50 },
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  {
    field: "source",
    headerName: "Source",
    width: 150,
    renderCell: (params) => (
      <a
        href={params.value}
        className={`no-underline ${
          params.value == "" ? "cursor-not-allowed text-slate-300" : ""
        }`}
        target="_blank"
      >
        Click Here
      </a>
    ),
  },
  {
    field: "mention",
    headerName: "Mention",
    type: "string",
    flex: 1,
    renderCell: (params) => (
      <div
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "1.5",
          maxHeight: "3.75rem",
          padding: ".5rem 0",
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
    field: "about",
    headerName: "About",
    width: 150,
  },
];

const SourceTrackerTable = ({ initialData }) => {
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

export default SourceTrackerTable;
