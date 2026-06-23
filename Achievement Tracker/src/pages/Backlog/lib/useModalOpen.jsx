import { useState } from "react";

export function useModalOpen() {
  const [modalOpen, setModalOpen] = useState(false);
  return {
    modalOpen: modalOpen,
    setModalOpen: setModalOpen,
  };
}
