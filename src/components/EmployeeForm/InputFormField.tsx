import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type { EmployeeFormData } from "./constants";

interface IInputFormField {
  name: keyof EmployeeFormData;
  placeholder?: string;
  label: string;
  control: Control<EmployeeFormData>;
  type: string;
  className?: string;
  inputProps?: {
    startAdornment?: string;
    className?: string;
  };
}

const InputFormField = (props: IInputFormField) => {
  const { name, control, placeholder, label, type, className, inputProps } =
    props;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...inputProps}
              {...field}
              value={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFormField;
