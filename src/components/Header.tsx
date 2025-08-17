import { Users } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="flex h-16 items-center justify-between border-b px-4 xl:px-16">
          <li className="flex items-center gap-4">
            <Link to="/" className="inline-flex" data-testid="app-logo">
              <Button className="size-10">
                <Users className="size-6" />
              </Button>
            </Link>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Employee Management</h1>
              <span className="text-sm text-neutral-500">
                Manage your team efficiently
              </span>
            </div>
          </li>
          <li>
            <Link to="/add-employee">
              <Button className="font-semibold">Add Employee</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
