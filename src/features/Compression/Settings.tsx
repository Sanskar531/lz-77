import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { H3, H6 } from "../../Components/Headings";

interface SettingsProps {
  searchBuffer: number;
  lookAheadSize: number;
  searchBufferChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lookAheadSizeChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Settings({
  searchBuffer,
  searchBufferChangeHandler,
  lookAheadSize,
  lookAheadSizeChangeHandler,
}: SettingsProps) {
  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <H3 sx={{ ml: 2 }}>Settings:</H3>
      <Box sx={{ display: "flex", ">*": { m: 2 } }}>
        <Box>
          <H6>Search Buffer Size:</H6>
          <TextField
            value={searchBuffer}
            inputProps={{
              maxLength: 3,
            }}
            sx={{ width: "250px" }}
            onChange={searchBufferChangeHandler}
          ></TextField>
        </Box>
        <Box>
          <H6>Look Ahead Buffer Size:</H6>
          <TextField
            value={lookAheadSize}
            inputProps={{
              maxLength: 3,
            }}
            sx={{ width: "250px" }}
            onChange={lookAheadSizeChangeHandler}
          ></TextField>
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
