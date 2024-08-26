'use client'

import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn, SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { createTheme } from '@mui/material/styles';
import Image from "next/image";


const theme = createTheme({
    palette: {
      primary: {
        light: '#403838',
        main: '#181818',
        dark: '#0E0D0D',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#A559D2',
        main: '#7714B0',
        dark: '#5B0B89',
        contrastText: '#F6F4DC',
      },
    },
  });
  

export default function SignInPage(){
    return(
    <Container maxWidth="100vw">
        <AppBar maxWidth="100vw" position="static" sx={{backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText}}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    mindjourney
                </Typography>
                <Button color="inherit" sx={{color: theme.palette.primary.contrastText}}>
                <Link href="/login" passHref/>
                    Login
                </Button>
                <Button color="inherit" sx={{color: theme.palette.primary.contrastText}}>
                <Link href="/sign-up" passHref/>
                    Sign Up
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
                Sign In
            </Typography>
            <SignIn />
        </Box>
    </Container>
    );
}