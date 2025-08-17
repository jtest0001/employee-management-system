import { Card } from "@/components/ui/card";
import EmployeeForm from "@/components/EmployeeForm";
import type { EmployeeFormData } from "@/components/EmployeeForm/constants";
import { useGetEmployee, useUpdateEmployee } from "@/hooks/useEmployees";
import { Link, useParams } from "react-router";
import { UserRoundPen, X } from "lucide-react";
import FetchErrorCard from "@/components/FetchErrorCard";
import * as motion from "motion/react-client";

const EditEmployee = () => {
  const params = useParams();
  const {
    data: employee,
    isLoading,
    isError,
    refetch,
  } = useGetEmployee(params.employeeId!);
  const { mutateAsync } = useUpdateEmployee();

  if (isLoading) return null;
  if (isError) return <FetchErrorCard handleRefetch={() => refetch()} />;

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await mutateAsync({
        ...employee!,
        ...data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="m-auto max-w-2xl py-4">
        <div className="flex items-center justify-between border-b px-4 pb-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <UserRoundPen className="size-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold">Edit Employee</h3>
              <span className="text-xs text-neutral-500">
                Update employee information
              </span>
            </div>
          </div>
          <Link to="/">
            <X />
          </Link>
        </div>
        <EmployeeForm onSubmit={onSubmit} employee={employee} />
      </Card>
    </motion.div>
  );
};

export default EditEmployee;
