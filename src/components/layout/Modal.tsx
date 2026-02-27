"use client";

import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "../ui/button";

type ModalProps = {
  trigger: ReactNode;
  children: (close: () => void) => ReactNode;
};

const Modal = ({ trigger, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-chart-2 hover:bg-chart-3"
      >
        {trigger}
      </Button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={close}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 w-full max-w-lg p-4"
                >
                  {children(close)}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default Modal;
