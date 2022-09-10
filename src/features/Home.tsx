import { Box } from "@mui/system";
import { H1, H4 } from "../Components/Headings";
import BasicLayout from "../Components/Layout/BasicLayout";
import Compression from "./Compression/CompressionComponent";
import Decompression from "./Compression/Decompression";

function Home() {
  return (
    <BasicLayout>
      <Box
        sx={{
          mt: 5,
          p: 2,
          color: "white",
          backgroundImage: "linear-gradient(to right, #183642,#9EC5AB)",
          borderRadius: "0.3em",
        }}
      >
        <H1 sx={{ fontSize: { sm: "16rem" } }}>LZ77</H1>
        <H4
          sx={{
            fontSize: { xs: "1em", sm: "2rem" },
            textAlign: "center",
            color: "grey",
            fontStyle: "italic",
          }}
        >
          Lempel-Ziv-77
        </H4>
      </Box>
      <Compression />
      <Decompression />
    </BasicLayout>
  );
}

export default Home;
