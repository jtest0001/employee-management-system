import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "@/api/employee";
import queryClient from "@/api/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetEmployees = () => {
  return useQuery({ queryKey: ["employees"], queryFn: getEmployees });
};

export const useGetEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => getEmployee(id),
  });
};

export const useAddEmployee = () => {
  return useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"], exact: true });
      toast.success("Successfully added employee");
    },
  });
};

export const useUpdateEmployee = () => {
  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: (_, employee) => {
      // Invalidate list query cache
      queryClient.invalidateQueries({ queryKey: ["employees"], exact: true });
      // Update the single employee query
      queryClient.setQueryData(["employees", employee.id], employee);
      toast.success("Successfully updated employee");
    },
  });
};

export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"], exact: true });
      toast.success("Successfully deleted employee");
    },
  });
};
