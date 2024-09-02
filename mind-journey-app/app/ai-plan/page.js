'use client'

import * as React from 'react';
import { useState, useEffect, useRef } from 'react'

import '../other.css';

import { db } from '@/firebase'
import { doc, collection, setDoc, getDoc, writeBatch, memoryEagerGarbageCollector } from 'firebase/firestore'

import { Container, Grid, AppBar, Toolbar, Box, Button, Stack, Typography, TextField } from '@mui/material'
import { SignedIn, SignedOut, isSignedIn, user, useUser, UserButton } from "@clerk/nextjs";

import { createTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

import { Jost } from "next/font/google";
import Link from "next/link";
import Image from 'next/image';



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
        main: '#573F66',
        dark: '#3F1658',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#588DE2',
        main: '#3B68B0',
        dark: '#0B367C',
        contrastText: '#F6F4DC',
      },
    },
  });
const sendIcon = '/images/send.png';

const Card = ({
  title,
  icon,
  children,
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
 
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
 
      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};
 
const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};
 
export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default function Plan() {
  const { isLoading, isSignedIn, user } = useUser();
  const [membership, setMembership] = useState("Free")
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello, and welcome to mindjourney! I’m here to help you take steps towards a more peaceful and balanced mind. Whether you’re looking for a personalized mental health plan, guided meditation, or some relaxation techniques, I’ve got you covered. How can I assist you today?",
    },
  ])
  const [message, setMessage] = useState('')

  useEffect (() => {
    if (!user?.id) {
      return; // Exit early if user.id is not available
    }
  
    const checkMembership = async () => {
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);
      setMembership(docSnap.data().membershipStatus);
      console.log("Membership Status: ", membership);
    }
    
    checkMembership();
    }, [user, membership]);
  
     // Handle cases where user is not signed in or still loading
    if (isLoading) {
      return (
    <Typography variant="h5" my={50} sx={{position: "relative", textAlign: "center", alignContent: "center", alignItems: "center"}} color="white">
      <CircularProgress />
      Loading...
    </Typography>
    );
    }
  
    if (!isSignedIn) {
      return(
        <Container maxWidth="100vw" sx={{color:theme.palette.primary.contrastText}}>
  
          <AppBar position="static" sx={{backgroundColor: "#181818", color:theme.palette.primary.contrastText}}>
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
            <SignedIn>
              <UserButton />
            </SignedIn>
            </Toolbar> 
          </AppBar>
        <Typography variant="h5" my={50} sx={{position: "relative", textAlign: "center", alignContent: "center", alignItems: "center"}} color="white">
          You must be signed in and be a paid user to use this feature.
        </Typography>
        </Container>
      );
    }

  const sendMessage = async () => {
    if (!message.trim()) return;  // Don't send empty messages

    // Function to check if a string contains only ASCII characters
    const isAscii = (str) => /^[\x00-\x7F]*$/.test(str);

    // Check if the message contains only ASCII characters
    if (!isAscii(message)) {
      console.error('Error: Only ASCII characters are allowed.');
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "Error: Only ASCII characters are allowed." },
      ]);
      setMessage(''); //Clears the input field to get rid of non-ASCII characters
      return;
    }

    // Count the number of unique users
    const userRoles = messages.filter((msg) => msg.role === 'user');
    const uniqueUsers = new Set(userRoles.map((msg) => msg.userId)).size;
    

    // Check if there are already two users
    if (uniqueUsers >= 2) {
      console.error('Error: Only two users are allowed.');
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "Error: Only two users are allowed." },
      ]);
      return;
    }

    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/ai_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ])
    }
  }

  return (  
    <Container maxWidth="100vw" style={{padding: 0}} className={jost.className}>
        <AppBar position="sticky" sx={{backgroundColor: "#181818", color:theme.palette.primary.contrastText}}>
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


       
    <Box>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" sx={{color: theme.palette.primary.contrastText, margin: 10}} className={jost.className}>AI-Powered Mental Health Planning</Typography>

        <Stack
        sx = {{
          boxShadow: 3,
          borderRadius: 4,
          backgroundColor: theme.palette.primary.contrastText,
        }}
          direction={'column'}
          width="80vw"
          height="80vh"
          p={2}
          spacing={3}
        >
          <Stack
            // direction={'column'}
            // spacing={2}
            // flexGrow={1}
            // overflow="auto"
            // maxHeight="100%"
            className="scrollable"
            direction={'column'}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main
                  }
                  sx={{
                    borderRadius: 6,
                    color: theme.palette.secondary.contrastText,
                    
                  }}
                  color="white"
                  p={2}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <TextField
            sx={{
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.contrastText,
                borderRadius: 2,
            }}

            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    {/* <AccountCircle /> */}
                </InputAdornment>
                ),
            }}

            id="filled-basic" 
            variant="filled"
            label="Message Here"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                sendMessage();
                }
            }}
            
            />

            <Button 
               sx={{
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                color: theme.palette.primary.contrastText,
                fontSize: 25,
                borderRadius: 2,
              }}

              variant="contained" 
              onClick={sendMessage}
              
            >
              <Image src={sendIcon} alt="logo" width="20" height="20"/>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>


    <Box 
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h3" sx={{color: theme.palette.primary.contrastText, marginTop: "18vh"}} className={jost.className}>Daily Meditation and Practice Cards</Typography>

      <Grid>
        <Box
          width="80vw"
          height="80vh"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-white w-full gap-4 mx-auto px-8 rounded-md">
            <Card title="Sheetal is Nisha" icon={<AceternityIcon />}>
              <CanvasRevealEffect
                animationSpeed={2.5}
                containerClassName="bg-emerald-900"
                dotSize={1}
              />
            </Card>
            <Card title="Nisha is Munni" icon={<AceternityIcon />}>
              <CanvasRevealEffect
                animationSpeed={2.5}
                containerClassName="bg-zinc-900"
                colors={[
                  [236, 72, 153],
                  [232, 121, 249],
                ]}
                dotSize={2}
              />
              {/* Radial gradient for the cute fade */}
              <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
            </Card>
            <Card title="Munni is Aditi" icon={<AceternityIcon />}>
              <CanvasRevealEffect
                animationSpeed={2.5}
                containerClassName="bg-sky-600"
                colors={[[125, 211, 252]]}
                dotSize={3}
              />
            </Card>
          </div>
        </Box>
      </Grid>
    </Box>
    </Container>
  )
}