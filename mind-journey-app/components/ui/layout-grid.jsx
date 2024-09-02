"use client";;
import React, { useState, useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid, Card, Modal, TextField, Stack } from "@mui/material";
import {firestore} from '@/firebase';
import { getDocs, query, collection, setDoc, doc, getDoc, exists, deleteDoc } from "firebase/firestore";





export const LayoutGrid = ({
  cards, user, updatePromptList
}) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const [response, setResponse] = useState("");
  const [flag, setFlag] = useState(true);

  

  const handleClick = (card) => {
    if(card != selected)
    {
      setLastSelected(selected);
      setSelected(card);
      console.log("Card click handled: ", selected);
    }
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
    console.log("Outside click handled: ");
  };

  

  const submitPromptResponse = async(index) => {
    const userDocRef = doc(collection(firestore, 'users'), user.id)

    console.log("Final Response List: ", index)
    const colRef = collection(userDocRef, "submittedEntries")
    const docRef = doc(colRef, cards[index].title)
    await setDoc(docRef, {content: cards[index].content, response: response}, {merge: true})
  }

  const removePrompt = async(prompt) => {
    const docRef = doc(collection(firestore, "Entries"), prompt.name);
    const docSnap = await getDoc(docRef)

    if(docSnap.exists())
    {
      deleteDoc(docRef)
      updatePromptList()
    }
    
  }

  useEffect(() => {
    console.log("selected ID: ", selected?.id)
  }, [selected])

  return (
    (<div
      className="w-full h-full p-10 grid grid-cols-3 grid-rows-4 max-w-7xl mx-auto gap-4 relative" style={{backgroundColor: "transparent"}}>
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")} >
          <motion.div
            onClick={() => handleClick(card)}
            
            className={cn(card.className, "relative overflow-hidden", selected?.id === card.id
              ? "rounded-lg cursor-pointer absolute inset-0 h-3/4 w-full md:w-3/4 m-auto z-50 flex justify-center items-center flex-wrap flex-col" 
              : lastSelected?.id === card.id
              ? "z-40 bg-white rounded-xl h-full w-full"
              : "bg-white rounded-xl h-full w-full")}
            layoutId={`card-${card.id}`}>
            {selected?.id === card.id && <SelectedCard card={card} selected={selected} handleOutsideClick={handleOutsideClick}  response={response} setResponse={setResponse} submitPromptResponse={submitPromptResponse} removePrompt={removePrompt} index = {i} user={user}/>}
            <ImageComponent card={card} selected={selected}/>
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected ? 0.3 : 0 }} />
    </div>)
  );
};


// Memoize components and add display names
const ImageComponent = ({ card, selected }) => {
  return (
    <div className="h-full flex items-center justify-center">
      {selected?.id != card.id && <span className="absolute text-white z-10">{card.title}</span>}
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        height="500"
        width="500"
        style={{objectPosition: "center", boxShadow: "0px 0px 10px 8px #190725", transition: "transform .3s ease-in-out"}}
        onMouseEnter={(e) => selected == null ? (e.currentTarget.style.transform="scale(1.1)") : null} 
        onMouseLeave={(e) => selected == null ? (e.currentTarget.style.transform="scale(1)") : null}
        className={cn(
          "object-cover absolute inset-0 h-full w-full transition duration-200"
        )}
        
        alt="thumbnail"
      />
    </div>
  );
};


const SelectedCard = ({ card, selected, handleOutsideClick, response, setResponse, submitPromptResponse, removePrompt, index, user}) => {

  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        style={{ height: "100%", display: "flex", justifyContent: "center", marginTop: 35 }}
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        <div style={{width: "100%"}}>
            <p className="font-bold md:text-4xl text-xl text-white">
              {card.title}
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              {card.content}
            </p>
            <TextField
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            variant="filled"
            sx={{ bgcolor: "white", zIndex: 10000 }}
            label="Enter response"
            fullWidth
            multiline
            rows={8}
          />
          <Stack direction="row" justifyContent={"space-between"}>
            <Button variant="contained" sx={{mt: 3}} onClick={() => {submitPromptResponse(index); setResponse(""); handleOutsideClick();}}>Submit</Button>
            {card.user == user.id && <Button variant="contained" sx={{mt: 3}} onClick={() => {removePrompt(card.prompt); handleOutsideClick()}}>Remove</Button>}
            
          </Stack>
        </div>
      </motion.div>
    </div>
  );
};

