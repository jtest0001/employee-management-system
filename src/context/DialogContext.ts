import { createContext } from "react";

export interface OpenDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const DialogContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openDialogModal: (_args: OpenDialogProps) => {},
});
