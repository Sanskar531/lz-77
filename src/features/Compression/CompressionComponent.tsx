import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { H3, H5 } from "../../Components/Headings";
import Settings from "./Settings";
import { LZ77 } from "./compressors";

function Compression() {
  const [compressedValues, setCompressedValues] = useState<string>("");
  const [searchBuffer, setSearchBufferSize] = useState<number>(50);
  const [lookAheadSize, setLookAheadSize] = useState<number>(50);
  const [triggerCompress, setTriggerCompress] = useState<boolean>(false);
  const encodeTextFieldRef = useRef<HTMLInputElement>();

  const compress = async () => {
    const compressedText = LZ77.compress(
      encodeTextFieldRef.current?.value ?? "",
      searchBuffer,
      lookAheadSize
    );
    setCompressedValues(compressedText);
  };

  useEffect(() => {
    compress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerCompress]);

  const searchBufferChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseInt(e.target.value) ?? 0;
    setSearchBufferSize(isNaN(newValue) ? 0 : newValue);
    setTriggerCompress((state) => !state);
  };

  const lookAheadSizeChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseInt(e.target.value) ?? 0;
    setLookAheadSize(isNaN(newValue) ? 0 : newValue);
    setTriggerCompress((state) => !state);
  };

  return (
    <Box
      sx={{
        flex: "1 1 0",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        m: 2,
        ">*": { m: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Settings
          {...{
            searchBuffer,
            searchBufferChangeHandler,
            lookAheadSize,
            lookAheadSizeChangeHandler,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "start",
            gap: 5,
          }}
        >
          <H3>Compression Rate:</H3>
          <H3 sx={{ alignSelf: "center" }}>
            {isNaN(
              (encodeTextFieldRef.current?.value?.length ?? 1) /
                (compressedValues.length ?? 1)
            ) ||
            Math.abs(
              (encodeTextFieldRef.current?.value?.length ?? 1) /
                (compressedValues.length ?? 1)
            ) === Number.POSITIVE_INFINITY
              ? 1
              : Math.round(
                  ((encodeTextFieldRef.current?.value?.length ?? 1) /
                    (compressedValues.length ?? 1)) *
                    100
                ) / 100}
          </H3>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <H3>Compress:</H3>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <H5>To Encode:</H5>
            <TextField
              maxRows={10}
              inputRef={encodeTextFieldRef}
              onChange={compress}
              variant="filled"
              multiline
              fullWidth
            ></TextField>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <H5>Compressed String:</H5>
            <TextField
              maxRows={10}
              value={compressedValues}
              disabled
              variant="filled"
              multiline
              fullWidth
            ></TextField>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Compression;
