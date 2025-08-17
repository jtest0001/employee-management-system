import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message);
    },
  }),
});

export default queryClient;
