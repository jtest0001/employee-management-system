import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { Link, useBlocker, type BlockerFunction } from "react-router";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import {
  employeeFormFields,
  formSchema,
  type EmployeeFormData,
  type EmployeeFormField,
} from "./constants";
import DatePickerFormField from "./DatePickerFormField";
import InputFormField from "./InputFormField";
import SelectFormField from "./SelectFormField";
import { useCallback, useContext, useEffect } from "react";
import type { Employee } from "@/types";
import { DialogContext } from "@/context/DialogContext";

function getComponent<T extends EmployeeFormField>(field: T) {
  switch (field.type) {
    case "select":
      return SelectFormField as unknown as React.ComponentType<
        T & { control: Control<EmployeeFormData> }
      >;
    case "date":
      return DatePickerFormField as unknown as React.ComponentType<
        T & { control: Control<EmployeeFormData> }
      >;
    case "text":
    case "email":
    default:
      return InputFormField as unknown as React.ComponentType<
        T & { control: Control<EmployeeFormData> }
      >;
  }
}

interface IEmployeeForm {
  onSubmit: (values: EmployeeFormData) => Promise<void>;
  employee?: Employee;
}

const EmployeeForm = (props: IEmployeeForm) => {
  const { onSubmit, employee } = props;
  const { openDialogModal } = useContext(DialogContext);

  const defaultValues = {
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    phoneNumber: employee?.phoneNumber || "",
    gender: employee?.gender || "",
    dateOfBirth: employee?.dateOfBirth || "",
    joinedDate: employee?.joinedDate || "",
  };

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Navigation blocker when form is dirty
  const formIsDirty = form.formState.isDirty;
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      if (currentLocation.pathname === nextLocation.pathname) return false;

      if (formIsDirty) {
        return true;
      }

      return false;
    },
    [formIsDirty],
  );
  const blocker = useBlocker(shouldBlock);

  const handleFormSubmit = async (data: EmployeeFormData) => {
    await onSubmit(data);

    if (employee) {
      form.reset(data);
    } else {
      form.reset();
    }
  };

  // Navigation blocker effect
  useEffect(() => {
    if (blocker.state !== "blocked") return;

    openDialogModal({
      title: "Unsaved Changes",
      description:
        "Form has been modified. You will lose your unsaved changes. Are you sure you want to close this form?",
      onConfirm: blocker.proceed,
      onClose: blocker.reset,
    });
  }, [blocker, openDialogModal]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-8 px-4"
      >
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-6">
          {employeeFormFields.map((field) => {
            const Component = getComponent(field);
            return (
              <Component key={field.name} {...field} control={form.control} />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link to="/">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button disabled={!formIsDirty}>Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;
