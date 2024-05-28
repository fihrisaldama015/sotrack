"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeEmailSelected } from "@/app/redux/slices/MediaBroadcastSlice";
import { useRouter } from "next/navigation";

const getRowId = (row) => {
  return row.id;
};

const columns = [
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
    renderCell: (params) => (
      <div>{dayjs(params.value).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    field: "receipient",
    headerName: "Receipient",
    width: 200,
    renderCell: (params) => (
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        sx={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "1.5",
          maxHeight: "3.75rem",
          padding: ".25rem 0",
          overflowY: "hidden",
          outline: "none !important",
        }}
        className="overflow-x-auto no-scrollbar"
      >
        {params.value.split(", ").map((item, id) => (
          <Box
            key={id}
            className="text-sm first-letter:capitalize rounded-lg ring-1 ring-[#F0F0F0] bg-slate-100 shadow-md w-fit py-1 px-2 m-1"
          >
            {item.split("@")[0]}...
          </Box>
        ))}
      </Stack>
    ),
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "message",
    headerName: "Broadcast Message",
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
        dangerouslySetInnerHTML={{ __html: params.value }}
      ></div>
    ),
  },
];

const MediaBroadcastHubTable = ({ initialData }) => {
  const router = useRouter();
  const customStyles = {
    border: "transparent", // Customize border color
    borderRadius: ".5rem", // Customize border radius
    cursor: "pointer",
  };
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();

  const handleSelectionChange = (newSelection) => {
    setSelectedIds(newSelection);
    dispatch(
      changeEmailSelected({
        emailSelected: newSelection,
      })
    );
  };
  const handleRowClick = (row) => {
    const rowId = row.id;
    router.push(`media-broadcast-hub/${rowId}`);
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
          columns: ["mention"],
          includeOutliers: true,
          includeHeaders: false,
        }}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) =>
          handleSelectionChange(newSelection)
        }
        style={customStyles}
        className="customDataGrid max-lg:overflow-x-auto"
        localeText={{
          noRowsLabel: "Sorry, there is no matching data to display",
        }}
      />
    </Box>
  );
};

export default MediaBroadcastHubTable;
