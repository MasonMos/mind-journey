"use client";

import "../globals.css";

import Image from "next/image";
import { format } from "date-fns";
import { SignedIn, SignedOut, useUser, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { IoTrash } from "react-icons/io5";
import Divider from "@mui/material/Divider";
import { createTheme } from "@mui/material/styles";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "@/firebase";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

import { Jost } from "next/font/google";
import Link from "next/link";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const theme = createTheme({
  typography: {
    fontFamily: "Jost !important",
    fontWeightLight: 100,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 500,
  },
  palette: {
    primary: {
      light: "#403838",
      main: "#181818",
      dark: "#0E0D0D",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#A559D2",
      main: "#7714B0",
      dark: "#5B0B89",
      contrastText: "#F6F4DC",
    },
  },
});

export default function Home() {
  const { isLoading, isSignedIn, user } = useUser();
  const [title, setTitle] = useState("");
  const [journalEntries, setJournalEntries] = useState("");
  const [entries, setEntries] = useState([]);

  // Create new journal entry
  const createJournalEntry = async () => {
    const docUserRef = doc(db, "users", user.id);
    const journalEntriesRef = collection(docUserRef, "journal-entries");
    if (!user) {
      alert("You must be signed in to create a journal entry.");
      return;
    }

    const userId = user.id || user.uid;

    try {
      const timestamp = Timestamp.now();
      await addDoc(journalEntriesRef, {
        title: title,
        content: journalEntries,
        createdAt: timestamp,
      });
      getJournalEntries();
    } catch (e) {
      alert("Error adding document: ", e);
    }
  };

  // Fetch all journal entries
  const getJournalEntries = async () => {
    const individualquery = query(
      collection(db, "users", user.id, "journal-entries")
    );
    const individualQuerySnapshot = await getDocs(individualquery);
    const feedQuery = query(
      collection(db, "users", user.id, "submittedEntries")
    );
    const feedQuerySnapshot = await getDocs(feedQuery);
    const entriesArray = [];
    feedQuerySnapshot.forEach((doc) => {
      entriesArray.push({ id: doc.id, ...doc.data() });
    });
    individualQuerySnapshot.forEach((doc) => {
      entriesArray.push({ id: doc.id, ...doc.data() });
    });
    setEntries(entriesArray);
  };

  const deleteJournalEntry = async (entryId) => {
    if (!user) return;
    const userId = user.id || user.uid;

    const docUserRef = doc(db, "users", userId, "journal-entries", entryId);
    const docFeedRef = doc(db, "users", userId, "submittedEntries", entryId);

    try {
      await deleteDoc(docUserRef);
      await deleteDoc(docFeedRef);
      //alert("Journal entry deleted successfully.");

      // Refresh entries after deletion
      getJournalEntries(userId);
    } catch (e) {
      console.error("Error deleting document: ", e);
      alert("Error deleting journal entry.");
    }
  };

  useEffect(() => {
    if (user) {
      const userId = user.id || user.uid;
      getJournalEntries(userId);
    }
  }, [user]);

  return (
    <Container
      maxWidth="100vw"
      style={{ padding: 0 }}
      className={jost.className}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              filter: "invert(1)",
              mr: 1.25,
            }}
          >
            <Image src="/moon.svg" alt="logo" width="20" height="20" />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightBold,
                mr: 2,
              }}
            >
              mindjourney
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightLight,
                ml: 1,
                mr: 2,
              }}
            >
              |
            </Typography>
            <Button
              color="inherit"
              href="/features"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "none",
              }}
            >
              features
            </Button>
            <Button
              color="inherit"
              href="/pricing"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "none",
              }}
            >
              pricing
            </Button>
            <Button
              color="inherit"
              href="/contact"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
                textTransform: "none",
              }}
            >
              contact
            </Button>
          </Box>

          <SignedOut>
            <Button
              color="inherit"
              href="/sign-in"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
              }}
            >
              sign in
            </Button>
            <Button
              color="inherit"
              href="/sign-up"
              sx={{
                color: theme.palette.primary.contrastText,
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightRegular,
              }}
            >
              sign up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}
        mt={2}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontFamily: jost.style.fontFamily,
            fontWeight: theme.typography.fontWeightBold,
            mb: 2,
          }}
        >
          Create a new journal entry
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          sx={{
            width: "100%",
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // White outline
              },
              "&:hover fieldset": {
                borderColor: "white", // White outline on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // White outline when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "white", // White label
              fontFamily: jost.style.fontFamily,
              fontWeight: theme.typography.fontWeightBold,
            },
            "& .MuiInputBase-input": {
              color: "white", // White text inside the input
              fontFamily: jost.style.fontFamily,
              fontWeight: theme.typography.fontWeightBold,
            },
          }}
          InputLabelProps={{
            style: { color: "white" }, // White label color when focused
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Journal Entry"
          variant="outlined"
          multiline
          rows={6}
          sx={{
            width: "100%",
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // White outline
              },
              "&:hover fieldset": {
                borderColor: "white", // White outline on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // White outline when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "white", // White label
              fontFamily: jost.style.fontFamily,
              fontWeight: theme.typography.fontWeightLight,
            },
            "& .MuiInputBase-input": {
              color: "white", // White text inside the input
              fontFamily: jost.style.fontFamily,
              fontWeight: theme.typography.fontWeightLight,
            },
          }}
          InputLabelProps={{
            style: { color: "white" }, // White label color when focused
          }}
          value={journalEntries}
          onChange={(e) => setJournalEntries(e.target.value)}
        />
        <HoverBorderGradient
          variant="contained"
          color="secondary"
          sx={{ width: "100%" }}
          onClick={createJournalEntry}
        >
          Save Journal Entry
        </HoverBorderGradient>

        <Box mt={4} width="100%">
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontFamily: jost.style.fontFamily,
              fontWeight: theme.typography.fontWeightBold,
              mb: 2,
            }}
          >
            Your Journal Entries
          </Typography>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <Paper
                key={entry.id}
                elevation={3}
                sx={{
                  p: 2,
                  mb: 2,
                  position: "relative",
                  backgroundColor: theme.palette.primary.light,
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontFamily: jost.style.fontFamily,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  {entry.title}
                </Typography>

                {entry.authorResponse ? (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: jost.style.fontFamily,
                      fontWeight: theme.typography.fontWeightRegular,
                      color: "white",
                    }}
                  >
                    {entry.authorResponse}
                  </Typography>
                ) : null}

                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontFamily: jost.style.fontFamily,
                    fontWeight: theme.typography.fontWeightLight,
                    whiteSpace: "pre-line",
                  }}
                >
                  {entry.content}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    fontFamily: jost.style.fontFamily,
                    fontWeight: theme.typography.fontWeightLight,
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                  }}
                >
                  {entry.createdAt
                    ? format(entry.createdAt.toDate(), "MMMM dd, yyyy HH:mm")
                    : "No timestamp available"}
                </Typography>
                <IconButton
                  aria-label="delete"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => deleteJournalEntry(entry.id)}
                >
                  <IoTrash color="white" />
                </IconButton>
              </Paper>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontFamily: jost.style.fontFamily,
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              No journal entries found.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
