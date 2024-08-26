'use client';

import Head from "next/head";
import Image from "next/image";
import { SignedIn, SignedOut, isSignedIn, user, useUser, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid  } from "@mui/material";
import { createTheme } from '@mui/material/styles';

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

export default function Home() {
  const {isLoading, isSignedIn, user} = useUser()


  return (
    <Container maxWidth="100vw" style={{padding: 0}}>
    <AppBar position="static" sx={{backgroundColor: theme.palette.primary.main, color:theme.palette.primary.contrastText}}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', filter: 'invert(1)', mr: 1.25 }}>
              <Image src="/moon.svg" alt="logo" width="20" height="20" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" sx={{color:theme.palette.primary.contrastText}}>mindjourney</Typography>
            <Typography variant="h6" sx={{color:theme.palette.primary.contrastText, ml: 1}}>|</Typography>
            <Button color="inherit" href="features" sx={{color: theme.palette.primary.contrastText, textTransform: 'none'}} style={{zIndex: 10000}}>features</Button>
            <Button color="inherit" href="pricing" sx={{color: theme.palette.primary.contrastText, textTransform: 'none'}} style={{zIndex: 10000}}>pricing</Button>
          </Box>
          

          <SignedOut>
            <Button color="inherit" href="sign-in" sx={{color: theme.palette.primary.contrastText, textTransform: 'none'}} style={{zIndex: 10000}}> sign in</Button>
            <Button color="inherit" href="sign-up" sx={{color: theme.palette.primary.contrastText, textTransform: 'none'}} style={{zIndex: 10000}}> sign up</Button>
          </SignedOut>
          <SignedIn style={{zIndex: 10000}}>
            <UserButton style={{zIndex: 10000}}/>
          </SignedIn>
        </Toolbar>
      </AppBar>


      <Box sx={{backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, padding: 0, margin: 0}}>
        {/* <InfiniteMovingCards></InfiniteMovingCards> */}
      </Box>
    </Container>
  );
}
