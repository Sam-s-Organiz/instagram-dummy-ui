import { Box } from "@mui/material";
import Image from "next/image";

import loadingTruck from "../../public/truck-animated-loading-css-animation.svg";

const LoadingTruck = () => {
  return (
    <Box sx={{ width: "100%", height: "200px", position: "relative" }}>
      <Image
        src={loadingTruck}
        alt="Animated truck!"
        fill
      />
    </Box>
  );
};

export default LoadingTruck;
