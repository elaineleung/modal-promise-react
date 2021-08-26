import React from "react";
import "./styles.css";
import ConfirmContextProvider from "./ConfirmContextProvider";
import ConfirmModal from "./ConfirmModal";
import List from "./List";

export default function App() {
  return (
    <ConfirmContextProvider>
      <List />
      <ConfirmModal />
    </ConfirmContextProvider>
  );
}
