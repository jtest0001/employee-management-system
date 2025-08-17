import EmployeeTable from "@/components/EmployeeTable/EmployeeTable";
import FetchErrorCard from "@/components/FetchErrorCard";
import { Card } from "@/components/ui/card";
import { useGetEmployees } from "@/hooks/useEmployees";

const Home = () => {
  const { data: employees, isLoading, isError, refetch } = useGetEmployees();

  if (isLoading) return null;
  if (isError) return <FetchErrorCard handleRefetch={() => refetch()} />;

  return (
    <>
      <Card className="relative h-full overflow-hidden rounded-md border py-0">
        {employees && employees.length > 0 ? (
          <div className="flex h-full flex-col">
            <div className="p-4">
              <h2 className="font-semibold">Team Members</h2>
              <span className="text-sm text-neutral-500">
                {employees.length}{" "}
                {employees.length === 1 ? "employee" : "employees"}
              </span>
            </div>
            <EmployeeTable employees={employees} />
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            No records found
          </div>
        )}
      </Card>
    </>
  );
};

export default Home;
