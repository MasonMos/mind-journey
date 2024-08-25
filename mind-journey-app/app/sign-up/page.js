'use client'

import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { createTheme } from '@mui/material/styles';
import Image from "next/image";

const theme = createTheme({
  palette: {
    primary: {
      light: '#676fgd',
      main: '#424769',
      dark: '#2d3250',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#AD81A7',
      main: '#6C5E82',
      dark: '#2E365A',
      contrastText: '#F8C19B',
    },
  },
});

export default function SignUpPage(){
    return(
    <Container maxWidth="100vw">
        <AppBar position="static" sx={{backgroundColor: theme.palette.primary.dark}}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                  mindjourney
                </Typography>
                <Button color="inherit" sx={{color: theme.palette.primary.contrastText}}>
                <Link href="/sign-in" passHref>
                    Login
                </Link>
                </Button>
            </Toolbar>
        </AppBar>


        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{textAlign: 'center', my: 4, gap: 15}}
            >
            <Typography variant="h4" component="h1" gutterBottom sx={{textAlign: 'center', gap: 15}}>
                Sign Up
            </Typography>
            <SignUp />
        </Box>
    </Container>
    );
}