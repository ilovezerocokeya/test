"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";
import Modal from "react-modal";

interface ModalContextType {
  openModal: (content: ReactNode, disablePage?: boolean) => void;
  closeModal: () => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disablePage, setDisablePage] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const openModal = (content: ReactNode, disable: boolean = false) => {
    setModalContent(content);
    setIsModalOpen(true);
    setDisablePage(disable);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setDisablePage(false);
  };

  useEffect(() => {
    if (disablePage) {
      document.body.classList.add("page-disabled");
    } else {
      document.body.classList.remove("page-disabled");
    }
    return () => {
      document.body.classList.remove("page-disabled");
    };
  }, [disablePage]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isModalOpen && (
        <>
          {disablePage && <div className="modal-background" onClick={closeModal} />}
          <div className="modal-content">{modalContent}</div>
        </>
      )}
    </ModalContext.Provider>
  );
};

export default ContextProvider;
