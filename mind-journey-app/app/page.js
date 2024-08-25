'use client';

import Head from "next/head";
import Image from "next/image";
import { SignedIn, SignedOut, isSignedIn, user, useUser, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid  } from "@mui/material";
import { createTheme } from '@mui/material/styles';

// import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";


const theme = createTheme({
  palette: {
    primary: {
      light: '#191E29',
      main: '#132D46',
      dark: '#01C38D',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#696E79',
      main: '#696E79',
      dark: '#696E79',
      contrastText: '#ffffff',
    },
  },
});

export default function Home() {
  const {isLoading, isSignedIn, user} = useUser()


  return (
    <Container maxWidth="100vw" style={{padding: 0}}>
    <AppBar position="static" sx={{backgroundColor: theme.palette.primary.dark, color:theme.palette.primary.contrastText}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}} sx={{color:theme.palette.primary.contrastText}}>mindjourney</Typography>
          <SignedOut>
            <Button color="inherit" href="sign-in" sx={{color: theme.palette.primary.light,}} style={{zIndex: 10000}}> Login</Button>
            <Button color="inherit" href="sign-up" sx={{color: theme.palette.primary.light}} style={{zIndex: 10000}}> Sign Up</Button>
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
