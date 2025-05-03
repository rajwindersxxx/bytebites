// context/ModalContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

// Define Modal Context Type with specific modal data type
interface ModalContextType {
  openModal: <T,>(
    content: ReactNode,
    modalName: string,
    modalData?: Record<string, T>
  ) => void;
  closeModal: () => void;
  modalData: unknown;
}

// Create Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Provider Component
export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<unknown>(null);

  const openModal = <T,>(content: ReactNode, modalName: string, data?: Record<string, T >) => {
    // Guard against opening multiple modals simultaneously
    if (activeModal) {
      return; // You can handle this case however you'd like, e.g., show a message or replace the existing modal.
    }

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="relative rounded-md  p-4 shadow-lg bg-natural-beige"
              onClick={(e) => e.stopPropagation()}
              role="document"
              aria-describedby="modal-description"
            >
              <button
                className="absolute right-2 top-2"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                <MdClose className="h-6 w-6" />
              </button>
              {modalContent}
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
}

// Hook to use modal context
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}
