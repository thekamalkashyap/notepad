"use client";
import { useSetState } from "@mantine/hooks";
import { useContext, createContext } from "react";
import { useState } from "react";
const NoteContext = createContext();

export const useNote = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [user, setUser] = useSetState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const rerender = () => {
    setForceUpdate((prev) => !prev);
  };
  const value = {
    forceUpdate,
    rerender,
    user,
    setUser,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
