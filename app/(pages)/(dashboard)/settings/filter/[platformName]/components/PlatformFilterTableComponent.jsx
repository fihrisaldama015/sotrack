"use client";
import { deleteFilter } from "@/app/api/repository/FilterRepository";
import AlertWarning from "@/app/components/AlertWarningComponent";
import { changeFilterData } from "@/app/redux/slices/FilterSlice";
import { FACEBOOK, INSTAGRAM, NEWS, TIKTOK, TWITTER } from "@/app/utils/assets";
import { openPopUpError, openPopUpSuccess } from "@/app/utils/extensions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RotateRightOutlined from "@mui/icons-material/RotateRightOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MUIDataTable from "mui-datatables";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CATEGORY_COLOR = new Map()
  .set("Keyword", "#3E3AFF")
  .set("Mention", "#F4C41A")
  .set("Hashtag", "#33C36D")
  .set("Topic", "#1B59F8");

const PLATFORM_ICON = new Map()
  .set("twitter", TWITTER)
  .set("instagram", INSTAGRAM)
  .set("facebook", FACEBOOK)
  .set("tiktok", TIKTOK)
  .set("news", NEWS);

const PlatformFilterTable = ({
  platformName,
  token,
  filterData,
  refreshPage,
}) => {
  const [filterId, setFilterId] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [filterData]);

  const handleDeleteFilter = async () => {
    setIsAlertOpen(false);
    try {
      setIsLoading(true);
      await deleteFilter(filterId, token);
      refreshPage();
      setIsLoading(false);

      openPopUpSuccess(dispatch, "Success Delete Filter");
    } catch (error) {
      openPopUpError(dispatch, `${error?.error}: ${error?.message}`);
    }
  };

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
    { name: "category_id", label: "Category Id", options: { display: false } },
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
          const is_active = tableMeta.rowData[6];
          return (
            <Box
              className="py-0.5 px-2.5 rounded-lg font-semibold drop-shadow-sm text-center text-white"
              sx={{
                backgroundColor: `${
                  is_active ? CATEGORY_COLOR.get(value) : "#E0E0E0"
                }`,
              }}
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
          const is_active = tableMeta.rowData[6];
          return (
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              className={`py-1 pr-3 pl-2 rounded-lg ring-1 ring-[#F0F0F0] shadow-md ${
                is_active ? "bg-white text-black" : "bg-[#E0E0E0] text-white"
              }`}
            >
              <Image
                src={PLATFORM_ICON.get(value)}
                width={13}
                height={13}
                alt={value}
                className={`${is_active ? "" : "grayscale-[1]"}`}
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
    { name: "is_active", label: "Is Active", options: { display: false } },
    {
      name: "action",
      label: "Action",
      options: {
        customHeadLabelRender: (columnMeta) => {
          return <h3>{columnMeta.label}</h3>;
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          const category = tableMeta.rowData[3]; // Assuming "category" is the third column in your table (index 2)
          const isDisabled = category === "Mention";

          return (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={1}
            >
              <Stack
                className={`items-center p-1 rounded-lg bg-[#FFD8D8] ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50 pointer-events-none"
                    : "cursor-pointer"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  setFilterId(tableMeta.rowData[0]);
                  setIsAlertOpen(true);
                }}
              >
                <DeleteOutlineIcon color="error" />
              </Stack>
              <Stack
                className={`items-center p-1 rounded-lg bg-[#FFF0B9]  ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50 pointer-events-none"
                    : "cursor-pointer"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(
                    changeFilterData({
                      filterData: {
                        id: tableMeta.rowData[0],
                        category_id: tableMeta.rowData[1],
                        category: tableMeta.rowData[3],
                        platform: tableMeta.rowData[4],
                        parameter: tableMeta.rowData[5],
                        is_active: tableMeta.rowData[6],
                      },
                    })
                  );
                  router.push(
                    `/settings/filter/${platformName}/edit/${tableMeta.rowData[0]}`
                  );
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
      <MUIDataTable data={filterData} columns={columns} options={options} />
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
