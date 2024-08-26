'use client';

import Head from "next/head";
import Image from "next/image";
import { SignedIn, SignedOut, isSignedIn, user, useUser, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid  } from "@mui/material";
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';

import { Jost } from "next/font/google";
import Link from "next/link";

const jost = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const theme = createTheme({
  typography: {
    fontFamily: 'Jost !important',
    fontWeightLight: 100, 
    fontWeightRegular: 300, 
    fontWeightMedium: 400, 
    fontWeightBold: 500, 
  },
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
    <Container maxWidth="100vw" style={{padding: 0}} className={jost.className}>
      <AppBar position="static" sx={{backgroundColor: theme.palette.primary.main, color:theme.palette.primary.contrastText}}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', filter: 'invert(1)', mr: 1.25 }}>
              <Image src="/moon.svg" alt="logo" width="20" height="20" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" sx={{color:theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightBold, mr: 2 }}>mindjourney</Typography>
            <Typography variant="h6" sx={{color:theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, ml: 1, mr: 2 }}>|</Typography>
            <Button color="inherit" href="features" sx={{color: theme.palette.primary.contrastText,fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}>features</Button>
            <Button color="inherit" href="pricing" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}>pricing</Button>
          </Box>
          

          <SignedOut>
            <Button color="inherit" href="sign-in" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}> sign in</Button>
            <Button color="inherit" href="sign-up" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}> sign up</Button>
          </SignedOut>
          <SignedIn style={{zIndex: 10000}}>
            <UserButton style={{zIndex: 10000}}/>
          </SignedIn>
        </Toolbar>
      </AppBar>


      <Grid margin={10}>
        <Button>Introducing New AI Technology</Button>
        <Box sx={{backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, padding: 0, margin: 0}}>
          <Typography variant="h2">Make life changing difference with your health</Typography>
          <Typography variant="h7">Our AI - Driven mental health support is here to provide a lifeline, offering understanding, compassion, and guidance when you need it most.</Typography>
        </Box>

        <Button href="/features">Browse Features</Button>
        <Button href="/pricing">Pricing Plans</Button>
      </Grid>


      {/* need to work on foot to match the styling on figma */}
      <footer>
        <Divider variant="middle" color="white" />
          <Box sx={{ display: 'flex', alignItems: 'center', filter: 'invert(1)', mr:"2" }} margin={10}> 
            <Image src="/moon.svg" alt="logo" width="20" height="20" sx={{mr:"2"}} />
            <Typography variant="h6" sx={{fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightBold, mr: 2 }}>mindjourney</Typography>
          </Box>


          <Box sx={{ display: 'flex', alignItems: 'center', filter: 'invert(1)', mr: 1.25 }} margin={10}>
            <Grid>
              <Typography variant="h6" sx={{fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, ml: 1, mr: 2 }}>formed by a group of college kids trying to make it through life</Typography>

              <Link color="inherit" href="https://www.linkedin.com/in/ryantren/" sx={{color: theme.palette.primary.contrastText,fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, textTransform: 'none'}} style={{zIndex: 10000}}>
                <Image src="/linkedin.svg" alt="logo" width="20" height="20" mr="2" />
                ryan tran
              </Link>

              <Link color="inherit" href="https://www.linkedin.com/in/mason-moses/" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, textTransform: 'none'}} style={{zIndex: 10000}}>
                <Image src="/linkedin.svg" alt="logo" width="20" height="20" mr="2" />
                mason moses
              </Link>

              <Link color="inherit" href="https://www.linkedin.com/in/jeremiah-dawson-2644982a2/" sx={{color: theme.palette.primary.contrastText,fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, textTransform: 'none'}} style={{zIndex: 10000}}>
                <Image src="/linkedin.svg" alt="logo" width="20" height="20" mr="2" />
                jeremiah dawson
              </Link>

              <Link color="inherit" href="https://www.linkedin.com/in/nabit-karowadia-848376224/" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, textTransform: 'none'}} style={{zIndex: 10000}}>
                <Image src="/linkedin.svg" alt="logo" width="20" height="20" mr="2" />
                nabit karowadia
              </Link>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', filter: 'invert(1)', mr: 1.25 }} margin={10}>
            <Grid>
              <Link color="inherit" href="/features" sx={{color: theme.palette.primary.contrastText,fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, textTransform: 'none'}} style={{zIndex: 10000}}>features</Link>

              <Link color="inherit" href="/pricing" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, textTransform: 'none'}} style={{zIndex: 10000}}>pricing</Link>

              <Link color="inherit" href="https://github.com/MasonMos/mind-journey" sx={{color: theme.palette.primary.contrastText,fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, textTransform: 'none'}} style={{zIndex: 10000}}>github</Link>

              <Link color="inherit" href="/contact" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, textTransform: 'none'}} style={{zIndex: 10000}}>contact</Link>
            </Grid>
          </Box>
      </footer>
    </Container>
  );
}
