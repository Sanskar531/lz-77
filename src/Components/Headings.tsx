import { SxProps, Typography } from "@mui/material"

type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
    children: React.ReactNode;
    sx?: SxProps;
}


function generateHeadings(heading: Headings) {
    return ({ children, ...props }: HeadingProps) => {
        return <Typography {...props} variant={heading} >{children}</Typography>
    }
}

export const H1 = generateHeadings("h1")
export const H2 = generateHeadings("h2")
export const H3 = generateHeadings("h3")
export const H4 = generateHeadings("h4")
export const H5 = generateHeadings("h5")
export const H6 = generateHeadings("h6")