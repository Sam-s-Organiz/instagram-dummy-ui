import { Box } from "@mui/material";
import Image from "next/image";

import insta from "@/public/instagram-logo.svg";

const LoadingTruck = () => {
  return (
    <Box sx={{ width: "100%", height: "200px", position: "relative" }}>
      <Image src={insta} alt="Animated truck!" fill />
    </Box>
  );
};

export default LoadingTruck;
