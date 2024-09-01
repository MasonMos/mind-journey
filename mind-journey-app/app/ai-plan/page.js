'use client'

import * as React from 'react';
import { useState, useEffect, useRef } from 'react'

import '../other.css';

import { Container, Grid, AppBar, Toolbar, Box, Button, Stack, Typography, TextField } from '@mui/material'
import { SignedIn, SignedOut, isSignedIn, user, useUser, UserButton } from "@clerk/nextjs";

import { createTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

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

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello, and welcome to mindjourney! I’m here to help you take steps towards a more peaceful and balanced mind. Whether you’re looking for a personalized mental health plan, guided meditation, or some relaxation techniques, I’ve got you covered. How can I assist you today?",
    },
  ])
  const [message, setMessage] = useState('')

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

      // // Added conditional responses based on user input
      if (message.toLowerCase().includes('membership') || message.toLowerCase().includes('pricing')) {
        setMessages((messages) => [
          ...messages,
          {
            role: 'assistant',
            content: `Here are the membership options available on our platform:
    
          1. **Basic Membership** - $0/month
            - Access to basic features
            - Email support
            - Monthly newsletters
            - Access to basic event planning
          
          2. Premium Membership - $15/month
            - Access to all features
            - Priority email support
            - Weekly newsletters
            - Access to exclusive event planning
          
          3. VIP Membership - $35/month
            - Access to all features
            - 24/7 priority support
            - Daily newsletters
            - Access to exclusive content
            - Personalized event planning assistance with locations, activities, and more
          
          If you have any further questions or need assistance with something else, feel free to ask!`,
          },
        ]);
      }

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
       
    <Box>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* <h1 sx={{bgcolor:theme.palette.primary.main, color:theme.palette.primary.light}}color='theme.palette.primary.light' spacing={3} gap={3}>Chat with us in real time!</h1> */}

        <Stack
        sx = {{
          boxShadow: 3,
          borderRadius: 4,
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
    </Container>
  )
}