import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useCallback, useState, type ReactNode } from "react";
import { DialogContext, type OpenDialogProps } from "./DialogContext";

const DialogContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [dialogProps, setDialogProps] = useState<OpenDialogProps>({
    title: "",
    description: "",
    onClose: () => {},
    onConfirm: () => {},
  });

  const openDialogModal = useCallback((args: OpenDialogProps) => {
    setDialogProps(args);
    setShowConfirmationModal(true);
  }, []);

  const closeDialogModal = () => {
    dialogProps.onClose();
    setShowConfirmationModal(false);
  };

  const handleConfirm = () => {
    dialogProps.onConfirm();
    closeDialogModal();
  };

  return (
    <DialogContext.Provider
      value={{
        openDialogModal,
      }}
    >
      {children}
      <ConfirmationDialog
        {...dialogProps}
        open={showConfirmationModal}
        onClose={closeDialogModal}
        onConfirm={handleConfirm}
      />
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;
