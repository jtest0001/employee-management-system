import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const PageLoader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return isFetching || isMutating ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Loader2 className="text-primary h-12 w-12 animate-spin" />
    </div>
  ) : null;
};

export default PageLoader;
