'use client';

import "../other.css";

import Head from "next/head";
import Image from "next/image";
import { SignedIn, SignedOut, isSignedIn, user, useUser, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid, Card } from "@mui/material";
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { BackgroundGradient } from "@/components/ui/background-gradient";
// import { IconAppWindow } from "@tabler/icons-react";


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
      <AppBar position="sticky" sx={{backgroundColor: theme.palette.primary.main, color:theme.palette.primary.contrastText}}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', filter: 'invert(1)', mr: 1.25 }}>
              <Image src="/moon.svg" alt="logo" width="20" height="20" />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link variant="h6" href="/" sx={{color:theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightBold, mr: 2 }}>mindjourney</Link>
            <Typography variant="h6" sx={{color:theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightLight, ml: 1, mr: 2 }}>|</Typography>
            <Button color="inherit" href="features" sx={{color: theme.palette.primary.contrastText,fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}>features</Button>
            <Button color="inherit" href="pricing" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}>pricing</Button>
            <Button color="inherit" href="contact" sx={{color: theme.palette.primary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightRegular, textTransform: 'none'}} style={{zIndex: 10000}}>contact</Button>

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

      <Box sx={{color: theme.palette.primary.contrastText, padding: 0, margin: 0}}>
          <Typography variant="h2" sx={{postion: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: 10}}>Pricing Options</Typography>
      </Box>
        

        {/* pricing cards */}
        <Grid container sx={{display: 'flex', alignItems: 'center', alignContent: "center", textAlign: "center", justifyContent: "center"}}>
          <Grid item margin={10} spacing={10} gap={10} mr={10} ml={10} sx={{display: 'flex', alignItems: 'center', alignContent: "center", textAlign: "center"}}>
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <Image
              src={`/moonpriceone.webp`}
              alt="moon-one"
              height="400"
              width="400"
              className="object-contain"
            />
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              Basic <br />
            </p>
    
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Access to introductory mental health resources. <br />
                Limited AI-guided self-help tools. <br />
                Community support through forums. <br />
            </p>
            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <span>Buy now </span>
              <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                Free
              </span>
            </button>

          </BackgroundGradient>
          </Grid>

          <Grid item margin={10} spacing={10} gap={10} mr={10} ml={10} sx={{display: 'flex', alignItems: 'center', alignContent: "center", textAlign: "center"}}>
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <Image
              src={`/moonpricetwo.webp`}
              alt="moon-two"
              height="400"
              width="400"
              className="object-contain"
            />
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              Enhanced<br />
            </p>
    
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Everything in Basic Support. <br />
            Personalized AI mental health assessments. <br />
            Access to guided meditation and relaxation techniques. <br />
            Monthly progress tracking and reports. <br />
            </p>
            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <span>Buy now </span>
              <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                5$
              </span>
            </button>

          </BackgroundGradient>
          </Grid>


          <Grid item margin={10} spacing={10} gap={10} mr={10} ml={10} sx={{display: 'flex', alignItems: 'center', alignContent: "center", textAlign: "center"}}>
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <Image
              src={`/moonpricethree.webp`}
              alt="moon-three"
              height="400"
              width="400"
              className="object-contain"
            />
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              Premium <br />
            </p>
    
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Everything in Enhanced Care. 24/7 access to AI-driven emotional support. <br />
              Customized mental health plans tailored to your needs. <br />
              Exclusive content and workshops from mental health professionals. <br />
            </p>
            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <span>Buy now </span>
              <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                10$
              </span>
            </button>

          </BackgroundGradient>
          </Grid>
        </Grid>

      

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                margin: '0 auto', // This centers the Box horizontally
                width: '50vw', // Adjust this for responsiveness; 50vw makes it 50% of the viewport width
                maxWidth: '800px', // Optional: Set a max-width for better readability on larger screens
                textAlign: 'center',
                color: theme.palette.primary.contrastText,
                
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontFamily: jost.style.fontFamily,
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.primary.contrastText,
                    textAlign: 'center',
                    position: 'flex',
                }}
            >
              Terms and Conditions for Mindjorney Memberships
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 8 }}>
                Effective Date: [8/26/2024]
            </Typography>

            <Typography variant="subtitle1" sx={{ margin: 1 }}>
                1. Introduction
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Welcome to Mindjorney! By subscribing to our membership plans, you agree to these terms and conditions. Please read them carefully.
            </Typography>

            <Typography variant="subtitle1" sx={{ margin: 1 }}>
                2. Membership Plans
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                - We offer different membership plans, each with its own features and benefits. Memberships are billed on a monthly basis, with the option to upgrade or downgrade at any time.
            </Typography>

            <Typography variant="subtitle1" sx={{ margin: 1 }}>
                3. Billing and Payments
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                - Payments for membership plans are processed through our secure payment gateway. Your membership will automatically renew each month unless you cancel it. If payment is unsuccessful, your membership will be suspended until payment is received.
            </Typography>

            <Typography variant="subtitle1" sx={{ margin: 1 }}>
                4. Cancellations and Refunds
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                - You can cancel your membership at any time through your account settings. Upon cancellation, your membership benefits will continue until the end of the current billing cycle. We do not offer refunds for partial months.
            </Typography>

            <Typography variant="subtitle1" sx={{ margin: 1 }}>
                5. Use of Services
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                - Our services are for personal use only. Sharing accounts or access with others is not allowed. You agree to use Mindjorney responsibly and in accordance with all applicable laws and regulations.
            </Typography>

            <Typography variant="subtitle1" sx={{ margin: 1 }}>
                6. Privacy
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                - We are committed to protecting your privacy. Please review our Privacy Policy to understand how we handle your personal information.
            </Typography>

            <Typography variant="subtitle1" sx={{ margin: 1 }}>
                7. Changes to Terms
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                - We may update these terms and conditions from time to time. Changes will be effective immediately upon posting on our website. By continuing to use our services after changes are made, you agree to the revised terms.
            </Typography>

            <Typography variant="subtitle1" sx={{ margin: 1 }}>
                8. Contact Us
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 25 }}>
                - If you have any questions or concerns about these terms and conditions, please contact us at [insert contact email].
            </Typography>
        </Box>

      {/* need to work on foot to match the styling on figma */}
      <footer>
        <Divider variant="middle" sx={{ backgroundColor: 'white' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', color: theme.palette.secondary.contrastText }}>
          
          {/* Logo Section */}
          <Box sx={{ display: 'column', alignItems: 'center', filter: 'invert(1)', mr:"2" }} margin={10}> 
            <Image src="/moon.svg" alt="logo" width="20" height="20" sx={{mr:"2"}} />
            <Typography variant="h6" sx={{fontFamily: jost.style.fontFamily, fontWeight: theme.typography.fontWeightBold, mr: 2, filter: "invert(1)" }}>mindjourney</Typography>

            {/* Description Section */}
            <Box marginBottom={2}>
              <Typography variant="body1" sx={{ fontFamily: jost.style.fontFamily, fontWeight: 'regular', textAlign: 'center', color: "black" }}>
                formed by a group of college kids trying to make it through life
              </Typography>
            </Box>

            {/* Social Links Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', filter: "invert(1)" }}>
              {[
                { name: ' ryan tran', url: 'https://www.linkedin.com/in/ryantren/' },
                { name: ' mason moses', url: 'https://www.linkedin.com/in/mason-moses/' },
                { name: ' jeremiah dawson', url: 'https://www.linkedin.com/in/jeremiah-dawson-2644982a2/' },
                { name: ' nabit karowadia', url: 'https://www.linkedin.com/in/nabit-karowadia-848376224/' }
              ].map(link => (
                <Link key={link.name} color="inherit" href={link.url} sx={{color: theme.palette.secondary.contrastText, fontFamily: jost.style.fontFamily, fontWeight: 'light', textTransform: 'none', marginBottom: 1, display: 'flex', alignItems: 'center' }}>
                  <Image src="/linkedin.svg" alt="logo" width="18" height="18" style={{ marginRight: '8px', filter: "invert(1)" }} />
                  {link.name}
                </Link>
              ))}
            </Box>
          </Box>
          
          {/* Navigation Links Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: 10, gap: 2 }}>
            {[
              { name: 'features', path: 'http://localhost:3000/features' },
              { name: 'pricing', path: 'http://localhost:3000/pricing' },
              { name: 'github', path: 'https://github.com/MasonMos/mind-journey' },
              { name: 'contact', path: 'http://localhost:3000/contact' }
            ].map(link => (
              <Link key={link.name} color="inherit" href={link.path} sx={{ color: 'white', fontFamily: jost.style.fontFamily, fontWeight: 'light', textTransform: 'none', marginBottom: 1, }}>
                {link.name}
              </Link>
            ))}
          </Box>
        </Box>
      </footer>

    </Container>
  );
}
