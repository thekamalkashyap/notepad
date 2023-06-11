"use client";
import { useContext, createContext } from "react";
import { useState } from "react";
import { useLocalStorage, useSetState } from "@mantine/hooks";

const NoteContext = createContext();

export const useNote = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [user, setUser] = useLocalStorage({
    key: "user",
    defaultValue: { firstName: "", lastName: "", email: "" },
  });
  const [state, setState] = useSetState({
    search: "",
    notes: [],
    completedNotes: 0,
    totalNotes: 0,
  });

  const rerender = () => {
    setForceUpdate((prev) => !prev);
  };
  const value = { forceUpdate, rerender, user, setUser, state, setState };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
