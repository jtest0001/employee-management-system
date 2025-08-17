import z from "zod";

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(6, "Minimum 6 characters required for this field")
      .max(10, "Maximum 10 characters allowed for this field"),
    lastName: z
      .string()
      .min(6, "Minimum 6 characters required for this field")
      .max(10, "Maximum 10 characters allowed for this field"),
    email: z.email("Invalid email address"),
    phoneNumber: z
      .string()
      .regex(/^[89]\d{7}$/, "Phone number must be a valid Singapore number"),
    gender: z.string().refine((val) => !!val, {
      message: "Invalid gender",
    }),
    dateOfBirth: z
      .string("Invalid date")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date",
      }),
    joinedDate: z
      .string("Invalid date")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date",
      }),
  })
  .superRefine((data, ctx) => {
    const dob = new Date(data.dateOfBirth);
    const joined = new Date(data.joinedDate);

    if (joined <= dob) {
      ctx.addIssue({
        path: ["joinedDate"],
        code: "custom",
        message: "Joined date must be after date of birth",
      });
    }
  });

export type EmployeeFormData = z.infer<typeof formSchema>;

type BaseField = {
  name: keyof EmployeeFormData;
  label: string;
  type: "text" | "email" | "select" | "date";
};

type InputField = BaseField & {
  type: "text" | "email";
  placeholder: string;
  className?: string;
  inputProps?: {
    startAdornment?: string;
    className?: string;
  };
};

type SelectField = BaseField & {
  type: "select";
  options: {
    label: string;
    value: string;
  }[];
};

type DateField = BaseField & {
  type: "date";
};

export type EmployeeFormField = InputField | SelectField | DateField;

export const employeeFormFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
    type: "email",
    className: "col-span-2",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Phone Number",
    type: "text",
    inputProps: {
      startAdornment: "+65",
      className: "pl-12",
    },
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
    ],
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
  },
  {
    name: "joinedDate",
    label: "Joined Date",
    type: "date",
  },
] as const satisfies EmployeeFormField[];
