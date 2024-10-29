import { Box } from "@mui/material";
import Image from "next/image";

<<<<<<< HEAD
import loadingTruck from "../../public/truck-animated-loading-css-animation.svg";
=======
import insta from "@/public/instagram-logo.svg";
>>>>>>> ef794b59d17c602ae629c703db16dcc06f14a369

const LoadingTruck = () => {
  return (
    <Box sx={{ width: "100%", height: "200px", position: "relative" }}>
<<<<<<< HEAD
      <Image
        src={loadingTruck}
        alt="Animated truck!"
        fill
      />
=======
      <Image src={insta} alt="Animated truck!" fill />
>>>>>>> ef794b59d17c602ae629c703db16dcc06f14a369
    </Box>
  );
};

export default LoadingTruck;
