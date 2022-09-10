import { AppBar, Box, CssBaseline } from "@mui/material";
import { H2 } from "../Headings";

interface BasicLayoutProps {
    children: React.ReactNode;
}

function BasicLayout({ children }: BasicLayoutProps) {
    return <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <CssBaseline />
        <AppBar sx={{ backgroundColor: "black" }} position="sticky" >
            <H2 sx={{ ml: 2 }}>LZ77</H2>
        </AppBar>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
            {children}
        </Box>
    </Box >
}

export default BasicLayout;