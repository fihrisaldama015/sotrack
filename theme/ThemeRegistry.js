"use client"

import { lato } from "@/app/utils/typography";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography:{
        fontFamily: lato.style.fontFamily,
        button:{
            textTransform:'none'
        }
    }
})

export default function ThemeRegistry({children}){
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}