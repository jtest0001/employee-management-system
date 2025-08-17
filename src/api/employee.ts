import type { EmployeeFormData } from "@/components/EmployeeForm/constants";
import type { Employee } from "@/types";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getEmployees = async () => {
  try {
    const res = await axios.get<Employee[]>(`${url}/api/employees`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch employees");
  }
};

export const getEmployee = async (id: string) => {
  try {
    const res = await axios.get<Employee>(`${url}/api/employees/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch employee");
  }
};

export const addEmployee = async (employee: EmployeeFormData) => {
  try {
    await axios.post(`${url}/api/employees`, employee);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add employee");
  }
};

export const updateEmployee = async (employee: Employee) => {
  try {
    await axios.put(`${url}/api/employees/${employee.id}`, employee);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update employee");
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    await axios.delete(`${url}/api/employees/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete employee");
  }
};
