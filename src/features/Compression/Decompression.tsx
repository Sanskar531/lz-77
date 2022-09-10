import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { H3, H5 } from "../../Components/Headings";
import { LZ77 } from "./compressors";

function Decompression() {
  const [decompressedValues, setDecompressedValues] = useState<string>("");
  const decodeTextRef = useRef<HTMLInputElement>();

  const decompress = async () => {
    const compressedText = LZ77.decompress(decodeTextRef.current?.value ?? "");
    setDecompressedValues(compressedText);
  };

  return (
    <Box
      sx={{
        flex: "1 1 0",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        m: 2,
        ">*": { m: 4 },
      }}
    >
      <H3 sx={{ ml: 4 }}>Decompress:</H3>
      <Box sx={{ display: "flex", ml: 4, gap: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <H5>To Decode:</H5>
          <TextField
            maxRows={10}
            inputRef={decodeTextRef}
            onChange={decompress}
            variant="filled"
            multiline
            fullWidth
          ></TextField>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <H5>Decompressed String:</H5>
          <TextField
            maxRows={10}
            value={decompressedValues}
            disabled
            variant="filled"
            multiline
            fullWidth
          ></TextField>
        </Box>
      </Box>
    </Box>
  );
}

export default Decompression;
