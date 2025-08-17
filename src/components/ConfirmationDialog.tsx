import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface IConfirmationDialog {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
}: IConfirmationDialog) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">No</Button>
          </DialogClose>
          <Button onClick={onConfirm}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
