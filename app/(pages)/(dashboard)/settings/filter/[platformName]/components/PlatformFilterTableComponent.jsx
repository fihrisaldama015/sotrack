"use client";
import { getAllCategory } from "@/app/api/repository/CategoryRepository";
import {
  getAllFilterByPlatformId,
  deleteFilter,
} from "@/app/api/repository/FilterRepository";
import AlertWarning from "@/app/components/AlertWarningComponent";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Stack } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const options = {
  filterType: "checkbox",
  selectableRowsHideCheckboxes: true,
  elevation: 0,
  toolbar: false,
  padding: "none",
  tableBodyHeight: "300px",
};

const CATEGORY_COLOR = new Map()
  .set("Keyword", "#3E3AFF")
  .set("Mention", "#F4C41A")
  .set("Hashtag", "#33C36D")
  .set("Topic", "#1B59F8");

const formatDataToTable = (data, platformName, categoryMap) => {
  return data.map((item, index) => {
    return [
      item.id,
      index + 1,
      categoryMap.get(item.category_id),
      platformName,
      item.parameter,
      "",
    ];
  });
};

const PlatformFilterTable = ({ platformName, token, category }) => {
  const [filterData, setFilterData] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const dispatch = useDispatch();
  const { platformId } = useSelector((state) => state.platformReducer);

  const handleDeleteFilter = async () => {
    setIsAlertOpen(false);
    try {
      const response = await deleteFilter(filterId, token);
      console.log("🚀 ~ handleDeleteFilter ~ response:", response);

      openPopUpSuccess(dispatch, "Success Delete Filter");
    } catch (error) {
      openPopUpError(dispatch, `${error?.error}: ${error?.message}`);
    }
  };

  useEffect(() => {
    (async () => {
      let categoryMap = new Map();

      category.forEach((item) => {
        categoryMap.set(item.id, item.name);
      });

      const filter = await getAllFilterByPlatformId(platformId, token);
      filter?.length > 0 &&
        setFilterData(formatDataToTable(filter, platformName, categoryMap));
    })();
    (async () => {})();
  }, []);

  const columns = [
    { name: "id", label: "Id", options: { display: false } },
    {
      name: "no",
      label: "No",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (columnMeta) => {
          return <h3>{columnMeta.label}</h3>;
        },
      },
    },

    {
      name: "category",
      label: "Kategori",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (columnMeta) => {
          return <h3>{columnMeta.label}</h3>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box
              className="py-0.5 px-2.5 rounded-lg text-white"
              sx={{ backgroundColor: `${CATEGORY_COLOR.get(value)}` }}
            >
              {value}
            </Box>
          );
        },
      },
    },
    {
      name: "platform",
      label: "Platform",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (columnMeta) => {
          return <h3>{columnMeta.label}</h3>;
        },
      },
    },
    {
      name: "parameter",
      label: "Parameter",
      options: {
        filter: true,
        sort: true,
        customHeadLabelRender: (columnMeta) => {
          return <h3>{columnMeta.label}</h3>;
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customHeadLabelRender: (columnMeta) => {
          return <h3>{columnMeta.label}</h3>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={1}
            >
              <Stack
                className="items-center p-1 rounded-lg bg-[#FFD8D8] cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  setFilterId(tableMeta.rowData[0]);
                  setIsAlertOpen(true);
                }}
              >
                <DeleteOutlineIcon color="error" />
              </Stack>
              <Stack
                className="items-center p-1 rounded-lg bg-[#FFF0B9] cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <EditOutlinedIcon color="warning" />
              </Stack>
            </Stack>
          );
        },
      },
    },
  ];

  return (
    <>
      <AlertWarning
        message={`Are you sure to delete this filter?. filter_id=${filterId}`}
        isOpen={isAlertOpen}
        action={handleDeleteFilter}
        close={() => setIsAlertOpen(false)}
      />
      <MUIDataTable data={filterData} columns={columns} options={options} />
    </>
  );
};

export default PlatformFilterTable;
