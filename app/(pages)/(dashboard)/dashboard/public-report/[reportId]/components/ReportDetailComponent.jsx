"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function ReadOnlyTextField({ ...props }) {
  return (
    <TextField
      {...props}
      className="bg-slate-200"
      InputProps={{
        sx: {
          borderRadius: 2,
          "&:has([readonly]) ": {
            "& .MuiInputLabel-outlined": {
              color: "#cecece",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#cecece",
            },
          },
        },
        readOnly: true,
      }}
    />
  );
}

const ReportDetail = ({ initialData }) => {
  console.log("🚀 ~ ReportDetail ~ initialData:", initialData);
  return (
    <Box className="p-20 pt-5 flex flex-col justify-center items-center gap-3">
      <Typography className="font-extrabold text-4xl text-center">
        Public Report Detail
      </Typography>
      <Stack direction={"column"} gap={4} className="w-full">
        <form
          className="py-7 px-20 flex flex-col gap-6"
          // onSubmit={handleSubmit(onSubmit)}
        >
          <Typography className="text-xl font-semibold">
            Public Report
          </Typography>
          <FormControl>
            <Typography className="mb-3 font-medium text-base">Name</Typography>
            <ReadOnlyTextField type={"text"} value={initialData.name} />
          </FormControl>
          <FormControl>
            <Typography className="mb-3 font-medium text-base">
              Email Address
            </Typography>
            <ReadOnlyTextField
              placeholder="email@domain.com"
              type={"email"}
              value={initialData.email}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />
          </FormControl>
          <Stack direction={"row"} spacing={2}>
            <FormControl className="flex flex-1">
              <Typography className="mb-3 font-medium text-base">
                Phone Number
              </Typography>
              <ReadOnlyTextField
                placeholder="Phone Number"
                type={"text"}
                value={initialData.phone}
              />
            </FormControl>
            <FormControl className="flex flex-1">
              <Typography className="mb-3 font-medium text-base">
                Category
              </Typography>
              <ReadOnlyTextField type={"text"} value={initialData.category} />
            </FormControl>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <FormControl className="flex flex-1">
              <Typography className="mb-3 font-medium text-base">
                Province
              </Typography>
              <ReadOnlyTextField
                placeholder="Phone Number"
                type={"text"}
                value={initialData.province}
              />
            </FormControl>
            <FormControl className="flex flex-1">
              <Typography className="mb-3 font-medium text-base">
                City/Regency
              </Typography>
              <ReadOnlyTextField
                placeholder="Phone Number"
                type={"text"}
                value={initialData.city}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <Typography className="mb-3 font-medium text-base">
              Report
            </Typography>
            <ReadOnlyTextField
              placeholder="Report Guideline"
              value={initialData.message}
            />
          </FormControl>
        </form>
      </Stack>
    </Box>
  );
};

export default ReportDetail;
