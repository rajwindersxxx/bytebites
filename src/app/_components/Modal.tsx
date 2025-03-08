// context/ModalContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

// Define Modal Context Type
interface ModalContextType {
  openModal: (
    content: ReactNode,
    modalName: string,
    modalData?: unknown,
  ) => void;
  closeModal: () => void;
  modalData: unknown;
}

// Create Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Provider
export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<unknown>(null);

  const openModal = (content: ReactNode, modalName: string, data?: unknown) => {
    setModalContent(content);
    setActiveModal(modalName);
    setModalData(data || null);
  };

  const closeModal = () => {
    setModalContent(null);
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalData }}>
      {children}
      {activeModal &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
            onClick={closeModal}
          >
            <div
              className="relative rounded-md bg-natural-beige p-4 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="absolute right-2 top-2" onClick={closeModal}>
                <MdClose className="h-6 w-6" />
              </button>
              {modalContent} {/* Render passed content here */}
            </div>
          </div>,
          document.body,
        )}
    </ModalContext.Provider>
  );
}

// Hook to use modal
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}
