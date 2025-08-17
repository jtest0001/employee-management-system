import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface IFetchErrorCard {
  handleRefetch: () => void;
}
const FetchErrorCard = (props: IFetchErrorCard) => {
  const { handleRefetch } = props;
  return (
    <Card className="flex h-full items-center justify-center gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-center text-2xl font-bold">
          Oops! Something went wrong
        </h2>
        <p className="max-w-sm text-center text-sm text-neutral-500">
          Unable to connect to the employee database. Please check your
          connection and try again.
        </p>
      </div>

      <Button onClick={handleRefetch}>Try again</Button>
    </Card>
  );
};

export default FetchErrorCard;
