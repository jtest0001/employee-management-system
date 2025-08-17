import { DialogContext } from "@/context/DialogContext";
import { useDeleteEmployee } from "@/hooks/useEmployees";
import { SquarePen, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";

interface IEmployeeActionButtons {
  employeeId: string;
}

const EmployeeActionButtons = (props: IEmployeeActionButtons) => {
  const { employeeId } = props;
  const { openDialogModal } = useContext(DialogContext);
  const [employeeToBeDeleted, setEmployeeToBeDeleted] = useState("");
  const { mutate } = useDeleteEmployee();

  const handleDeleteClick = () => {
    setEmployeeToBeDeleted(employeeId);
  };

  // Delete employee confirmation logic
  useEffect(() => {
    if (!employeeToBeDeleted) return;

    const handleOnCloseDialog = () => {
      setEmployeeToBeDeleted("");
    };

    const handleDeleteEmployee = () => {
      mutate(employeeToBeDeleted);
      handleOnCloseDialog();
    };

    openDialogModal({
      title: "Are you sure you want to delete this employee?",
      description:
        "Employee data will be permanently removed from the system. This action cannot be reversed.",
      onConfirm: handleDeleteEmployee,
      onClose: handleOnCloseDialog,
    });
  }, [employeeToBeDeleted, openDialogModal, mutate]);

  return (
    <div className="flex gap-2">
      <Link to={`/employee/edit/${employeeId}`}>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          data-testid={`edit-${employeeId}`}
        >
          <SquarePen />
        </Button>
      </Link>

      <Button
        onClick={handleDeleteClick}
        variant="destructive"
        size="icon"
        className="size-8"
        data-testid={`delete-${employeeId}`}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default EmployeeActionButtons;
