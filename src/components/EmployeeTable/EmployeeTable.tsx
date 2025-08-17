import React from "react";
import EmployeeActionButtons from "./EmployeeActionButtons";
import DataTable from "../DataTable";
import type { Employee } from "@/types";

interface EmployeeColumn {
  key: keyof Employee | "actions";
  header: string;
  render?: (id: string) => React.ReactNode;
  className: string;
}

interface IEmployeeTable {
  employees: Employee[];
}

const EmployeeTable = (props: IEmployeeTable) => {
  const { employees } = props;
  const employeeColumns: EmployeeColumn[] = [
    { key: "firstName", header: "First Name", className: "w-[12%]" },
    { key: "lastName", header: "Last Name", className: "w-[12%]" },
    { key: "email", header: "Email", className: "w-[26%]" },
    { key: "phoneNumber", header: "Phone Number", className: "w-[12%]" },
    { key: "gender", header: "Gender", className: "w-[8%]" },
    { key: "dateOfBirth", header: "Date of Birth", className: "w-[12%]" },
    { key: "joinedDate", header: "Joined Date", className: "w-[12%]" },
    {
      key: "actions",
      header: "Actions",
      className: "w-[6%]",
      render: (employeeId: string) => (
        <EmployeeActionButtons employeeId={employeeId} />
      ),
    },
  ];

  return <DataTable columns={employeeColumns} data={employees} />;
};

export default EmployeeTable;
