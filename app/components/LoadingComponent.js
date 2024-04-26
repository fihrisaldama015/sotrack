import CircularProgress from "@mui/material/CircularProgress";

const LoadingComponent = ({ color = "info" }) => {
  return (
    <div>
      <CircularProgress color={color} />
    </div>
  );
};

export default LoadingComponent;
