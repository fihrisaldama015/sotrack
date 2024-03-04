import { CircularProgress } from "@mui/material"

const LoadingComponent = ({color = "info"}) => {
    return (
        <div>
            <CircularProgress color={color}/>
        </div>
    )
}

export default LoadingComponent