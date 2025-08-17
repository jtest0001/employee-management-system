import EmployeeForm from "@/components/EmployeeForm";
import type { EmployeeFormData } from "@/components/EmployeeForm/constants";
import { Card } from "@/components/ui/card";
import { useAddEmployee } from "@/hooks/useEmployees";
import { UserRoundPlus, X } from "lucide-react";
import { Link } from "react-router";
import * as motion from "motion/react-client";

const AddEmployee = () => {
  const { mutateAsync } = useAddEmployee();

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await mutateAsync(data);
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
              <UserRoundPlus className="size-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold">Add New Employee</h3>
              <span className="text-xs text-neutral-500">
                Fill in the details below
              </span>
            </div>
          </div>
          <Link to="/">
            <X />
          </Link>
        </div>
        <EmployeeForm onSubmit={onSubmit} />
      </Card>
    </motion.div>
  );
};

export default AddEmployee;
