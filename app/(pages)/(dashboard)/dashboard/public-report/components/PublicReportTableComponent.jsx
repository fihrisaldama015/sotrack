"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import { handleReport } from "@/app/api/repository/PublicReportRepository";

const getRowId = (row) => {
  return row.id;
};

const PublicReportTable = ({ initialData, refresh }) => {
  const router = useRouter();

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
            padding: "1rem 0",
            overflowY: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1, // Show only 2 lines of text
            outline: "none !important",
          }}
          dangerouslySetInnerHTML={{ __html: params.value }}
        ></div>
      ),
    },
    {
      field: "ditangani",
      headerName: "Ditangani",
      width: 100,
      renderCell: (params) => (
        <Checkbox
          className="z-10 absolute"
          onClick={(event) => handleCheckbox(event, params.row.id)}
          checked={params.value}
        />
      ),
    },
  ];

  const handleCheckbox = async (event, id) => {
    event.stopPropagation();
    try {
      const response = await handleReport(id);
      console.log(response);
    } catch (error) {
      console.log("🚀 ~ handleCheckbox ~ error:", error);
    }
    refresh();
  };

  const customStyles = {
    border: "transparent", // Customize border color
    borderRadius: ".5rem", // Customize border radius
    cursor: "pointer",
  };

  const handleRowClick = (row) => {
    const rowId = row.id;
    router.push(`public-report/${rowId}`);
  };
  return (
    <Box sx={{ height: initialData.length > 0 ? 500 : 150 }}>
      <DataGrid
        rows={initialData ? initialData : []}
        columns={columns}
        getRowId={getRowId}
        onRowClick={handleRowClick}
        componentsProps={{
          row: {
            className: "data-grid-row",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        autosizeOptions={{
          columns: ["message"],
          includeOutliers: true,
          includeHeaders: false,
        }}
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
