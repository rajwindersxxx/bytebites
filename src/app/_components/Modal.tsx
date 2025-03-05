"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

// Define types
interface ModalContextType {
  activeModal: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

// Hook to use the modal context
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}

// 🎯 Reusable Modal Component
export function Modal({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const { activeModal, closeModal } = useModal();

  if (activeModal !== name) return null; // Only render if active

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      <div
        className="relative  rounded-md bg-natural-beige p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-4" onClick={closeModal}>
          <MdClose className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
