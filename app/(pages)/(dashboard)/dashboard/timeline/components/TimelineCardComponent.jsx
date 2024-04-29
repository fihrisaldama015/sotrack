import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import MessageOutlined from "@mui/icons-material/MessageOutlined";
import ScreenRotationAltOutlined from "@mui/icons-material/ScreenRotationAltOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Card = ({
  date,
  username,
  fullName,
  message,
  post_url = "",
  avatar,
  comment = 0,
  repost = 0,
  like = 0,
  insight = 0,
}) => {
  return (
    <Stack
      direction={"row"}
      spacing={1}
      className="bg-white py-3 px-5 rounded-[10px] ring-1 ring-slate-200"
    >
      <img
        src={avatar}
        alt="picture"
        height={30}
        width={30}
        className="rounded-full"
      />
      <Stack direction={"column"}>
        <Typography className="font-semibold text-sm">{fullName}</Typography>
        <Typography className="text-[#8E8E8E] text-xs">{username}</Typography>
        <Typography
          className="mt-2 text-[#686868] text-xs"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {message}
        </Typography>
        <img
          src={post_url}
          alt=""
          className="object-contain w-full h-auto rounded-lg mt-2"
          style={{ display: post_url != "" ? "block" : "none" }}
        />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          marginTop={1.5}
        >
          <Typography className="font-medium text-xs text-[#8E8E8E]">
            1 mins ago · {date}
          </Typography>
          <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <MessageOutlined sx={{ width: 16 }} color="grey" />
              <Typography className="text-xs text-[#8E8E8E]">
                {comment}
              </Typography>
            </Stack>
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <ScreenRotationAltOutlined
                sx={{ width: 16 }}
                color="grey"
                className="rotate-[40deg]"
              />
              <Typography className="text-xs text-[#8E8E8E]">
                {repost}
              </Typography>
            </Stack>{" "}
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <FavoriteBorderOutlined sx={{ width: 16 }} color="grey" />
              <Typography className="text-xs text-[#8E8E8E]">{like}</Typography>
            </Stack>
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <BarChartOutlined sx={{ width: 16 }} color="grey" />
              <Typography className="text-xs text-[#8E8E8E]">
                {insight}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Card;
