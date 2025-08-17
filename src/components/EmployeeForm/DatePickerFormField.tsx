import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Control } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { EmployeeFormData } from "./constants";
import { useState } from "react";

interface IDatePickerFormField {
  name: keyof EmployeeFormData;
  label: string;
  control: Control<EmployeeFormData>;
}

const DatePickerFormField = (props: IDatePickerFormField) => {
  const { name, control, label } = props;
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-transparent pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? field.value : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(field.value)}
                onSelect={(date) => {
                  const dateString = format(date!, "yyyy-MM-dd");
                  field.onChange(dateString);
                  setOpen(false);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePickerFormField;
