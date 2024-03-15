"use client";
import {
  deleteFilter,
  getAllFilterByPlatformId,
} from "@/app/api/repository/FilterRepository";
import AlertWarning from "@/app/components/AlertWarningComponent";
import { FACEBOOK, INSTAGRAM, TIKTOK, TWITTER } from "@/app/utils/assets";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import { RotateRightOutlined } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";
import MUIDataTable from "mui-datatables";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CATEGORY_COLOR = new Map()
  .set("Keyword", "#3E3AFF")
  .set("Mention", "#F4C41A")
  .set("Hashtag", "#33C36D")
  .set("Topic", "#1B59F8");

const PLATFORM_ICON = new Map()
  .set("twitter", TWITTER)
  .set("instagram", INSTAGRAM)
  .set("facebook", FACEBOOK)
  .set("tiktok", TIKTOK);

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

const getInitialData = async (platformId, token, platformName, category) => {
  let categoryMap = new Map();

  category.forEach((item) => {
    categoryMap.set(item.id, item.name);
  });
  const filter = await getAllFilterByPlatformId(platformId, token);
  if (filter?.length > 0) {
    return formatDataToTable(filter, platformName, categoryMap);
  }
  return [];
};

const PlatformFilterTable = ({ platformName, token, category }) => {
  const [filterData, setFilterData] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { platformId } = useSelector((state) => state.platformReducer);

  const handleDeleteFilter = async () => {
    setIsAlertOpen(false);
    try {
      setIsLoading(true);
      const response = await deleteFilter(filterId, token);
      const data = await getInitialData(
        platformId,
        token,
        platformName,
        category
      );
      setFilterData(data);
      setIsLoading(false);

      openPopUpSuccess(dispatch, "Success Delete Filter");
    } catch (error) {
      openPopUpError(dispatch, `${error?.error}: ${error?.message}`);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getInitialData(
        platformId,
        token,
        platformName,
        category
      );
      setFilterData(data);
      setIsLoading(false);
    })();
  }, []);

  const options = {
    filterType: "checkbox",
    selectableRowsHideCheckboxes: true,
    elevation: 0,
    toolbar: false,
    padding: "none",
    tableBodyHeight: "500px",
    textLabels: {
      body: {
        noMatch: isLoading ? (
          <Loader />
        ) : (
          "Sorry, there is no matching data to display"
        ),
      },
    },
  };

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
              className="py-0.5 px-2.5 rounded-lg font-semibold drop-shadow-sm text-center text-white"
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              className="py-1 pr-3 pl-2 rounded-lg ring-1 ring-[#F0F0F0] shadow-sm"
            >
              <Image
                src={PLATFORM_ICON.get(value)}
                width={13}
                height={13}
                alt={value}
              />
              <Typography className="text-sm first-letter:capitalize">
                {value}
              </Typography>
            </Stack>
          );
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
        message={`Are you sure to delete this filter?`}
        isOpen={isAlertOpen}
        action={handleDeleteFilter}
        close={() => setIsAlertOpen(false)}
      />
      {/* {isLoading ? (
        <Loader/>
      ) : ( */}
      <MUIDataTable data={filterData} columns={columns} options={options} />
      {/* )} */}
    </>
  );
};

export default PlatformFilterTable;

const Loader = () => {
  return (
    <Box className="flex justify-center items-center">
      <RotateRightOutlined className="animate-spin" />
      <Typography className="text-xl text-center font-semibold">
        Loading Filter Data...
      </Typography>
    </Box>
  );
};
